import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {RegionService} from '../region.service';
import {map} from 'rxjs/operators';
import {SortUtil} from '../../common/sort-util';
import {WebBridge} from "../../common/web-bridge";

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
})
export class GuestComponent implements OnInit, OnDestroy {

  acceptCond: any = {};
  cond: any = {show: false, gender: '', age: ''};
  targetList = [{type: 'count', name: '客流', unit: '人'}, {type: 'ratio', name: '客流占比', unit: '%'}, {type: 'stay', name: '平均驻留时间', unit: '分钟'}];
  selectedTarget = {type: 'count', name: '客流', unit: '人'};

  genderList = [{name: '全部', value: ''}, {name: '男性', value: 'M'}, {name: '女性', value: 'F'}];

  ageList = [{name: '全部', value: ''}, {name: '20岁以下', value: '0-20'}, {name: '20-30岁', value: '20-30'},
    {name: '30-40岁', value: '30-40'}, {name: '40-50岁', value: '40-50'}, {name: '50-60岁', value: '50-60'}, {name: '60岁以上', value: '60-100'}];

  dataList: any = [];
  path: any;
  constructor(
    private ref: ChangeDetectorRef,
    private location: Location,
    private webBridge: WebBridge,
    private regionService: RegionService,
    private sortUtil: SortUtil) { }

  ngOnInit() {
    this.path = this.location.path(false).split('?')[0];
    this.regionService.initPageStatus();
    this.regionService.webBridgeEvent(this.webBridge, this.ref, this.path);
  }

  ngOnDestroy() {
    this.webBridge.callWebBridge('hideOveriewIcon', {'data': 'guest-hideOveriewIcon'}, function(data) {
      console.log('hide icon');
    });
  }

  condChange(event) {
    this.acceptCond = event;
    this.loadData();
  }

  selectAgeRange(age) {
    if (age === '') {
      this.cond.age = '';
    } else {
      if (this.cond.age === '') {
        this.cond.age = age;
      } else {
        if (this.cond.age.indexOf(age + ',') === 0) {
          this.cond.age = this.cond.age.replace(age + ',', '');
        } else if (this.cond.age.indexOf(age) === 0) {
          this.cond.age = this.cond.age.replace(age, '');
        } else if (this.cond.age.indexOf(age) > 0) {
          this.cond.age = this.cond.age.replace(',' + age, '');
        } else {
          this.cond.age = this.cond.age.concat(',').concat(age);
        }

      }
    }
    console.log(this.cond.age);
  }

  searchData() {
    this.cond.show = false;
    this.loadData();
  }

  loadData() {
    this.regionService.regionGuest(this.acceptCond.selectedLevel.id, this.acceptCond.org.orgCode,
      this.acceptCond.org.gadcode, this.cond.gender, this.cond.age, this.acceptCond.startDate, this.acceptCond.endDate).pipe(
      map(data => {
        const allCount = data.reduceRight((preVal, curVal) => preVal + curVal.stat.guestCount, 0);
        data.forEach(item => {
          item.id = item.org.id;
          item.name = item.org.name;
          item.count = item.stat.guestCount;
          item.ratio = allCount === 0 ? 0 : Number((item.stat.guestCount * 100 / allCount).toFixed(2));
          item.stay = item.stat.guestCount === 0 ? 0 : item.stat.stayMin / item.stat.guestCount;
        });
        return data;
      })
    ).subscribe(
      data => this.dataList = data,
      error => console.log(error),
      () => this.sort()
    );
  }

  sort() {
    this.dataList.sort(this.sortUtil.desc(this.selectedTarget.type));
  }

}
