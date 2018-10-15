import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteCalendarPlaceholderComponent } from './infinite-calendar-placeholder.component';

describe('InfiniteCalendarPlaceholderComponent', () => {
  let component: InfiniteCalendarPlaceholderComponent;
  let fixture: ComponentFixture<InfiniteCalendarPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfiniteCalendarPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteCalendarPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
