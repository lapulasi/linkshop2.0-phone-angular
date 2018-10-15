import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {RegionService} from "../region.service";
import {map} from "rxjs/operators";
import {SortUtil} from "../../common/sort-util";
import {WebBridge} from "../../common/web-bridge";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit, OnDestroy {

  condShow = false;
  targetList = [
    {type: 'areaEffective', name: '坪效', unit: '元/m²'},
    {type: 'persionEffective', name: '人效', unit: '元'},
    {type: 'serviceAbility', name: '服务能力', unit: '人'},
    {type: 'gatherAbility', name: '集客能力', unit: ''}
  ];

  selectedTarget = {type: 'areaEffective', name: '坪效', unit: '元/m²', numerator: 'allAmount', denominator: 'allShopArea'};

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
  }

  loadData() {
    this.regionService.regionShop(this.acceptCond.selectedLevel.id, this.acceptCond.org.orgCode, this.acceptCond.org.gadcode,
      this.acceptCond.startDate, this.acceptCond.endDate).pipe(map(data => {
        data.forEach(item => {
          item.areaEffective = item.data.allShopArea === 0 ? 0 : Number((item.data.allAmount / item.data.allShopArea).toFixed(2));
          item.persionEffective = item.data.allStaffNum === 0 ? 0 : Number((item.data.allAmount / item.data.allStaffNum).toFixed(2));
          item.serviceAbility = item.data.allStaffNum === 0 ? 0 : Number((item.data.guestCount / item.data.allStaffNum).toFixed(2));
          item.gatherAbility = item.data.allShopArea === 0 ? 0 : Number((item.data.guestCount / item.data.allShopArea).toFixed(2));
        });

        return data;
    })).subscribe(
      data => this.dataList = data,
      error => console.log(error),
      () => this.sort()
    );
  }

  sort() {
    this.dataList.sort(this.sortUtil.desc(this.selectedTarget.type));
  }

}
