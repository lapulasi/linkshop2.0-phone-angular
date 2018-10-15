import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteCalendarMonthComponent } from './infinite-calendar-month.component';

describe('InfiniteCalendarMonthComponent', () => {
  let component: InfiniteCalendarMonthComponent;
  let fixture: ComponentFixture<InfiniteCalendarMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfiniteCalendarMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteCalendarMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
