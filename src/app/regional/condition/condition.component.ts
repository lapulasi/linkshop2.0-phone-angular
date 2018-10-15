import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LevelListService} from "./level-list.service";
import {ActivatedRoute} from "@angular/router";
import {DateService} from "../../service/date.service";
import {DateUtil} from "../../common/date-util";

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
})
export class ConditionComponent implements OnInit {

  cond: any = {};

  levelList: any = [];
  selectedLevel: any;
  org: any = {};

  dateTypeList = [{name: '按日', type: 'day'}, {name: '按周', type: 'week'}, {name: '按月', type: 'month'}];
  selectedDateType = {name: '按日', type: 'day'};

  now: any = Date.now();
  tomorrow: any = new Date();
  dateObj: any = {date: this.now, startDate: this.now, endDate: this.tomorrow.setDate(new Date().getDate() + 1)};

  @Output() condChange = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private levelService: LevelListService,
    private dateService: DateService,
    private dateUtil: DateUtil
  ) { }

  ngOnInit() {
    this.org.orgCode = this.route.snapshot.params.orgCode;
    this.org.gadcode = '0';
    // this.org.gadcode = this.route.snapshot.params.gadcode;
    this.initLevelList();
  }

  initLevelList() {
    this.levelService.getLevels(this.org.orgCode, this.org.gadcode).subscribe(data => {
      this.levelList = data;
      this.selectedLevel = data[0];
      this.condChanged();
    });
  }

  switchLevel(item) {
    this.selectedLevel = item;
    this.condChanged();
  }

  switchDateType(item) {
    this.selectedDateType = item;
    this.dateObj.date = this.now;
    this.switchDate(0);
  }

  switchDate(amount) {
    this.dateService.switchDate(this.selectedDateType.type, this.dateUtil.formatDate(this.dateObj.date), amount).subscribe(result => {
      this.dateObj = result;
      this.condChanged();
    });
  }

  condChanged() {
    this.condChange.emit({org: this.org, selectedLevel: this.selectedLevel,
      startDate: this.dateUtil.formatDate(this.dateObj.startDate), endDate: this.dateUtil.formatDate(this.dateObj.endDate)});
  }

}
