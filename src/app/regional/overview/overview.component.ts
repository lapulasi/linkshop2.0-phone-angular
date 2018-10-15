import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SortUtil} from '../../common/sort-util';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit, OnChanges {
  @Input() dataList: any;
  @Input() selectedTarget: any;
  @Input() selectedLevel: any;
  rankResult: any;

  constructor(private sortUtil: SortUtil) {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataList && changes.dataList.currentValue.length > 0) {
      this.rankResult = this.sortUtil.medianAnalysis(this.selectedTarget.type, this.dataList);
    }

  }

}
