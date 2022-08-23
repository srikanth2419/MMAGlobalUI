import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaincategoryMasterComponent } from './maincategory-master.component';

describe('MaincategoryMasterComponent', () => {
  let component: MaincategoryMasterComponent;
  let fixture: ComponentFixture<MaincategoryMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaincategoryMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaincategoryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
