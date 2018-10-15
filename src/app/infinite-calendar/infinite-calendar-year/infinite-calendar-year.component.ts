import {Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {LocalDate} from 'js-joda';
import {InfiniteCalendarMonthComponent} from '../infinite-calendar-month/infinite-calendar-month.component';
import {InfiniteCalendarDayComponent} from '../infinite-calendar-day/infinite-calendar-day.component';

@Component({
  selector: 'app-infinite-calendar-year',
  templateUrl: './infinite-calendar-year.component.html',
  styleUrls: ['./infinite-calendar-year.component.scss']
})
export class InfiniteCalendarYearComponent implements OnInit {

  @Input() year: number;

  @ViewChildren('monthComponentList') monthComponentList: QueryList<InfiniteCalendarMonthComponent>;

  @Output() onSelected = new EventEmitter<InfiniteCalendarDayComponent>();

  firstDayOfYear: LocalDate;

  firstDayOfMonthList: LocalDate[] = [];

  constructor() { }

  ngOnInit() {
    this.firstDayOfYear = LocalDate.of(this.year, 1, 1);
    for (let month = 1 ; month <= 12; month++) {
      this.firstDayOfMonthList.push(LocalDate.of(this.year, month, 1));
    }
  }

  onSelectedHandler(dayComponent: InfiniteCalendarDayComponent): void {
    this.onSelected.emit(dayComponent);
  }

  scrollDistance(date: LocalDate): number {
    if (date.year() === this.year) {
      return this.monthComponentList.find(item => item.firstDayOfMonth.monthValue() === date.monthValue()).scrollDistance(date);
    }
  }

}
