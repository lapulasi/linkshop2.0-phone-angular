import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataStatService} from '../../service/data-stat.service';
import {DateUtil} from '../../common/date-util';
import {OrgLevelService} from '../../service/org-level.service';
import {OrgService} from '../../service/org.service';
import {SortUtil} from '../../common/sort-util';

@Component({
  selector: 'app-overview-guest',
  template: `<div class="overall-data">
      <ul *ngIf="cond.type == 'count'">
        <li>客流量(人)</li>
        <li>{{currOrgData?.guestCount}}</li>
      </ul>
    <ul *ngIf="cond.type == 'ratio'">
      <li>客流占比(%)</li>
      <li>{{preOrgData == null ? 100 : (currOrgData?.guestCount * 100 / preOrgData.guestCount) | number: '1.0-2' }}</li>
    </ul>
    <ul *ngIf="cond.type == 'stay'">
      <li>平均驻留时间(分钟)</li>
      <li>{{(currOrgData?.stayMin / currOrgData?.guestCount) | number: '1.0-2'}}</li>
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
      <!--<ul class="svg-map">
        <li class="min">0人</li>
        <li class="one-four">0人</li>
        <li class="middle">0人</li>
        <li class="three-four">0人</li>
        <li class="max">0人</li>
      </ul>-->
      <ul class="svg-map" *ngIf="cond.type == 'count'">
        <li class="min">{{rankAnalysisResult?.min == null ? '' : rankAnalysisResult?.min?.guestCount + '人'}}</li>
        <li class="one-four">{{rankAnalysisResult?.midToMin == null ? '' :
          (rankAnalysisResult?.midToMin?.first?.guestCount + rankAnalysisResult?.midToMin?.second?.guestCount) / 2 + '人'}}</li>
        <li class="middle">{{rankAnalysisResult?.mid == null ? '' :
          (rankAnalysisResult?.mid?.first?.guestCount + rankAnalysisResult?.mid?.second?.guestCount) / 2 + '人'}}</li>
        <li class="three-four">{{rankAnalysisResult?.midToMax == null ? '' :
          (rankAnalysisResult?.midToMax?.first?.guestCount + rankAnalysisResult?.midToMax?.second?.guestCount) / 2 + '人'}}</li>
        <li class="max">{{rankAnalysisResult?.max == null ? '' : rankAnalysisResult?.max?.guestCount + '人'}}</li>
      </ul>
      <ul class="svg-map" *ngIf="cond.type == 'ratio'">
        <li class="min">{{rankAnalysisResult?.min == null || currOrgData.guestCount == 0 ? 0 : (rankAnalysisResult?.min?.guestCount / currOrgData.guestCount | number: '1.0-2') + '%'}}</li>
        <li class="one-four">{{rankAnalysisResult?.midToMin == null || currOrgData.guestCount == 0 ? 0 :
          ((rankAnalysisResult?.midToMin?.first?.guestCount +
          rankAnalysisResult?.midToMin?.second?.guestCount) / 2 / currOrgData.guestCount | number: '1.0-2') + '%'}}</li>
        <li class="middle">{{rankAnalysisResult?.mid == null || currOrgData.guestCount == 0 ? 0 : ((rankAnalysisResult?.mid?.first?.guestCount +
          rankAnalysisResult?.mid?.second?.guestCount) / 2 / currOrgData.guestCount | number: '1.0-2') + '%'}}</li>
        <li class="three-four">{{rankAnalysisResult?.midToMax == null || currOrgData.guestCount == 0 ? 0 :
          ((rankAnalysisResult?.midToMax?.first?.guestCount +
          rankAnalysisResult?.midToMax?.second?.guestCount)/ 2 / currOrgData.guestCount | number : '1.0-2') + '%'}}</li>
        <li class="max">{{rankAnalysisResult?.max == null || currOrgData.guestCount == 0 ? 0 : (rankAnalysisResult?.max?.guestCount / currOrgData.guestCount | number: '1.0-2') + '%'}}</li>
      </ul>
      <ul class="svg-map" *ngIf="cond.type == 'stay'">
        <li class="min">{{rankAnalysisResult?.min == null ? '' : (rankAnalysisResult?.min?.avgStay | number: '1.0-2') + 'min'}}</li>
        <li class="one-four">{{rankAnalysisResult?.midToMin == null ? '' :
          ((rankAnalysisResult?.midToMin?.first?.avgStay + rankAnalysisResult?.midToMin?.second?.avgStay) / 2 | number: '1.0-2') + 'min'}}</li>
        <li class="middle">{{rankAnalysisResult?.mid == null ? '' :
          ((rankAnalysisResult?.mid?.first?.avgStay + rankAnalysisResult?.mid?.second?.avgStay) / 2 | number: '1.0-2') + 'min'}}</li>
        <li class="three-four">{{rankAnalysisResult?.midToMax == null ? '' :
          ((rankAnalysisResult?.midToMax?.first?.avgStay + rankAnalysisResult?.midToMax?.second?.avgStay) / 2 | number: '1.0-2') + 'min'}}</li>
        <li class="max">{{rankAnalysisResult?.max == null ? '' : (rankAnalysisResult?.max?.avgStay | number: '1.0-2') + 'min'}}</li>
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
            <span *ngIf="cond.type == 'count'">{{item.guestCount}}人</span>
            <span *ngIf="cond.type == 'ratio'">{{currOrgData.guestCount == 0 ? 0 :
              item.guestCount / currOrgData.guestCount | number: '1.0-2'}}%</span>
            <span *ngIf="cond.type == 'stay'">{{item.avgStay | number: '1.0-2'}}分钟</span>
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
              <span *ngIf="cond.type == 'count'">{{item.guestCount}}人</span>
              <span *ngIf="cond.type == 'ratio'">{{currOrgData.guestCount == 0 ? 0 :
                item.guestCount / currOrgData.guestCount | number: '1.0-2'}}%</span>
              <span *ngIf="cond.type == 'stay'">{{item.avgStay | number: '1.0-2'}}分钟</span>
            </li>
        </ng-container>
      </ul>
    </div>
  `
})

