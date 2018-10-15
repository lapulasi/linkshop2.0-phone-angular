import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteCalendarHeaderComponent } from './infinite-calendar-header.component';

describe('InfiniteCalendarHeaderComponent', () => {
  let component: InfiniteCalendarHeaderComponent;
  let fixture: ComponentFixture<InfiniteCalendarHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfiniteCalendarHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteCalendarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
