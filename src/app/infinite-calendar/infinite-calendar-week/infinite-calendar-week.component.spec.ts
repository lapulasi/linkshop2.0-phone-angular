import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteCalendarWeekComponent } from './infinite-calendar-week.component';

describe('InfiniteCalendarWeekComponent', () => {
  let component: InfiniteCalendarWeekComponent;
  let fixture: ComponentFixture<InfiniteCalendarWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfiniteCalendarWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteCalendarWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
