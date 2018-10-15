import {Component, Input, OnInit} from '@angular/core';
import {ChronoField, Duration, LocalDate} from 'js-joda';

@Component({
  selector: 'app-infinite-calendar-week',
  templateUrl: './infinite-calendar-week.component.html',
  styleUrls: ['./infinite-calendar-week.component.css']
})
export class InfiniteCalendarWeekComponent implements OnInit {

  @Input() startDate: LocalDate;

  dateList: LocalDate[] = [];

  endDate: LocalDate;

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 7; i ++) {
      this.dateList.push(this.startDate.plusDays(i));
    }
  }

  dayOfMonth(date: LocalDate): number {
    return date.get(ChronoField.DAY_OF_MONTH);
  }

}
