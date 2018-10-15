import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RegionService} from "../region.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-sales-overview',
  templateUrl: './sales-overview.component.html',
})
export class SalesOverviewComponent implements OnInit, OnChanges {

  @Input() acceptCond: any;
  @Input() dataList: any;
  @Input() selectedTarget: any;
  targetData: any = {};

  constructor(private regionService: RegionService, private ref: ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {

    if (changes.acceptCond && changes.acceptCond.currentValue && changes.acceptCond.currentValue.org) {

      this.regionService.regionShopInfo(this.acceptCond.org.orgCode, this.acceptCond.org.gadcode,
        this.acceptCond.startDate, this.acceptCond.endDate).pipe(map(data => {
          this.targetData.volume = data.allVolume;
          this.targetData.amount = data.allAmount;
          this.targetData.avgPrice = data.allVolume === 0 ? 0 : Number((data.allAmount / data.allVolume).toFixed(2));
          this.targetData.guestAvgPrice = data.guestCount === 0 ? 0 : Number((data.allAmount / data.guestCount).toFixed(2));
          this.targetData.aging = data.allWorkHours === 0 ? 0 : Number((data.allVolume / data.allWorkHours).toFixed(2));
          this.targetData.convertRatio = data.guestCount === 0 ? 0 : Number((data.allVolume / data.guestCount).toFixed(2));
        return this.targetData;
      })).subscribe((data) => {
        this.ref.detectChanges();
      });
    }

  }

}
