import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChronoField, LocalDate} from 'js-joda';
import {InfiniteCalendarService} from '../infinite-calendar.service';

@Component({
  selector: 'app-infinite-calendar-day',
  templateUrl: './infinite-calendar-day.component.html',
  styleUrls: ['./infinite-calendar-day.component.scss']
})
export class InfiniteCalendarDayComponent implements OnInit, AfterViewInit {

  @Input() day: LocalDate;

  @Output() onSelected = new EventEmitter<InfiniteCalendarDayComponent>();

  selected = false;

  constructor(private service: InfiniteCalendarService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // if (this.day.equals(LocalDate.now())) {
    //   setTimeout(() => this.onClick());
    // }

  }


  dayOfMonth(): number {
    return this.day.get(ChronoField.DAY_OF_MONTH);
  }

  monthValue(): number {
    return this.day.monthValue();
  }



  isFirstDayOfMonth(): boolean {
    return this.day.get(ChronoField.DAY_OF_MONTH) === 1;
  }

  isToday(): boolean {
    return this.day.equals(LocalDate.now());
  }

  shouldShadow(): boolean {
    return this.day.monthValue() % 2 === 0;
  }

  unSelect(): void {
    this.selected = false;
  }

  onClick(): void {
    if (this.service.appendDate(this)) {
      this.selected = true;
      this.onSelected.emit(this);
    }

  }

  equals(dayComponent: InfiniteCalendarDayComponent): boolean {
      return this.day.equals(dayComponent.day);
  }




}
