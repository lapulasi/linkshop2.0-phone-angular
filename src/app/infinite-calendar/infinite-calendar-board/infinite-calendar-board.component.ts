import {Component, Input, OnInit} from '@angular/core';
import {LocalDate} from 'js-joda';

@Component({
  selector: 'app-infinite-calendar-board',
  templateUrl: './infinite-calendar-board.component.html',
  styleUrls: ['./infinite-calendar-board.component.scss']
})
export class InfiniteCalendarBoardComponent implements OnInit {

  // @Input() fromDate: LocalDate;
  //
  // @Input() toDate: LocalDate;

  @Input() dates: LocalDate[];

  constructor() { }

  ngOnInit() {
  }

}
