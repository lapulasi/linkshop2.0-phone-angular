import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCompareListComponent } from './shop-compare-list.component';

describe('ShopCompareListComponent', () => {
  let component: ShopCompareListComponent;
  let fixture: ComponentFixture<ShopCompareListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCompareListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCompareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
