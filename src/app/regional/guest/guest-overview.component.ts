import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RegionService} from "../region.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-guest-overview',
  templateUrl: './guest-overview.component.html',
})
export class GuestOverviewComponent implements OnInit, OnChanges {

  @Input() cond: any;
  @Input() acceptCond: any;
  @Input() dataList: any;
  @Input() selectedTarget: any;
  targetData: any = {};

  constructor(private regionService: RegionService, private ref: ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {

    if (changes.acceptCond && changes.acceptCond.currentValue && changes.acceptCond.currentValue.org) {
      this.loadData();
    }
  }

  loadData() {
    const len = this.acceptCond.org.orgCode.length;
    if (len > 3) {
      const preOrgCode = this.acceptCond.org.orgCode.substring(0, len - 3);
      this.regionService.regionGuestnfo(this.cond.gender, this.cond.age, preOrgCode, this.acceptCond.org.gadcode,
        this.acceptCond.startDate, this.acceptCond.endDate).subscribe(data => {

        this.regionService.regionGuestnfo(this.cond.gender, this.cond.age, this.acceptCond.org.orgCode,
          this.acceptCond.org.gadcode, this.acceptCond.startDate, this.acceptCond.endDate).pipe(map(item => {
          this.targetData.count = item.guestCount;
          this.targetData.ratio = data.guestCount === 0 ? 0 : Number((item.guestCount / data.guestCount * 100).toFixed(2));
          this.targetData.stay = item.guestCount === 0 ? 0 : item.stayMin / item.guestCount;
          return this.targetData;
        })).subscribe(res => {
          this.ref.detectChanges();
        });
      });
    } else {

      this.regionService.regionGuestnfo(this.cond.gender, this.cond.age, this.acceptCond.org.orgCode,
        this.acceptCond.org.gadcode, this.acceptCond.startDate, this.acceptCond.endDate).pipe(map(item => {
        this.targetData.count = item.guestCount;
        this.targetData.ratio = 100;
        this.targetData.stay = item.guestCount === 0 ? 0 : item.stayMin / item.guestCount;
        return this.targetData;
      })).subscribe(data => {
        this.ref.detectChanges();
      });
    }
  }


}
