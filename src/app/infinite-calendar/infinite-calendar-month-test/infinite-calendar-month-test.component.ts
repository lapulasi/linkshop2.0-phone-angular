import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChronoField, LocalDate} from 'js-joda';

@Component({
  selector: 'app-infinite-calendar-month-test',
  templateUrl: './infinite-calendar-month-test.component.html',
  styleUrls: ['./infinite-calendar-month-test.component.scss']
})
export class InfiniteCalendarMonthTestComponent implements OnInit {

  @Input() firstDayOfMonth: LocalDate;

  dayListModel = [];

  @Output() onSelected = new EventEmitter<LocalDate>();


  constructor() { }

  ngOnInit() {
    this._fillModel();
  }

  _fillModel(): void {
      let date = this.firstDayOfMonth;
      const month = this.firstDayOfMonth.monthValue();
      let row = [];
      while (date.monthValue() === month) {
        row.push(date);
        if (date.get(ChronoField.DAY_OF_WEEK) === 6) {
          this.dayListModel.push(row);
          row = [];
        }
        date = date.plusDays(1);
      }

  }

  onSelectedHandler(day: LocalDate): void {
    this.onSelected.emit(day);
  }

  autoScroll(date: LocalDate): void {
    if (this.firstDayOfMonth.year() === date.year() &&
      this.firstDayOfMonth.monthValue() === date.monthValue()) {
      console.log(this.firstDayOfMonth);
      // this.monthContainer.nativeElement.scrollIntoView(true);
    }
  }

}
