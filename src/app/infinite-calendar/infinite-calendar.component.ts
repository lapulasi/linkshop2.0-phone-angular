import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild,
  ViewChildren
} from '@angular/core';
import {ChronoField, DateTimeFormatter, LocalDate} from 'js-joda';
import {InfiniteCalendarYearComponent} from './infinite-calendar-year/infinite-calendar-year.component';
import {InfiniteCalendarDayComponent} from './infinite-calendar-day/infinite-calendar-day.component';
import {InfiniteScrollEvent} from 'ngx-infinite-scroll/src/models';
import {InfiniteCalendarService} from './infinite-calendar.service';

@Component({
  selector: 'app-infinite-calendar',
  templateUrl: './infinite-calendar.component.html',
  styleUrls: ['./infinite-calendar.component.scss']
})
export class InfiniteCalendarComponent implements OnInit , AfterViewInit {

  showCalendar = false;

  startYear: number;

  endYear: number;

  yearList: number[] = [];

  @ViewChildren('yearComponentList') yearComponentList: QueryList<InfiniteCalendarYearComponent>;

  placeHolderNumber = 0;

  selectedDates: LocalDate[] = [];

  selectedDates2: LocalDate[] = [];

  formatedDateString = '';

  @Input() defaultDate = '';

  @ViewChild('container') container: ElementRef;

  @ViewChild('calendar') calendar: ElementRef;

  @ViewChild('closeWrapper') closeWrapper: ElementRef;

  @Output() onSelected = new EventEmitter<string[]>();

  private scrollDistance: number = null;

  constructor(private service: InfiniteCalendarService, private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.formatedDateString = this.defaultDate;
    this.startYear = 2017;
    this.endYear = 2019;
    this._computePlaceHolderNumber();

    for (let year = this.startYear; year <= this.endYear; year ++) {
      this.yearList.push(year);
    }

    this._addCloseListener();

  }

  ngAfterViewInit(): void {}

  onSelectedHandler(dayComponent: InfiniteCalendarDayComponent): void {

    if (this.selectedDates.length <= 2) {
      this.selectedDates.push(dayComponent.day);
      this.selectedDates.sort((a, b) => Number(a.isAfter(b)));
    }
  }

  toggle(): void {
    if (!this.showCalendar) {
      this.show();
    } else {
      this.close();
    }
  }

  show(): void {

    this.selectedDates = [];
    this.service.clear();
    this.showCalendar = true;
    this.ref.detectChanges();
    if (this.scrollDistance == null) {
      this.scrollDistance = this.yearComponentList.find(item => item.year === LocalDate.now().year()).scrollDistance(LocalDate.now());
    }
    this.container.nativeElement.scrollTop = this.scrollDistance;
  }

  close(): void {
    this.showCalendar = false;
    if (this.selectedDates.length > 0) {
      this.selectedDates2 = this.selectedDates;
      if (this.selectedDates2.length === 1) {
        this.formatedDateString = this.selectedDates2[0].format(DateTimeFormatter.ISO_LOCAL_DATE);
      } else if (this.selectedDates2.length === 2) {
        this.formatedDateString =
          `${this.selectedDates2[0].format(DateTimeFormatter.ISO_LOCAL_DATE)} - ${this.selectedDates2[1]
            .format(DateTimeFormatter.ISO_LOCAL_DATE)}`;
      } else {
        this.formatedDateString = '';
      }
      this.onSelected.emit(this.selectedDates2.map(value => value.format(DateTimeFormatter.ISO_LOCAL_DATE)));
    }
  }

  private _addCloseListener(): void {
    document.addEventListener('click', (event) => {
      if (!this.calendar.nativeElement.contains(event.target) &&
        this.showCalendar) {
        event.preventDefault();
        event.stopPropagation();
        this.close();
      }

    }, {capture: true});
  }


  private _computePlaceHolderNumber(): void {
    const firstDayOfWeek = LocalDate.of(this.startYear, 1, 1).get(ChronoField.DAY_OF_WEEK);
    this.placeHolderNumber = firstDayOfWeek === 7 ? 0 : firstDayOfWeek;

  }

  onScroll(event: InfiniteScrollEvent) {
    for (let year = this.endYear + 1; year <= this.endYear + 2 ; year ++ ) {
      this.yearList.push(year);
    }
    this.endYear += 2;
    this.scrollDistance = null;

  }





}
