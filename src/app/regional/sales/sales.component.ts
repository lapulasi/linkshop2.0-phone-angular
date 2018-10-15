import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {RegionService} from "../region.service";
import {SortUtil} from "../../common/sort-util";
import {WebBridge} from "../../common/web-bridge";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
})
export class SalesComponent implements OnInit, OnDestroy {

  condShow = false;
  targetList = [
    {type: 'volume', name: '销量', unit: ''},
    {type: 'amount', name: '销额', unit: '元'},
    {type: 'avgPrice', name: '均价', unit: '元'},
    {type: 'guestAvgPrice', name: '客均价', unit: '元'},
    {type: 'aging', name: '时效', unit: ''},
    {type: 'convertRatio', name: '转化率', unit: ''}];

  selectedTarget = {type: 'volume', name: '销量', unit: ''};

  acceptCond: any = {};
  overviewShow = false;
  searchShow = false;
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

  search(item) {
    this.condShow = false;
    this.selectedTarget = item;
    this.sort();
  }

  loadData() {
    this.regionService.regionSales(this.acceptCond.selectedLevel.id, this.acceptCond.org.orgCode, this.acceptCond.org.gadcode,
      this.acceptCond.startDate, this.acceptCond.endDate)
      .subscribe(
        data => this.dataList = data,
        error => console.log(error),
        () => this.sort()
      );
  }

  sort() {
    this.dataList.sort(this.sortUtil.desc(this.selectedTarget.type));
  }


}
