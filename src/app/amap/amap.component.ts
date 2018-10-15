import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {IPixel} from 'ngx-amap/types/interface';
import {ActivatedRoute, Router} from '@angular/router';
import {OrgService} from '../service/org.service';
import {LevelListService} from './level-list.service';
import {Observable} from 'rxjs/Observable';
import {Title} from '@angular/platform-browser';
import {BubbleService} from './bubble.service';
import {DatePipe} from '@angular/common';
import {ShopService} from '../service/shop.service';
import {WeatherService} from '../service/weather.service';
import {map} from 'rxjs/operators';
import {SortUtil} from '../common/sort-util';
import {AuditLogService} from "../service/audit-log.service";
import {DeviceService} from "../service/device-service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-amap',
  templateUrl: './amap.component.html'
})
export class AmapComponent implements OnInit, OnDestroy {

  offSet: IPixel = {x: -20, y: -44};

  dataType = {
    list: [
      {name: '客流', type: 'flow', bubbleName: '实时客流', unit: '人', fieldName: 'guestCount'},
      {name: '昨日销量', type: 'volume', bubbleName: '昨日销量', unit: '', fieldName: 'yesterdaySaleVolume'},
      {name: '昨日销额', type: 'amount', bubbleName: '昨日销额', unit: '万', fieldName: 'yesterdaySaleAmount'}
    ],
    selected: {name: '客流', type: 'flow', bubbleName: '实时客流', unit: '人', fieldName: 'guestCount'},
    show: false
  };

  hide = {mask: true, backButton: true, brokenIcon: true, weatherIcon: true};
  shop = {brokenCount: 0, gradeList: []};
  levelTypeList = [{name: '按组织', type: 'org'}, {name: '按地域', type: 'zone'}];
  selectedLevleType = {name: '按组织', type: 'org'};
  levelLayerShow = false;

  orgCode: any;
  gadcode: any;
  map: any;
  selectedLevel: any;
  selectedOrg: any;

  org: any;
  levelList: any = [];
  bubbleList: any = [];
  weatherInfo: any;

