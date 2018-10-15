import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteCalendarComponent } from './infinite-calendar.component';

describe('InfiniteCalendarComponent', () => {
  let component: InfiniteCalendarComponent;
  let fixture: ComponentFixture<InfiniteCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfiniteCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
