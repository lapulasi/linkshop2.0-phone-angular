import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteCalendarComponent } from './infinite-calendar.component';
import { InfiniteCalendarDayComponent } from './infinite-calendar-day/infinite-calendar-day.component';
import { InfiniteCalendarMonthComponent } from './infinite-calendar-month/infinite-calendar-month.component';
import { InfiniteCalendarYearComponent } from './infinite-calendar-year/infinite-calendar-year.component';
import { InfiniteCalendarWeekComponent } from './infinite-calendar-week/infinite-calendar-week.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { InfiniteCalendarHeaderComponent } from './infinite-calendar-header/infinite-calendar-header.component';
import { InfiniteCalendarPlaceholderComponent } from './infinite-calendar-placeholder/infinite-calendar-placeholder.component';
import { InfiniteCalendarMonthTestComponent } from './infinite-calendar-month-test/infinite-calendar-month-test.component';
import { InfiniteCalendarTestComponent } from './infinite-calendar-test/infinite-calendar-test.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { InfiniteCalendarBoardComponent } from './infinite-calendar-board/infinite-calendar-board.component';
import {InfiniteCalendarService} from './infinite-calendar.service';

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    NgbModule
  ],
  declarations: [InfiniteCalendarComponent,
    InfiniteCalendarDayComponent,
    InfiniteCalendarMonthComponent,
    InfiniteCalendarYearComponent,
    InfiniteCalendarWeekComponent,
    InfiniteCalendarHeaderComponent,
    InfiniteCalendarPlaceholderComponent,
    InfiniteCalendarMonthTestComponent,
    InfiniteCalendarTestComponent,
    InfiniteCalendarBoardComponent],
  providers: [InfiniteCalendarService],
  exports: [InfiniteCalendarComponent]
})
export class InfiniteCalendarModule { }
