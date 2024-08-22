import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDateilsComponent } from './product-dateils.component';

describe('ProductDateilsComponent', () => {
  let component: ProductDateilsComponent;
  let fixture: ComponentFixture<ProductDateilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDateilsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDateilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
