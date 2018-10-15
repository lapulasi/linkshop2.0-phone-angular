import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteCalendarYearComponent } from './infinite-calendar-year.component';

describe('InfiniteCalendarYearComponent', () => {
  let component: InfiniteCalendarYearComponent;
  let fixture: ComponentFixture<InfiniteCalendarYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfiniteCalendarYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteCalendarYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
