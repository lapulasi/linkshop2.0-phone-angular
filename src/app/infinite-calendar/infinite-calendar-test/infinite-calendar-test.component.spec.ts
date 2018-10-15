import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteCalendarTestComponent } from './infinite-calendar-test.component';

describe('InfiniteCalendarTestComponent', () => {
  let component: InfiniteCalendarTestComponent;
  let fixture: ComponentFixture<InfiniteCalendarTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfiniteCalendarTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteCalendarTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
