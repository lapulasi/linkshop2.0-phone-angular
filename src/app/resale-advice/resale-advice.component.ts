import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ResaleAdviceEcharts} from './resale-advice.echarts';
import {ActivatedRoute} from '@angular/router';
import {DateService} from '../service/date.service';
import {DateUtil} from '../common/date-util';
import {OrgLevelService} from '../service/org-level.service';
import {Constant} from '../common/constant';
import {OrgService} from '../service/org.service';
import {ShopService} from '../service/shop.service';
import {ShopGuestService} from '../service/shop-guest.service';
import {SortUtil} from '../common/sort-util';
import {Title} from '@angular/platform-browser';

@Component({
  templateUrl: './resale-advice.component.html'
})

export class ResaleAdviceComponent implements OnInit {

  levelList: any;
  org: any;
  adcode: any;
  currLevel: any;
  zone = this.constant.zone;

  competitiveChart: any;
  flag  = {levelShow: false, typeSelectShow: false};
  dataTypeList = [{id: 'avgGuestCount', name: '店均客流'}, {id: 'avgPersonEfficacy', name: '平均人效'}, {id: 'avgAreaEfficacy', name: '平均坪效'}, {id: 'transformRatio', name: '平均转化率'}, {id: 'avgPrice', name: '均价'}];
  currDataType = {id: 'avgGuestCount', name: '店均客流'};
  now: any = new Date();
  tomorrow: any = new Date();
  dateObj: any = {date: new Date(this.now.getFullYear(), this.now.getMonth() - 1), startDate: new Date(this.now.getFullYear(), this.now.getMonth() - 1, 1), endDate: new Date(this.now.getFullYear(), this.now.getMonth(), 1)};
  orgList: any;
  desc: any = true;
  scoreSum: any; // 综合评分
  sortList: any = [];

  constructor(
    private competCharts: ResaleAdviceEcharts,
    private dateService: DateService,
    private route: ActivatedRoute,
  private dateUtil: DateUtil,
  private orgLevelService: OrgLevelService,
  private orgService: OrgService,
  private shopGuestService: ShopGuestService,
  private shopService: ShopService,
  private constant: Constant,
  private sortUtil: SortUtil,
  private title: Title) {

  }

  ngOnInit() {
    this.levelList = this.route.snapshot.data['levelList'].reverse();
    this.org = this.route.snapshot.data['org'];
    this.adcode = this.route.snapshot.params['adcode'];
    this.currLevel = this.levelList[0];
    const element = document.getElementById('competitive');
    this.title.setTitle(this.org.name + '-竞争力指数');
    element.scrollIntoView();
    // 雷达图数据
    this.radarData();
    // 列表数据
    this.listData();
  }

  async radarData() {
    const currVal = {}; // 当前值
    const maxVal = {}; // 最大值
    const minVal = {}; // 最小值
    await this.setProperty(currVal, this.org.orgCode);
    await this.sameLevelOrg(maxVal, minVal);

    // console.log(maxVal, minVal, currVal);
    const score = {
      transformRatioScore: this.getScore(currVal, maxVal, minVal, 'transformRatio'),
      avgPriceScore: this.getScore(currVal, maxVal, minVal, 'avgPrice'),
      avgGuestCountScore: this.getScore(currVal, maxVal, minVal, 'avgGuestCount'),
      avgPersonEfficacyScore: this.getScore(currVal, maxVal, minVal, 'avgPersonEfficacy'),
      avgAreaEfficacyScore: this.getScore(currVal, maxVal, minVal, 'avgAreaEfficacy'),
    };

    // console.log(score);

    this.scoreSum = Object.values(score).reduce((a, b) => a + b, 0);

    // 加载雷达图
    this.competitiveChart = this.competCharts.getRadarChart(score);
  }

  getScore(curr, max, min, property) {
    const unit = (max[property] - min[property]) / 5;
    return unit === 0 ? 20 : Math.round((curr[property] - min[property]) / unit) * 4;
  }

