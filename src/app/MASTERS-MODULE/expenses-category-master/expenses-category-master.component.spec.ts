import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesCategoryMasterComponent } from './expenses-category-master.component';

describe('ExpensesCategoryMasterComponent', () => {
  let component: ExpensesCategoryMasterComponent;
  let fixture: ComponentFixture<ExpensesCategoryMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesCategoryMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensesCategoryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
