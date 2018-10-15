import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ChronoField, LocalDate} from 'js-joda';
import {Local} from 'protractor/built/driverProviders';
import {InfiniteCalendarDayComponent} from '../infinite-calendar-day/infinite-calendar-day.component';


@Component({
  selector: 'app-infinite-calendar-month',
  templateUrl: './infinite-calendar-month.component.html',
  styleUrls: ['./infinite-calendar-month.component.scss']
})
export class InfiniteCalendarMonthComponent implements OnInit, AfterViewInit {

  @Input() firstDayOfMonth: LocalDate;

  @ViewChild('monthContainer')
  private monthContainer: ElementRef;

  @Output() onSelected = new EventEmitter<InfiniteCalendarDayComponent>();

  dayList: LocalDate[] = [];

  constructor() { }

  ngOnInit() {
    const monthLength = this.firstDayOfMonth.lengthOfMonth();
    for (let i = 0; i < monthLength; i++) {
      this.dayList.push(this.firstDayOfMonth.plusDays(i));
    }


  }

  ngAfterViewInit(): void {
    // this.monthContainer.nativeElement.addListener()

  }

  onSelectedHandler(dayComponent: InfiniteCalendarDayComponent): void {
    this.onSelected.emit(dayComponent);
  }

  scrollDistance(date: LocalDate): number {
    if (this.firstDayOfMonth.year() === date.year() &&
      this.firstDayOfMonth.monthValue() === date.monthValue()) {
        console.log('auto scroll.....');
        const nativeElement: HTMLElement = this.monthContainer.nativeElement;
        return nativeElement.querySelector('li').offsetTop - nativeElement.offsetTop;
        // document.getElementById('calendarScrollContainer').scroll(0, nativeElement.querySelector('li').offsetTop
        // - nativeElement.offsetTop);
    }
  }

  // scrollPosition(): number {
  //   return this.dayList;
  // }


  dayOfMonth(date: LocalDate): number {
    return date.get(ChronoField.DAY_OF_MONTH);
  }

  marginLeft(date: LocalDate): string {
    if (this.dayOfMonth(date) === 1) {
      const dayOfWeek = date.get(ChronoField.DAY_OF_WEEK);
      if (dayOfWeek === 7) {
        return '0';
      } else {
        return (date.get(ChronoField.DAY_OF_WEEK) * 54) + '';
      }
    }
  }

  shouldShadow(): boolean {
    return this.firstDayOfMonth.monthValue() % 2 === 0;
  }



}
