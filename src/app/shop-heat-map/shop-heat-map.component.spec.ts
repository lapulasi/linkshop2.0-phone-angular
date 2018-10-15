import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopHeatMapComponent } from './shop-heat-map.component';

describe('ShopHeatMapComponent', () => {
  let component: ShopHeatMapComponent;
  let fixture: ComponentFixture<ShopHeatMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopHeatMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopHeatMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
