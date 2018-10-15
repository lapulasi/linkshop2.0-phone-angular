import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateCompareHeatMapComponent } from './date-compare-heat-map.component';

describe('DateCompareHeatMapComponent', () => {
  let component: DateCompareHeatMapComponent;
  let fixture: ComponentFixture<DateCompareHeatMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateCompareHeatMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateCompareHeatMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
