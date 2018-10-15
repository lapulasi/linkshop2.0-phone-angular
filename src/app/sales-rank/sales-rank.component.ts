import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DateUtil} from '../common/date-util';
import {SortUtil} from '../common/sort-util';
import {DataStatService} from '../service/data-stat.service';
import {map} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';
import {AuditLogService} from "../service/audit-log.service";

@Component({
  templateUrl: './sales-rank.component.html'
})

export class SalesRankComponent implements OnInit {

  type: any = 'guestCount'; // volume, amount
  shopList: any;
  org: any;

  legenList = [
    {name: '客流量', type: 'guestCount', unit: '客流量(人)'},
    {name: '销量', type: 'yesterdaySaleVolume', unit: '销量'},
    {name: '销额', type: 'yesterdaySaleAmount', unit: '销额(元)'}
  ];
  selectedLegen = {name: '客流量', type: 'guestCount', unit: '客流量(人)'};

  constructor(private route: ActivatedRoute,
              private dateUtil: DateUtil,
              private sortUtil: SortUtil,
              private dataStatService: DataStatService,
              private auditLogService: AuditLogService,
              private title: Title) {}

  ngOnInit() {
    const orgCode = this.route.snapshot.params.orgCode;
    const adcode = this.route.snapshot.params.adcode;
    this.org = this.route.snapshot.data.org;
    this.loadData(orgCode, adcode);
    const element = document.getElementById('rankList');
    element.scrollIntoView();
    this.title.setTitle(this.org.name + '-排行榜');
  }

  loadData(orgCode, adcode) {
    const today = this.dateUtil.formatDate(Date.now());

    if (this.org.orgLevel.shop) {
      const code = orgCode.substring(0, 6);
      this.dataStatService.listOrgDatas(this.org.orgLevel.id, code, today, today).subscribe(
          data => this.shopList = data,
          error => console.log(error),
          () =>  this.shopList.sort(this.sortUtil.desc(this.selectedLegen.type))
        );
    } else {
      this.dataStatService.listShopDatas(orgCode, adcode, today, today).subscribe(
          data => this.shopList = data,
          error => console.log(error),
          () =>  this.shopList.sort(this.sortUtil.desc(this.selectedLegen.type))
        );
    }

  }

  switchType(item) {
    this.selectedLegen = item;
    this.shopList.sort(this.sortUtil.desc(this.selectedLegen.type));
    this.auditLogService.addEventLog('click-rank', `orgcode:${this.org.orgCode},datatype:${this.selectedLegen.name}`);
  }



}
