import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundUtilizationComponent } from './fund-utilization.component';

describe('FundUtilizationComponent', () => {
  let component: FundUtilizationComponent;
  let fixture: ComponentFixture<FundUtilizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundUtilizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundUtilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
