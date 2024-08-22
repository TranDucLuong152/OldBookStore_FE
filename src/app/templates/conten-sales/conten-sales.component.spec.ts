import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenSalesComponent } from './conten-sales.component';

describe('ContenSalesComponent', () => {
  let component: ContenSalesComponent;
  let fixture: ComponentFixture<ContenSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
