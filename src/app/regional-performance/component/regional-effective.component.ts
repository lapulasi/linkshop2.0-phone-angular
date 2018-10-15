import {AfterViewChecked, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ShopService} from '../../service/shop.service';
import {OrgService} from '../../service/org.service';
import {DateUtil} from '../../common/date-util';
import {ShopGuestService} from '../../service/shop-guest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {DistrictService} from '../../service/district.service';
import {SortUtil} from "../../common/sort-util";

@Component({
  selector: 'app-regional-effective',
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
        <li *ngFor="let item of sortList; index as i;" id="target{{item.id}}">
          <span class="pink" [ngClass]="{'pink': i ==0, 'yellow': i ==1, 'purple': i ==2}">{{i+1}}</span>
          <span>{{item.name}}</span>
          <span>{{item.data[currTarget.denominator] == 0 ? 0 :
            item.data[currTarget.numerator] / item.data[currTarget.denominator] | number: '1.0-2'}}{{currTarget.unit}}</span>
        </li>

      </ul>
      <div class="filter" [ngClass]="{'hide': !condShow}">
        <p class="title">筛选指标</p>
        <ul>
          <li *ngFor="let item of targetList" [ngClass]="{'select': currTarget.type === item.type}"
              (click)="mergeParams({target : item.type});search(item)">{{item.name}}</li>
        </ul>
        <!--<div class="buttons">-->
          <!--<button class="over" (click)="search()">完成</button>-->
        <!--</div>-->
      </div>
    </div>
  </div>`
})
export class RegionalEffectiveComponent implements OnChanges, AfterViewChecked {

  @Input() org: any;
  @Input() adcode: any;
  @Input() dateObj: any;
  @Input() currLevel: any;
  @Input() path: any;

  targetList = [
    {type: 'areaEffective', name: '坪效', unit: '元/m²', numerator: 'allAmount', denominator: 'allShopArea'},
    {type: 'persionEffective', name: '人效', unit: '元', numerator: 'allAmount', denominator: 'allStaffNum'},
    {type: 'serviceAbility', name: '服务能力', unit: '人', numerator: 'guestCount', denominator: 'allStaffNum'},
    {type: 'gatherAbility', name: '集客能力', unit: '', numerator: 'guestCount', denominator: 'allShopArea'}
    ];
  currTarget = this.targetList[0];

  orgList: any = [];
  condShow: any = false;
  sortList: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private shopGuestService: ShopGuestService,
    private shopService: ShopService,
    private orgService: OrgService,
    private sortUtil: SortUtil,
    private districtService: DistrictService,
    private dateUtil: DateUtil) {}

  ngOnChanges(changes: SimpleChanges) {
    this.getSelectedTarget(this.route.snapshot.queryParams['target']);
    this.searchData();
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
    this.searchData();

  }

  // 查询数据
  async searchData() {
    const that =  this;
    that.orgList = [];
    if (this.adcode === '0' || this.currLevel.id > 0) {
      const orgList = await this.orgService.listOrgsAsync(this.currLevel.id, this.org.orgCode);
      for (const org of orgList) {
        org.data  = await this.shopGuestService.getOrgGuestAsync(org.orgCode, this.adcode,
          this.dateUtil.formatDate(this.dateObj.startDate), this.dateUtil.formatDate(this.dateObj.endDate));

        that.orgList.push(org);
      }
    } else {
      const zoneList = await this.shopService.listZonesAsync(this.currLevel.id, this.org.orgCode, this.adcode);

      for (const zone of zoneList) {

        zone.data  = await this.shopGuestService.getOrgGuestAsync(this.org.orgCode, this.adcode,
          this.dateUtil.formatDate(this.dateObj.startDate), this.dateUtil.formatDate(this.dateObj.endDate));

        const district = await this.districtService.getDistrictNameAsync(zone.adcode);
        zone.name = district.name;
        that.orgList.push(zone);

      }
    }
    this.sort();
    // this.sortList = this.orgList;
  }

  sort() {
    // console.log(this.orgList);
    this.orgList.sort(this.sortUtil.multiDesc(this.currTarget.numerator, this.currTarget.denominator));
    this.sortList = this.orgList;
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