  constructor(private auditLogService: AuditLogService,
              private ref: ChangeDetectorRef,
              private router: Router,
              private route: ActivatedRoute,
              private sortUtil: SortUtil,
              private title: Title,
              private orgService: OrgService,
              private weatherService: WeatherService,
              private shopService: ShopService,
              private bubbleService: BubbleService,
              private datePipe: DatePipe,
              private deviceService: DeviceService,
              private levelListService: LevelListService) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.orgCode = params.orgCode;
      this.gadcode = params.gadcode;
      this.initBackButtonStatus();
      this.initData();
      this.loadShopData();
    });
  }

  // 返回按钮状态
  initBackButtonStatus() {
    this.hide.backButton = true;
    const queryParams = this.route.snapshot.queryParams;
    const queryParamsKeys = Object.keys(queryParams);
    if (queryParams && queryParamsKeys.length > 0 && queryParamsKeys.indexOf('showBack') >= 0) {
      this.hide.backButton = false;
    }
  }

  initData() {
    this.org = this.route.snapshot.data.org;
    this.title.setTitle(this.org.name);
    // console.log('org', this.org);
    this.loadWeather(this.org.adcode);
    this.loadLevelList();

  }

  // 天气信息
  loadWeather(adcode: any) {
    this.hide.weatherIcon = true;
    if (adcode.substring(2, 6) !== '0000') {
      this.hide.weatherIcon = false;

      const today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
      this.weatherService.getDistrictWeather(adcode, today).subscribe(data => {
          // console.log(data);
          if (data) {
            this.weatherInfo = {
              weather: this.weatherService.getWeatherDescribe(data.weather),
              temperature: data.temperature
            };
          } else {
            this.weatherInfo = {weather: {icon: 'cloudy', name: '多云'}, temperature: 25};
          }
        },
        error => this.weatherInfo = {weather: {icon: 'cloudy', name: '多云'}, temperature: 25}
      );
    }

  }

  loadLevelList() {
    this.levelListService.getLevels(this.orgCode, this.gadcode, this.org.adcode, this.selectedLevleType.type).subscribe(data => {
      // console.log(data);
      this.levelList = data;
      this.selectedLevel = data[0];
      this.initBubble();
    });
  }

  loadShopData() {
    // 类别列表
    this.shopService.listGrade(this.orgCode).subscribe(result => {
      this.shop.gradeList = result;
    });

    // 损坏数据
    this.shopService.getBrokenShopCount(this.orgCode).subscribe(result => {
      this.shop.brokenCount = result.content;
    });
  }

  // 加载气泡
  initBubble() {
    // this.auditLogService.emitAuditEvent(this.auditLogService.viewIndex, `orgcode:${this.orgCode},orglevel:${this.selectedLevel.id}`);
    this.setCustomZoom();
    const today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this.clearMap();
    this.bubbleService.getBubbleData(this.selectedLevel, this.orgCode, this.gadcode, today, today).pipe(
      map(data => {
        this.setFit(data);
        return data;
      })
    ).subscribe(data => {
      this.clearMap();
      this.bubbleList = data;
    });
  }

  // 清楚覆盖物
  clearMap() {
    if (this.map) {
      this.map.clearMap();
    }
    this.bubbleList = [];
  }

  // 将离center最近的坐标设为中心点
  setFit(data: any) {
    if (this.map) {
      const centerPixel = this.getPixel(this.map.getCenter());
      const dtArr = [];
      data.forEach(item => {
        const distance = this.getDistance(centerPixel, this.getPixel(item.geo));
        dtArr.push({geo: item.geo, dt: distance});
      });
      dtArr.sort(this.sortUtil.asc('dt'));
      this.map.setCenter(dtArr[0].geo);
    }
  }

  getDistance(obj1, obj2) {
    return Math.sqrt((obj1.x - obj2.x) * (obj1.x - obj2.x) + (obj1.y - obj2.y) * (obj1.y - obj2.y));
  }

  getPixel(geo: any) {
    return this.map.lngLatToContainer(geo);
  }

  ngOnDestroy() {
    this.map.destroy();
  }

  // 设置地图缩放
  setCustomZoom() {
    if (this.map && this.selectedLevel) {
      this.map.setZoom(Math.round((this.selectedLevel.minZoom + this.selectedLevel.maxZoom) / 2));
      // console.log('zoom', this.map.getZoom());
    }
  }

  onMapReady(event: any) {
    this.map = event;
    this.setCustomZoom();
    // console.log('map ready: ', this.map);
  }

  onMarkerReady(event: any) {
    // event.setFitView();
    // console.log('marker ready', event);
  }

  switchLevelType(item) {
    this.selectedLevleType = item;
    this.levelLayerShow = false;
    this.loadLevelList();
  }

  // 切换层级
  switchLevel(item) {
    if (!this.hide.mask) {
      return;
    }
    this.selectedLevel = item;
    this.initBubble();

    this.auditLogService.addEventLog('switchLevel', `orgcode:${this.orgCode},orglevel:${this.selectedLevel.id}`);
  }

  markerClick(event: any) {
    const extData = event.target.F.extData;

    this.dataType.show = false;
    this.hide.mask = false;
    this.selectedOrg = extData;
    this.setRank();
    // console.log(extData);
    this.map.setCenter(extData.geo);
    this.ref.detectChanges();
  }

  // 排行
  setRank() {
    let rank = 1;
    for (const item of this.bubbleList) {
      const targetFieldName = this.dataType.selected.fieldName;
      if (item[targetFieldName] > this.selectedOrg[targetFieldName]) {
        rank++;
      }
    }
    this.selectedOrg.rank = rank;
  }

  // 切换数据类型
  changeDataType(data) {
    this.dataType.selected = data;
    this.dataType.show = false;

    this.auditLogService.addEventLog('switchDataType', `orgcode:${this.orgCode},datatype:${this.dataType.selected.name}`);
  }

  // 进入下一级
  gotoNextLevel() {
    this.hide.mask = true;
    if (this.selectedOrg.adcode) {
      this.router.navigate(['/index', this.orgCode, this.selectedOrg.adcode], {
        queryParams: {showBack: 1},
        queryParamsHandling: 'merge'
      });
    } else {
      this.router.navigate(['/index', this.selectedOrg.orgCode, this.gadcode], {
        queryParams: {showBack: 1},
        queryParamsHandling: 'merge'
      });
    }

  }

  // 返回
  goBack() {
    window.history.back();
  }

  // 简报
  gotoBriefPage() {
    this.router.navigate(['/brief', this.selectedOrg.orgCode]);
  }

  // 热力图
  gotoHeatMap() {
    this.router.navigate(['/', this.orgCode, this.selectedOrg.id, this.selectedOrg.name, 'heatMap']);
  }

  // 巡店
  gotoShopInspecton() {
    // this.auditLogService.emitAuditEvent(this.auditLogService.viewIndex, `orgcode:${this.selectedOrg.orgCode},event:巡店`);
    this.auditLogService.addEventLog('inspectShop', `shopid:${this.selectedOrg.id}`);
    // if (environment.dev) {
    this.deviceService.getDeviceType(this.selectedOrg.id).subscribe(data => {
      const deviceType = data.resultData;
      window.location.href = `shop://inspection?shopId=${this.selectedOrg.id}=${deviceType}`;
    });
    // } else {
    //   window.location.href = `shop://inspection?shopId=${this.selectedOrg.id}`;
    // }


  }

  // 进入详情页面
  gotoDetail() {
    let isManage = 0;
    if (!this.org.orgLevel.shop || !this.hide.backButton) {
      isManage = 1;
    }

    this.pageJump(`advice/${this.orgCode}/${this.gadcode}?manageRole=${isManage}`);
  }

  // 查看问题门店
  switchIssue() {
    this.hide.brokenIcon = !this.hide.brokenIcon;
    if (!this.hide.brokenIcon) {
      this.auditLogService.addEventLog('checkIssueShop', `orgcode:${this.orgCode}`);
    }
  }

  pageJump(url) {
    if (localStorage.getItem('wx') && url.indexOf('wx') < 0) {
      if (url.indexOf('?') < 0) {
        url = url.concat('?wx=1');
      } else {
        url = url.concat('&wx=1');
      }
    }
    window.location.href = url;

  }

  gotoSearchShopPage() {
    this.router.navigate(['search'], {relativeTo: this.route, queryParams: {orgCode: this.selectedOrg.orgCode}});
  }

}
