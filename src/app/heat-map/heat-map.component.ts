import {DateTimeFormatter, LocalDate} from 'js-joda';

declare const h337: any;

import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import * as $ from 'jquery';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {HeatMap} from './heat-map';
import 'slick-carousel';
import * as noUiSlider from 'nouislider';
import * as uuid from 'uuid/v4';
import {Title} from '@angular/platform-browser';
import '../common/array-extend';
@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html'
})
// TODO 后面再重构
export class HeatMapComponent implements OnInit, AfterViewInit {

  heatMapId = 'heatMap-' + uuid();

  // 摄像头uid列表
  deviceList: Array<any>;

  // 热力图是按照“月”,“周”,“天”展示数据
  public type = 'day';

  @Input() org;

  @Input() shopId: number;


  @Input() beginDate = LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);

  @Input() endDate = LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);

  private _date;

  // 查询热力图数据开始时间
  set date(date: any) {
    this._date = date;
  }

  get date() {
    return this._date || LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);
  }

  /**
   * 轮播板当前显示的板块
   */
  private _current_slide;

  @ViewChild('contrainer') contrainer: ElementRef;

  @ViewChildren('heatMap') elements: QueryList<ElementRef>;

  // 一个字典，存储当前component里所有的热力图,key:deviceUID,value:HeatMap
  heatMaps = new Map<string, HeatMap>();

  constructor(private http: HttpClient, private ref: ChangeDetectorRef, private title: Title) {}

  ngOnInit() {
    this.title.setTitle('热力图');
    this.init();
  }

  init(): void {
    this.ref.detectChanges();
    this._createValueThresholdNoUiSlider();
    this._createOpacityRangeNoUiSlider();
    this._requestDeviceUIDList().subscribe((deviceList: Array<any>) => {
      this.deviceList = deviceList;
      this.ref.detectChanges();
      this._createSliderCarousel();
      // TODO 添加响应函数这里可能会有问题
      this._addValueThresholdHandler();
      this._addOpacityRangeHandler();
      // 每隔一分钟刷新数据
      TimerObservable.create(0, 6000)
        .subscribe().add(this.loadData());
    });
  }

  private loadData(): void {

    this.http.get(`/device/shop/${this.shopId}/guestPositions/v2`,
      {
        params: {
          beginDate: this.beginDate,
          endDate: this.endDate,
          heatMapWidth: '414',
          heatMapHeight : '180',
          cellSize: '16'
        }
      })
      .subscribe((dataArray) => {
        this.deviceList.forEach(device => {
          const e = this.elements.find(item => {
            return item.nativeElement.id === `${this.heatMapId}-${device['deviceUID']}-${this.type}-${this.date}`;
          });
          if (e) {
            const oldHeatMap = this.heatMaps.get(e.nativeElement.id);
            if (oldHeatMap != null) {
              oldHeatMap.destory();
            }
            this.heatMaps.set(e.nativeElement.id, new HeatMap(this.type, e.nativeElement, dataArray[device['deviceUID']] || []));

          }
          // 获得数据后设置第一个热力图对应的值域滑动条的range value
          const extremaValues = Array.from(this.heatMaps.values())[0].getExtremaValues();
          this._updateHeatMapExtremaValues(extremaValues);

        });
      });
  }

  reLoad(shopId: number, beginDate: LocalDate|string, endDate: LocalDate|string) {
    this.shopId = shopId;
    if (beginDate instanceof LocalDate) {
      this.beginDate = beginDate.format(DateTimeFormatter.ISO_LOCAL_DATE);
    } else {
      this.beginDate = beginDate;
    }
    if (endDate instanceof LocalDate) {
      this.endDate = endDate.format(DateTimeFormatter.ISO_LOCAL_DATE);
    } else {
      this.endDate = endDate;
    }
    this.loadData();
  }


  /**
   * 使用slick-carousel jquery插件
   */
  ngAfterViewInit(): void {
  }


  _requestDeviceUIDList() {
    return this.http.get(`/device/list?shopId=${this.shopId}&type=VIEW`);
  }


  /**
   * 创建值域滑动条
   * @private
   */
  _createValueThresholdNoUiSlider() {
    noUiSlider.create(document.getElementById(this.valueThresholdSliderId()),
      <noUiSlider.Options>
        {
          start: [0, 1],
          step: 1,
          tooltips: [true, true],
          format: {
            to: function (value) {
              return Math.ceil(value);
            },
            from: function (value) {
              return Math.ceil(value);
            }
          },
          connect: true,
          range: {
            'min': [0],
            'max': [1]
          }
        });

  }

  valueThresholdSliderId() {
    return this.heatMapId + '-valueThresholdRangeSlider';
  }

  /**
   * 创建透明度滑动条
   * @private
   */
  _createOpacityRangeNoUiSlider() {
    noUiSlider.create(document.getElementById(this.opacityRangeSliderId()),
      <noUiSlider.Options>
        {
          start: 0.8,
          step: 0.1,
          tooltips: [true],
          connect: [true, false],
          range: {
            'min': [0.2],
            'max': [1]
          }
        });
  }

  opacityRangeSliderId() {
    return this.heatMapId + '-opacityRangeSlider';
  }

  /**
   * 添加值域滑动条响应函数
   * @private
   */
  _addValueThresholdHandler() {

    document.getElementById(this.valueThresholdSliderId())['noUiSlider'].on('update', (values, handle) => {
      this._current_slide = $(this.contrainer.nativeElement).slick('slickCurrentSlide');
      const id = $(`#${this.heatMapId} .heat-map-slide[id!=""]`).get(this._current_slide).getAttribute('id');
      const heatMap = this.heatMaps.get(id);
      if (heatMap != null) {
        heatMap.setRenderThreshold(values[0], values[1]);
      }
    });
  }

  /**
   * 添加透明度滑动条响应函数
   * @private
   */
  _addOpacityRangeHandler() {
    document.getElementById(this.opacityRangeSliderId())['noUiSlider'].on('update', (values, handle) => {
      this._current_slide = $(this.contrainer.nativeElement).slick('slickCurrentSlide');
      const id = $(`#${this.heatMapId} .heat-map-slide[id!=""]`).get(this._current_slide).getAttribute('id');
      const heatMap = this.heatMaps.get(id);
      if (heatMap != null) {
        heatMap.setOpacity(values[0]);
      }
    });
  }

  /**
   * 使用slick-carousel jquery插件
   * @private
   */
  _createSliderCarousel() {
    $(this.contrainer.nativeElement).slick({draggable: true});
  }

  /**
   * 更新热力图显示极值
   * @private
   */
  _updateHeatMapExtremaValues(extremaValues) {
    const min = extremaValues['min'];
    let max = extremaValues['max'];
    if (min === max) {
      max += 1;
    }
    document.getElementById(this.valueThresholdSliderId())['noUiSlider'].updateOptions({
      start: [min, max],
      range: {
        'min': min,
        'max': max
      }
    });
  }


  /**
   * 聚合后端返回的数据,将deviceUID相同的数据放到一个数组里面
   * @param data
   * @returns {Array<any>}
   */
  _aggregation(data: Array<any>): Array<any> {
    const resultObject = data.reduce((previousValue, currentValue) => {
      previousValue[currentValue['deviceUID']] = (previousValue[currentValue['deviceUID']] || []).concat(currentValue['positions']);
      return previousValue;
    }, {});

    const resultArray = Object.keys(resultObject).reduce((previousValue, currentValue) => {
      previousValue.push({'deviceUID': currentValue, 'positions': resultObject[currentValue]});
      return previousValue;
    }, []);
    return resultArray;
  }

  heatMapBg(device) {
    // return 'http://avc-test.oss-cn-shenzhen.aliyuncs.com/origin/view/H7BPAGVK4V9ZFDTC111A/20180730/114051Bzr.jpg';

    if (device['heatmap_background']) {
      return environment.pre_img_url + device['heatmap_background'];
    } else {
      return '../../../assets/images/mine_banner.png';
    }

  }

}
