import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DataStatService} from '../../service/data-stat.service';
import {DateUtil} from '../../common/date-util';
import {OrgLevelService} from '../../service/org-level.service';
import {OrgService} from '../../service/org.service';
import {SortUtil} from '../../common/sort-util';
import {ShopGuestService} from '../../service/shop-guest.service';

@Component({
  selector: 'app-overview-effective',
  template: `<div class="overall-data">
      <ul>
        <li *ngIf="cond.target == 'areaEffective'">坪效(元/m²)</li>
        <li *ngIf="cond.target == 'persionEffective'">人效(元)</li>
        <li *ngIf="cond.target == 'serviceAbility'">服务能力(人)</li>
        <li *ngIf="cond.target == 'gatherAbility'">集客能力</li>
        <li>{{currOrgData[cond.target] | number: '1.0-2'}}</li>
      </ul>
      <div class="col-split"></div>
      <ul>
        <li>{{nextLevel?.name}}总数</li>
        <li>{{nextOrgList?.length}}</li>
      </ul>
    </div>
    <div class="quadrant">
      <ul class="tick ">
      <li>&nbsp;
        <ng-container *ngIf="rankAnalysisResult?.min != null">最小值</ng-container>
      </li>
      <li>&nbsp;
        <ng-container *ngIf="rankAnalysisResult?.midToMin != null">1/4位</ng-container>
      </li>
      <li>&nbsp;
        <ng-container *ngIf="rankAnalysisResult?.mid != null">中位数</ng-container>
      </li>
      <li>&nbsp;
        <ng-container *ngIf="rankAnalysisResult?.midToMax != null">3/4位</ng-container>
      </li>
      <li>&nbsp;
        <ng-container *ngIf="rankAnalysisResult?.max != null">最大值</ng-container>
      </li>
    </ul>

      <svg width="90%" height="2.1rem" version="1.1" viewBox="0 0 440 125" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="5" width="20" height="20" style="fill:rgb(255,255,255);
        stroke-width:2;stroke:rgb(111,146,234)"/>
      <rect x="140" y="0" width="200" height="30" style="fill:rgb(111,146,234);
        stroke-width:2;stroke:rgb(111,146,234)"/>
      <rect x="420" y="5" width="20" height="20" style="fill:rgb(255,255,255);
        stroke-width:2;stroke:rgb(111,146,234)"/>
      <line x1="60" y1="15" x2="420" y2="15" style="stroke:rgb(111,146,234);stroke-width:2"/>

      <line x1="50" y1="25" x2="50" [attr.y2]="rankAnalysisResult?.min == null ? 25 : 125" stroke-dasharray="3 2"
            stroke="rgb(159,164,172)"/>
      <line x1="140" y1="30" x2="140" [attr.y2]="rankAnalysisResult?.midToMin == null ? 30 : 100" stroke-dasharray="3 2"
            stroke="rgb(159,164,172)"/>
      <line x1="240" y1="30" x2="240" [attr.y2]="rankAnalysisResult?.mid == null ? 30 : 75" stroke-dasharray="3 2"
            stroke="rgb(159,164,172)"/>
      <line x1="340" y1="30" x2="340" [attr.y2]="rankAnalysisResult?.midToMax == null ? 30 : 100" stroke-dasharray="3 2"
            stroke="rgb(159,164,172)"/>
      <line x1="430" y1="25" x2="430" [attr.y2]="rankAnalysisResult?.max == null ? 25 : 125" stroke-dasharray="3 2"
            stroke="rgb(159,164,172)"/>
    </svg>
      <ul class="svg-map">
        <li class="min">{{rankAnalysisResult?.min == null ? '' : rankAnalysisResult?.min[cond.target]| number: '1.0-2'}}</li>
        <li class="one-four">{{rankAnalysisResult?.midToMin == null ? '' :
          ((rankAnalysisResult?.midToMin?.first[cond.target] + rankAnalysisResult?.midToMin?.second[cond.target]) / 2| number: '1.0-2')}}</li>
        <li class="middle">{{rankAnalysisResult?.mid == null ? '' :
          ((rankAnalysisResult?.mid?.first[cond.target] + rankAnalysisResult?.mid?.second[cond.target]) / 2| number: '1.0-2')}}</li>
        <li class="three-four">{{rankAnalysisResult?.midToMax == null ? '' :
          ((rankAnalysisResult?.midToMax?.first[cond.target] + rankAnalysisResult?.midToMax?.second[cond.target]) / 2| number: '1.0-2')}}</li>
        <li class="max">{{rankAnalysisResult?.max == null ? '' : rankAnalysisResult?.max[cond.target]| number: '1.0-2'}}</li>
      </ul>
    </div>
    <div class="three-ranking">
      <div class="title">
        <span class="icon top3"></span>
        <span>排名前三的{{nextLevel?.name}}</span>
      </div>
      <ul *ngIf="nextOrgList">
        <ng-container *ngFor="let item of nextOrgList;index as i;">
          <li *ngIf="i < 3">
            <i>{{i + 1}}</i>
            <span>{{item.name}}</span>
            <span>{{item[cond.target] | number: '1.0-2'}}
              {{cond.target == 'serviceAbility' ? '人' :
                (cond.target == 'areaEffective' ? '元/m²' : (cond.target == 'persionEffective' ? '元' : ''))}}</span>
          </li>
        </ng-container>
      </ul>
    </div>
    <div class="three-ranking">
      <div class="title">
        <span class="icon last3"></span>
        <span>排名后三的{{nextLevel?.name}}</span>
      </div>
      <ul *ngIf="nextOrgList && nextOrgList.length > 3">
        <ng-container *ngFor="let item of nextOrgList;index as i;">
            <li *ngIf="i >= (nextOrgList.length - 3)">
              <i>{{(i + 4) - nextOrgList.length}}</i>
              <span>{{item.name}}</span>
              <span>{{item[cond.target]| number: '1.0-2'}}
                {{cond.target == 'serviceAbility' ? '人' :
                  (cond.target == 'areaEffective' ? '元/m²' : (cond.target == 'persionEffective' ? '元' : ''))}}</span>
            </li>
        </ng-container>
      </ul>
    </div>
  `
})

