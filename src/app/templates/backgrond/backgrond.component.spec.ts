import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgrondComponent } from './backgrond.component';

describe('BackgrondComponent', () => {
  let component: BackgrondComponent;
  let fixture: ComponentFixture<BackgrondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgrondComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgrondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
