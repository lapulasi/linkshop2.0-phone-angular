import {
  AfterViewChecked, Component, Input, OnChanges,
  SimpleChanges
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShopService} from '../../service/shop.service';
import {OrgService} from '../../service/org.service';
import {DataStatService} from '../../service/data-stat.service';
import {DateUtil} from '../../common/date-util';
import {Location} from '@angular/common';
import {DistrictService} from '../../service/district.service';
import {SortUtil} from '../../common/sort-util';
import {map} from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-regional-guest',
  template: `<div class="content">
    <div class="fleeing">
      <div class="fleeNum down-up-tips" (click)="condShow = !condShow">
        <span>{{cond.target.name}}</span><span class="icon down-tips"></span>
      </div>
      <div class="search" (click)="gotoSearchPage()">
        <ul>
          <li></li>
          <li>搜索</li>
        </ul>
      </div>
    </div>
    <div class="flee-panel" [ngClass]="{'content-mask': condShow}"><!-- content-mask-->
      <ul class="list">
        <li *ngFor="let item of orgList; index as i;" id="target{{item.id}}">
          <span class="pink" [ngClass]="{'pink': i ==0, 'yellow': i ==1, 'purple': i ==2}">{{i+1}}</span>
          <span>{{item.name}}</span>
          <span *ngIf="cond.target.type == 'count'">{{item.guestCount}}人</span>
          <span *ngIf="cond.target.type == 'ratio'">{{allGuestCount == 0 ? 0 :
            item.guestCount / allGuestCount * 100 | number: '1.0-2'}}%</span>
          <span *ngIf="cond.target.type == 'stay'">{{item.avgStayMin | number: '1.0-2'}}分钟</span>
        </li>

      </ul>
      <div class="filter" [ngClass]="{'hide': !condShow}">
        <p class="title">筛选指标</p>
        <ul>
          <li *ngFor="let item of targetList" [ngClass]="{'select': cond.target.type === item.type}"
              (click)="mergeParams({target : item.type});cond.target=item;">{{item.name}}</li>
          <!--<li [ngClass]="{'select': cond.target === 'escape'}" (click)="cond.target = 'escape'">外逃人数</li>-->
        </ul>
        <p class="title">筛选性别</p>
        <ul>
          <li [ngClass]="{'select': cond.gender === ''}" (click)="mergeParams({gender : ''});cond.gender = ''">全部</li>
          <li [ngClass]="{'select': cond.gender === 'M'}" (click)="mergeParams({gender : 'M'});cond.gender = 'M'">男性</li>
          <li [ngClass]="{'select': cond.gender === 'F'}" (click)="mergeParams({gender : 'F'});cond.gender = 'F'">女性</li>
        </ul>
        <p class="title">筛选年龄(可多选)</p>
        <ul>
          <li [ngClass]="{'select': cond.age === ''}" (click)="mergeParams({age: ''}); cond.age = ''">全部</li>
          <li [ngClass]="{'select': cond.age !== '' && cond.age.indexOf('0-20') >= 0 }" (click)="selectAgeRange('0-20')">20岁以下</li>
          <li [ngClass]="{'select': cond.age !== '' && cond.age.indexOf('20-30') >= 0}" (click)="selectAgeRange('20-30')">20-30岁</li>
          <li [ngClass]="{'select': cond.age !== '' && cond.age.indexOf('30-40') >= 0}" (click)="selectAgeRange('30-40')">30-40岁</li>
          <li [ngClass]="{'select': cond.age !== '' && cond.age.indexOf('40-50') >= 0}" (click)="selectAgeRange('40-50')">40-50岁</li>
          <li [ngClass]="{'select': cond.age !== '' && cond.age.indexOf('50-60') >= 0}" (click)="selectAgeRange('50-60')">50-60岁</li>
          <li [ngClass]="{'select': cond.age !== '' && cond.age.indexOf('60-100') >= 0}" (click)="selectAgeRange('60-100')">60岁以上</li>
        </ul>
        <div class="buttons">
          <button class="reset" (click)="reset()">重置</button>
          <button class="over" (click)="search()">完成</button>
        </div>
      </div>
    </div>
  </div>`
})
export class RegionalGuestComponent implements OnChanges, AfterViewChecked {