export class RegionalOverviewEffectiveComponent implements OnChanges {
  @Input() org: any;
  @Input() adcode: any;
  @Input() queryParams: any;
  @Input() firstLevelId: any;

  cond: any = {};

  nextLevel: any;
  currOrgData: any = {};
  nextOrgList: any;
  rankAnalysisResult: any;

  constructor(
  private dateUtil: DateUtil,
  private sortUtil: SortUtil,
  private orgService: OrgService,
  private orgLevelService: OrgLevelService,
  private shopGuestService: ShopGuestService,
  private dataStatService: DataStatService) {}

  ngOnChanges(changes: SimpleChanges) {

    this.cond = {
      target: this.queryParams['target'] == null ? 'areaEffective' : this.queryParams['target'],
      levelId: this.queryParams['levelId'] == null ? this.firstLevelId : this.queryParams['levelId'],
      startDate: this.queryParams['startDate'] == null ? Date.now() : this.queryParams['startDate'],
      endDate: this.queryParams['endDate'] == null ? new Date().setDate(new Date().getDate() + 1) : this.queryParams['endDate']
    };
    this.getCurrOrgData();
    this.getNextOrgDatas();
  }

  async getCurrOrgData() {
    const data = await this.shopGuestService.getOrgGuestAsync(this.org.orgCode, this.adcode,
      this.dateUtil.formatDate(this.cond.startDate), this.dateUtil.formatDate(this.cond.endDate));
    this.currOrgData.areaEffective = data.allShopArea === 0 ? 0 : data.allAmount / data.allShopArea;
    this.currOrgData.persionEffective = data.allStaffNum === 0 ? 0 : data.allAmount / data.allStaffNum;
    this.currOrgData.serviceAbility = data.allStaffNum === 0 ? 0 : data.guestCount / data.allStaffNum;
    this.currOrgData.gatherAbility = data.allShopArea === 0 ? 0 : data.guestCount / data.allShopArea;
  }

  // 获取下级组织的数据
  async getNextOrgDatas() {
    const nextOrgList = [];
    if (this.adcode === '0') { // 组织
      this.nextLevel = await this.orgLevelService.getOrgLevelAsync(this.cond.levelId);

      const orgList = await this.orgService.listOrgsAsync(this.nextLevel.id, this.org.orgCode);

      for (const org of orgList) {
        const data = await this.shopGuestService.getOrgGuestAsync(org.orgCode, this.adcode,
          this.dateUtil.formatDate(this.cond.startDate), this.dateUtil.formatDate(this.cond.endDate));
        org.areaEffective = data.allShopArea === 0 ? 0 : data.allAmount / data.allShopArea;
        org.persionEffective = data.allStaffNum === 0 ? 0 : data.allAmount / data.allStaffNum;
        org.serviceAbility = data.allStaffNum === 0 ? 0 : data.guestCount / data.allStaffNum;
        org.gatherAbility = data.allShopArea === 0 ? 0 : data.guestCount / data.allShopArea;
        nextOrgList.push(org);
      }

    } else {

    }

    this.nextOrgList = nextOrgList;
    // console.log('orgList', this.nextOrgList);

    // 中位数分析
    this.rankAnalysisResult = this.sortUtil.medianAnalysis(this.cond.target, this.nextOrgList);
  }



}
