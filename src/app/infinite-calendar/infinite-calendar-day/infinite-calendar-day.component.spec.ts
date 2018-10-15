import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteCalendarDayComponent } from './infinite-calendar-day.component';

describe('InfiniteCalendarDayComponent', () => {
  let component: InfiniteCalendarDayComponent;
  let fixture: ComponentFixture<InfiniteCalendarDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfiniteCalendarDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteCalendarDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
