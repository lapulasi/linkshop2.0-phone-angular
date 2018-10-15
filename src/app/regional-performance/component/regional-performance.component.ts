import {Component, OnInit} from '@angular/core';
import {DateService} from '../../service/date.service';
import {DateUtil} from '../../common/date-util';
import {ActivatedRoute, Router} from '@angular/router';
import {OrgLevelService} from '../../service/org-level.service';
import {Constant} from '../../common/constant';
import { Location } from '@angular/common';
import {Title} from '@angular/platform-browser';

@Component({
  template: `<div class="regional" id="regional">
    <ul class="nav">

      <ng-container *ngIf="adcode == '0'">
        <ng-container *ngFor="let item of levelList;last as isLast;">
          <li [ngClass]="{'current' : currLevel.id == item.id}" (click)="switchLevel(item.id)" *ngIf="!isLast">
            <span>{{item.name}}</span>
            <span></span>
          </li>
        </ng-container>
      </ng-container>

      <ng-container *ngIf="adcode !== '0'">
        <ng-container *ngFor="let item of levelList;first as isFirst;">
          <li [ngClass]="{'current' : currLevel.id == item.id}" (click)="switchLevel(item.id)" *ngIf="isFirst">
            <span>{{item.name}}</span>
            <span></span>
          </li>
        </ng-container>

        <li *ngIf="levelList.length > 2"[ngClass]="{'current' : currLevel.id == zone.districtLevelId}"
            (click)="switchLevel(zone.districtLevelId)">
          <span>区域</span>
          <span></span>
        </li>
        <li *ngIf="levelList.length > 3" [ngClass]="{'current' : currLevel.id == zone.cityLevelId}"
            (click)="switchLevel(zone.cityLevelId)">
          <span>城市</span>
          <span></span>
        </li>
        <li *ngIf="levelList.length > 4" [ngClass]="{'current' : currLevel.id == zone.provinceLevelId}"
            (click)="switchLevel(zone.provinceLevelId)">
          <span>省份</span>
          <span></span>
        </li>
      </ng-container>


    </ul>
    <ul class="time-range">
      <li [ngClass]="{'current': dateType == 'day'}" (click)="switchDateType('day')">
        <span>按日</span>
        <span class=""></span>
      </li>
      <li [ngClass]="{'current': dateType == 'week'}" (click)="switchDateType('week')">
        <span>按周</span>
        <span class=""></span>
      </li>
      <li [ngClass]="{'current': dateType == 'month'}" (click)="switchDateType('month')">
        <span>按月</span>
        <span class=""></span>
      </li>
    </ul>
    <div class="select-time">
      <ul>
        <li class="icon left-tip" (click)="switchDate(-1)"></li>
        <li *ngIf="dateType === 'day'">{{dateObj.date | date: 'yyyy-M-dd'}}</li>
        <li *ngIf="dateType === 'week'">{{dateObj.date | date: 'yyyy-'}}W{{dateObj.date | week}}</li>
        <li *ngIf="dateType === 'month'">{{dateObj.date | date: 'yyyy-M'}}</li>
        <li class="icon right-tip" (click)="switchDate(1)"></li>
      </ul>
    </div>

    <app-regional-guest *ngIf="vdoing == 'guest'" [dateObj]="dateObj" [currLevel]="currLevel"
                        [org]="org" [adcode]="adcode" [path]="path"></app-regional-guest>
    <app-regional-sales *ngIf="vdoing == 'sales'" [dateObj]="dateObj" [currLevel]="currLevel"
                        [org]="org" [adcode]="adcode" [path]="path"></app-regional-sales>
    <app-regional-effective *ngIf="vdoing == 'effective'" [dateObj]="dateObj"
                            [currLevel]="currLevel" [org]="org" [adcode]="adcode" [path]="path"></app-regional-effective>

  </div>`
})

export class RegionalPerformanceComponent implements OnInit {

  path: any;
  levelList: any;
  org: any;
  adcode: any;
  vdoing: any; // 数据维度
  currLevel: any = {};
  dateType: any = 'day';
  now: any = Date.now();
  tomorrow: any = new Date();
  dateObj: any = {date: this.now, startDate: this.now, endDate: this.tomorrow.setDate(new Date().getDate() + 1)};
  zone = this.constant.zone;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private dateService: DateService,
    private orgLevelService: OrgLevelService,
    private dateUtil: DateUtil,
    private constant: Constant,
    private title: Title) {}

  ngOnInit() {
    const element = document.getElementById('regional');
    element.scrollIntoView();
    this.path = this.location.path(false).split('?')[0];
    this.levelList = this.route.snapshot.data['levelList'].reverse();
    // console.log(this.levelList);
    // this.currLevel = this.levelList[0];
    this.org = this.route.snapshot.data['org'];
    this.adcode = this.route.snapshot.params['adcode'];
    this.vdoing = this.route.snapshot.params['vdoing'];

    const queryParams = this.route.snapshot.queryParams;
    this.dateType = queryParams['dateType'] == null ? 'day' : queryParams['dateType'];
    this.dateObj.date = queryParams['date'] == null ? Date.now() : queryParams['date'];
    this.dateObj.startDate = queryParams['startDate'] == null ? Date.now() : queryParams['startDate'];
    this.dateObj.endDate = queryParams['endDate'] == null ? this.tomorrow : queryParams['endDate'];
    this.currLevel.id = queryParams['levelId'] == null ? this.levelList[0].id : queryParams['levelId'];
    this.title.setTitle(this.org.name + '-区域表现');
  }


  switchDate(amount) {
    this.dateService.switchDate(this.dateType, this.dateUtil.formatDate(this.dateObj.date), amount).subscribe(result => {
      this.dateObj = result;
      this.mergeParams({dateType: this.dateType, date: result.date, startDate: result.startDate, endDate: result.endDate});
    });
  }

  switchLevel(levelId) {
    this.mergeParams({ levelId: levelId});
    this.orgLevelService.getOrgLevel(levelId).subscribe(data => {
      this.currLevel = data;
    });
  }

  switchDateType(type) {

    this.dateType = type;
    this.dateObj.date = this.now;
    this.switchDate(0);
  }

  mergeParams(queryParams ) {
    this.router.navigate([this.path], { queryParams: queryParams,  queryParamsHandling: 'merge'});
  }

  toOverView() {
    const currQueryParams = this.location.path(false).split('?')[1];
    const queryParams = currQueryParams == null ? '' : '?' + currQueryParams;
    this.router.navigateByUrl('/regional/overview/guest/' + this.org.id + '/' + this.adcode + queryParams);
    // this.router.navigateByUrl('/regional/overview/sales/' + this.org.id + '/' + this.adcode + queryParams);
    // this.router.navigateByUrl('/regional/overview/effective/' + this.org.id + '/' + this.adcode + queryParams);
  }


}