  @Input() org: any;
  @Input() adcode: any;
  @Input() dateObj: any;
  @Input() currLevel: any;
  @Input() path: any;

  targetList = [{type: 'count', name: '客流'}, {type: 'ratio', name: '客流占比'}, {type: 'stay', name: '平均驻留时间'}];
  cond: any = {};

  orgList: any = [];
  condShow: any = false;

  allGuestCount: any;

  constructor(private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private dataStatService: DataStatService,
              private sortUtil: SortUtil,
              private dateUtil: DateUtil) {
  }

  ngOnChanges(changes: SimpleChanges) {
    const queryParams = this.route.snapshot.queryParams;
    this.cond.gender = queryParams['gender'] == null ? '' : queryParams['gender'];
    this.cond.age = queryParams['age'] == null ? '' : queryParams['age'];
    this.getSelectedTarget(queryParams['target']);
    // this.getCurrOrgData();
    this.loadData();

  }

  ngAfterViewChecked() {
    this.route.fragment
      .subscribe(fragment => {
        if (fragment) {
          const element = document.getElementById(fragment);
          if (element) {
            element.scrollIntoView();
            element.style.backgroundColor = '#EAEDF2';
          }
        }
      });

  }

  getSelectedTarget(type) {
    if (type == null) {
      this.cond.target = this.targetList[0];
      return;
    }
    for (const target of this.targetList) {
      if (target.type === type) {
        this.cond.target = target;
        return;
      }
    }
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
    // console.log(this.cond.age.indexOf('0-20'));
    this.mergeParams({age: this.cond.age});
  }

  search() {
    this.condShow = false;
    this.loadData();
  }

  sortList() {
    if (this.cond.target.type === 'stay') {
      this.orgList.sort(this.sortUtil.desc('avgStayMin'));
      console.log(this.orgList);
    } else {
      this.orgList.sort(this.sortUtil.desc('guestCount'));
    }
  }

  // 查询数据
  loadData() {
    this.orgList = [];
    if (this.adcode === '0' || this.currLevel.id > 0) {
      this.dataStatService.listOrgAccessStat(this.currLevel.id, this.org.orgCode, '', this.cond.gender, this.cond.age,
        this.dateUtil.formatDate(this.dateObj.startDate), this.dateUtil.formatDate(this.dateObj.endDate)).pipe(
          map(data => {
            data.forEach(item => {
              item.id = item.org.id;
              item.name = item.org.name;
              item.guestCount = item.stat.guestCount;
              item.avgStayMin = item.stat.guestCount === 0 ? 0 : item.stat.stayMin / item.stat.guestCount;
              item.shopNum = item.stat.shopNum;
            });

            this.allGuestCount = data.reduceRight((preVal, curVal) => preVal + curVal.stat.guestCount, 0);
            return data;
          })
      ).subscribe(
        data => this.orgList = data,
        error => console.log(error),
        () => this.sortList()
      );

    } else {

      this.dataStatService.listZoneAccessStat(this.currLevel.id, this.org.orgCode, this.adcode, this.cond.gender, this.cond.age,
        this.dateUtil.formatDate(this.dateObj.startDate), this.dateUtil.formatDate(this.dateObj.endDate)).pipe(
        map(data => {
          data.forEach(item => {
            item.id = item.zone.id;
            item.name = item.zone.name;
            item.guestCount = item.stat.guestCount;
            item.avgStayMin = item.stat.guestCount === 0 ? 0 : item.stat.stayMin / item.stat.guestCount;
            item.shopNum = item.stat.shopNum;
          });

          this.allGuestCount = data.reduceRight((preVal, curVal) => preVal + curVal.stat.guestCount, 0);
          return data;
        })
      ).subscribe(
        data => this.orgList = data,
        error => console.log(error),
        () => this.sortList()
      );

    }

  }

  reset() {
    this.cond = {target: this.targetList[0], gender: '', age: ''};
  }

  mergeParams(queryParams) {
    this.router.navigate([this.path], {queryParams: queryParams, queryParamsHandling: 'merge'});
  }

  gotoSearchPage() {
    const path = this.location.path(false);
    this.router.navigate(['/regional/search'],
      {queryParams: {orgCode: this.org.orgCode, adcode: this.adcode, levelId: this.currLevel.id, returnUrl: path}});
  }
}
