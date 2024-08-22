import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContensHomeComponent } from './contens-home.component';

describe('ContensHomeComponent', () => {
  let component: ContensHomeComponent;
  let fixture: ComponentFixture<ContensHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContensHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContensHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
