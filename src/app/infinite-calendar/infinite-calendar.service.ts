import { Injectable} from '@angular/core';
import {LocalDate} from 'js-joda';
import {Observable} from 'rxjs/Observable';
import {InfiniteCalendarDayComponent} from './infinite-calendar-day/infinite-calendar-day.component';

@Injectable()
export class InfiniteCalendarService {
  private selectedDates: LocalDate[] = [];

  private selectedComponents: InfiniteCalendarDayComponent[] = [];

  appendDate(component: InfiniteCalendarDayComponent): boolean {
    if (this.selectedDates.length < 2) {
      this.selectedDates.push(component.day);
      this.selectedComponents.push(component);
      return true;
    } else {
      return false;
    }

  }

  clear(): void {
    this.selectedDates = [];
    this.selectedComponents.forEach(value => value.selected = false);
  }

  getSelectedDates(): LocalDate[] {
    return this.selectedDates;
  }
}
