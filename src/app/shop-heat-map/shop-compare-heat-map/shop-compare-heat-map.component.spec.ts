import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCompareHeatMapComponent } from './shop-compare-heat-map.component';

describe('ShopCompareHeatMapComponent', () => {
  let component: ShopCompareHeatMapComponent;
  let fixture: ComponentFixture<ShopCompareHeatMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCompareHeatMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCompareHeatMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
