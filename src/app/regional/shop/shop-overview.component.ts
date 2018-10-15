import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RegionService} from "../region.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-shop-overview',
  templateUrl: './shop-overview.component.html',
})
export class ShopOverviewComponent implements OnInit, OnChanges {

  @Input() acceptCond: any;
  @Input() dataList: any;
  @Input() selectedTarget: any;
  targetData: any = {};
  // @Input() selectedLevel: any;

  constructor(private regionService: RegionService, private ref: ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {

    if (changes.acceptCond && changes.acceptCond.currentValue && changes.acceptCond.currentValue.org) {

      this.regionService.regionShopInfo(this.acceptCond.org.orgCode, this.acceptCond.org.gadcode,
        this.acceptCond.startDate, this.acceptCond.endDate).pipe(map(item => {
          // let data = {};
        this.targetData.areaEffective = item.allShopArea === 0 ? 0 : Number((item.allAmount / item.allShopArea).toFixed(2));
        this.targetData.persionEffective = item.allStaffNum === 0 ? 0 : Number((item.allAmount / item.allStaffNum).toFixed(2));
        this.targetData.serviceAbility = item.allStaffNum === 0 ? 0 : Number((item.guestCount / item.allStaffNum).toFixed(2));
        this.targetData.gatherAbility = item.allShopArea === 0 ? 0 : Number((item.guestCount / item.allShopArea).toFixed(2));
          return this.targetData;
      })).subscribe(() => {
        this.ref.detectChanges();
      });
    }

  }

}
