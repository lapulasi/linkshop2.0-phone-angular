import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteCalendarBoardComponent } from './infinite-calendar-board.component';

describe('InfiniteCalendarBoardComponent', () => {
  let component: InfiniteCalendarBoardComponent;
  let fixture: ComponentFixture<InfiniteCalendarBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfiniteCalendarBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteCalendarBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