export class RegionalOverviewGuestComponent implements OnChanges {
  @Input() org: any;
  @Input() adcode: any;
  @Input() queryParams: any;
  @Input() firstLevelId: any;
  cond: any = {};

  nextLevel: any;
  currOrgData: any;
  preOrgData: any;
  nextOrgList: any;
  rankAnalysisResult: any;

  constructor(
    private route: ActivatedRoute,
  private dateUtil: DateUtil,
  private sortUtil: SortUtil,
  private orgService: OrgService,
  private orgLevelService: OrgLevelService,
  private dataStatService: DataStatService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.cond = {
      type: this.queryParams['target'] == null ? 'count' : this.queryParams['target'],
      levelId: this.queryParams['levelId'] == null ? this.firstLevelId : this.queryParams['levelId'],
      gender: this.queryParams['gender'] == null ? '' : this.queryParams['gender'],
      age: this.queryParams['age'] == null ? '' : this.queryParams['age'],
      startDate: this.queryParams['startDate'] == null ? Date.now() : this.queryParams['startDate'],
      endDate: this.queryParams['endDate'] == null ? new Date().setDate(new Date().getDate() + 1) : this.queryParams['endDate']
    };
    // console.log('criteria', this.cond);
    this.getCurrOrgData();
    this.getNextOrgDatas();
  }

  async getCurrOrgData() {
    if (this.org.orgCode.length > 3) {
      const preOrgCode = this.org.orgCode.substring(0, this.org.orgCode.length - 3);
      this.preOrgData = await this.dataStatService.getAccessStatAsync('', '', preOrgCode, this.adcode,
        this.dateUtil.formatDate(this.cond.startDate), this.dateUtil.formatDate(this.cond.endDate));
    }

    this.currOrgData = await this.dataStatService.getAccessStatAsync('', '', this.org.orgCode, this.adcode,
      this.dateUtil.formatDate(this.cond.startDate), this.dateUtil.formatDate(this.cond.endDate));

    // console.log('curr org data', this.currOrgData);
  }

  // 获取下级组织的数据
  async getNextOrgDatas() {
    const nextOrgList = [];
    if (this.adcode === '0') { // 组织
      this.nextLevel = await this.orgLevelService.getOrgLevelAsync(this.cond.levelId);

      const orgList = await this.orgService.listOrgsAsync(this.nextLevel.id, this.org.orgCode);

      for (const org of orgList) {
        const data = await this.dataStatService.getAccessStatAsync(this.cond.gender, this.cond.age,
          org.orgCode, this.adcode, this.dateUtil.formatDate(this.cond.startDate), this.dateUtil.formatDate(this.cond.endDate));
        org.guestCount = data.guestCount;
        org.avgStay = data.guestCount === 0 ? 0 : data.stayMin / data.guestCount;
        nextOrgList.push(org);
      }

    } else {

    }

    this.nextOrgList = nextOrgList;
    if (this.cond.type === 'stay') {
      this.rankAnalysisResult = this.sortUtil.medianAnalysis('avgStay', this.nextOrgList);
    } else {
      this.rankAnalysisResult = this.sortUtil.medianAnalysis('guestCount', this.nextOrgList);
    }
  }

}
