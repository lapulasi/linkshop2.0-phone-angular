import {AfterViewChecked, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ShopService} from '../../service/shop.service';
import {OrgService} from '../../service/org.service';
import {DataStatService} from '../../service/data-stat.service';
import {DateUtil} from '../../common/date-util';
import {ActivatedRoute, Router} from '@angular/router';
import {ShopGuestService} from '../../service/shop-guest.service';
import {Location} from '@angular/common';
import {DistrictService} from '../../service/district.service';
import {RegionalPerformanceService} from "../regional-performance.service";
import {SortUtil} from "../../common/sort-util";

@Component({
  selector: 'app-regional-sales',
  template: `<div class="content">
    <div class="fleeing">
      <div class="fleeNum down-up-tips" (click)="condShow = !condShow">
        <span>{{currTarget.name}}</span><span class="icon down-tips"></span></div>
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
          <span>{{item[currTarget.type] | number: '1.0-2'}}{{currTarget.unit}}</span>
        </li>

      </ul>
      <div class="filter" [ngClass]="{'hide': !condShow}">
        <p class="title">筛选指标</p>
        <ul>
          <li *ngFor="let item of targetList" [ngClass]="{'select': currTarget.type === item.type}"
              (click)="mergeParams({target: item.type});search(item)">{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>`
})
export class RegionalSalesComponent implements OnChanges, AfterViewChecked {

  @Input() org: any;
  @Input() adcode: any;
  @Input() dateObj: any;
  @Input() currLevel: any;
  @Input() path: any;

  targetList = [
    {type: 'volume', name: '销量', unit: ''},
    {type: 'amount', name: '销额', unit: '元'},
    {type: 'avgPrice', name: '均价', unit: '元'},
    {type: 'guestAvgPrice', name: '客均价', unit: '元'},
    {type: 'aging', name: '时效', unit: ''},
    {type: 'convertRatio', name: '转化率', unit: ''}];
  currTarget = this.targetList[0];

  orgList: any = [];
  condShow: any = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private shopService: ShopService,
    private shopGuestService: ShopGuestService,
    private orgService: OrgService,
    private sortUtil: SortUtil,
    private districtService: DistrictService,
    private performanceService: RegionalPerformanceService,
    private dateUtil: DateUtil) {}

  ngOnChanges(changes: SimpleChanges) {
    this.getSelectedTarget(this.route.snapshot.queryParams['target']);
    this.loadData();
    // this.searchData();
  }

  loadData() {
    this.orgList = [];
    if (this.adcode === '0' || this.currLevel.id > 0) {
      this.performanceService.saleOrgPerformance(this.currLevel.id, this.org.orgCode, 0,
        this.dateUtil.formatDate(this.dateObj.startDate), this.dateUtil.formatDate(this.dateObj.endDate)).subscribe(data => {
          this.orgList = data;
        },
        error => console.log(error),
        () => {
          this.sort();
        });
    } else {
      this.performanceService.saleZonePerformance(this.currLevel.id, this.org.orgCode, this.adcode,
        this.dateUtil.formatDate(this.dateObj.startDate), this.dateUtil.formatDate(this.dateObj.endDate)).subscribe(data => {
          this.orgList = data;
        },
        error => console.log(error),
        () => {
          this.sort();
        });
    }
  }

  sort() {
    this.orgList.sort(this.sortUtil.desc(this.currTarget.type));
  }

  ngAfterViewChecked() {
    this.route.fragment
      .subscribe( fragment => {
        if ( fragment ) {
          const element = document.getElementById( fragment );
          if ( element ) {
            element.scrollIntoView();
            element.style.backgroundColor = '#EAEDF2';
          }
        }
      } );

  }

  getSelectedTarget(type) {
    if (type == null) {
      this.currTarget = this.targetList[0];
      return;
    }
    for (const target of this.targetList) {
      if (target.type === type) {
        this.currTarget = target;
        return;
      }
    }
  }

  search(item) {
    this.currTarget = item;
    this.condShow = false;
    this.sort();
    // this.searchData();
  }

  mergeParams(queryParams ) {
    this.router.navigate([this.path], { queryParams: queryParams,  queryParamsHandling: 'merge'});
  }


  gotoSearchPage() {
    const path = this.location.path(false);
    this.router.navigate(['/regional/search'],
      {queryParams: {orgCode: this.org.orgCode, adcode: this.adcode, levelId: this.currLevel.id, returnUrl: path}});
  }

}