  // 计算同层级组织各个维度的最大值和最小值
  async sameLevelOrg(maxVal, minVal) {
    const transformRatioArr = [];
    const avgGuestCountArr = [];
    const avgPriceArr = [];
    const avgPersonEfficacyArr = [];
    const avgAreaEfficacyArr = [];


    const topOrgCode = this.org.orgCode.substring(0, this.org.orgCode.length - 3);

    if (this.adcode === '0') {
      const orgs = await this.orgService.listOrgsAsync(this.org.levelId, topOrgCode);
      for (const org of orgs) {
        await this.setProperty(org, org.orgCode);
        transformRatioArr.push(Number(org.transformRatio));
        avgGuestCountArr.push(Number(org.avgGuestCount));
        avgPriceArr.push(Number(org.avgPrice));
        avgPersonEfficacyArr.push(Number(org.avgPersonEfficacy));
        avgAreaEfficacyArr.push(Number(org.avgAreaEfficacy));
      }
    } else { // todo

    }

    transformRatioArr.sort((a, b) => a > b ? -1 : (a < b) ? 1 : 0);
    maxVal.transformRatio = transformRatioArr[0];
    minVal.transformRatio = transformRatioArr[transformRatioArr.length - 1];

    avgGuestCountArr.sort((a, b) => a > b ? -1 : (a < b) ? 1 : 0);
    maxVal.avgGuestCount = avgGuestCountArr[0];
    minVal.avgGuestCount = avgGuestCountArr[avgGuestCountArr.length - 1];

    avgPriceArr.sort((a, b) => a > b ? -1 : (a < b) ? 1 : 0);
    maxVal.avgPrice = avgPriceArr[0];
    minVal.avgPrice = avgPriceArr[avgPriceArr.length - 1];

    avgPersonEfficacyArr.sort((a, b) => a > b ? -1 : (a < b) ? 1 : 0);
    maxVal.avgPersonEfficacy = avgPersonEfficacyArr[0];
    minVal.avgPersonEfficacy = avgPersonEfficacyArr[avgPersonEfficacyArr.length - 1];

    avgAreaEfficacyArr.sort((a, b) => a > b ? -1 : (a < b) ? 1 : 0);
    maxVal.avgAreaEfficacy = avgAreaEfficacyArr[0];
    minVal.avgAreaEfficacy = avgAreaEfficacyArr[avgAreaEfficacyArr.length - 1];

  }

  async listData() {
    const orgListArr = [];
    if (this.adcode === '0' || this.currLevel.id > 0) {

      const orgList = await this.orgService.listOrgsAsync(this.currLevel.id, this.org.orgCode);
      for (const org of orgList) {

        await this.setProperty(org, org.orgCode);
        orgListArr.push(org);
      }
    } else {

      const zoneList = await this.shopService.listZonesAsync(this.currLevel.id, this.org.orgCode, this.adcode);
      for (const zone of zoneList) {
        zone.name = '某某区域';

        await this.setProperty(zone, this.org.orgCode);
        orgListArr.push(zone);
      }
    }
    this.orgList = orgListArr;
    this.sort();
  }

  async setProperty(obj, orgCode) {

    const guest = await this.shopGuestService.getOrgGuestAsync(orgCode, this.adcode,
      this.dateUtil.formatDate(this.dateObj.startDate), this.dateUtil.formatDate(this.dateObj.endDate));

    obj.transformRatio = guest.guestCount === 0 ? 0 : (guest.allVolume / guest.guestCount).toFixed(2); // 转化率
    obj.avgPrice = guest.allVolume === 0 ? 0 : (guest.allAmount / guest.allVolume).toFixed(2); // 均价
    obj.avgGuestCount = guest.shopNum === 0 ? 0 : (guest.guestCount / guest.shopNum).toFixed(2); // 店均客流
    obj.avgPersonEfficacy = guest.allStaffNum === 0 ? 0 : (guest.allAmount / guest.allStaffNum).toFixed(2); // 平均人效
    obj.avgAreaEfficacy = guest.allShopArea === 0 ? 0 : (guest.allAmount / guest.allShopArea).toFixed(2); // 平均坪效

  }

  switchDate(amount) {

    this.dateService.switchDate('month', this.dateUtil.formatDate(this.dateObj.date), amount).subscribe(result => {

      if (result.date < new Date(this.now.getFullYear(), this.now.getMonth())) {
        this.dateObj = result;
        this.radarData();
        this.listData();
      }
    });
  }

  // 切换层级
  switchLevel(levelId) {
    this.orgLevelService.getOrgLevel(levelId).subscribe(data => {
      this.currLevel = data;
      this.flag.levelShow = false;
      this.listData();
    });
  }

  // 切换数据类型
  switchDataType(item) {
    this.currDataType = item;
    this.flag.typeSelectShow = false;
  }

  sortEvent() {
    this.desc = !this.desc;
    this.sort();
  }

  sort() {
    if (this.desc) {
      this.orgList.sort(this.sortUtil.desc(this.currDataType.id));
    } else {
      this.orgList.sort(this.sortUtil.asc(this.currDataType.id));
    }
    this.sortList = this.orgList;
    // this.sortList = [];
    // let rank = 1;
    // for (let i = 0; i < this.orgList.length; i++) {
    //   const org = this.orgList[i];
    //   if (i > 0 && Number(this.orgList[i][this.currDataType.id]) < Number(this.orgList[i - 1][this.currDataType.id]) ) {
    //     rank ++;
    //   }
    //   org.rank = rank;
    //   this.sortList.push(org);
    // }
  }

}
