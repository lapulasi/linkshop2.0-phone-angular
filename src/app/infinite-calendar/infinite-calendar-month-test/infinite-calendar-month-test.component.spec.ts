import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteCalendarMonthTestComponent } from './infinite-calendar-month-test.component';

describe('InfiniteCalendarMonthTestComponent', () => {
  let component: InfiniteCalendarMonthTestComponent;
  let fixture: ComponentFixture<InfiniteCalendarMonthTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfiniteCalendarMonthTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteCalendarMonthTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
