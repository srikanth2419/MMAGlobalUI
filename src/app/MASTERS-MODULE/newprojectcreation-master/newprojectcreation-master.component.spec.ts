import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewprojectcreationMasterComponent } from './newprojectcreation-master.component';

describe('NewprojectcreationMasterComponent', () => {
  let component: NewprojectcreationMasterComponent;
  let fixture: ComponentFixture<NewprojectcreationMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewprojectcreationMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewprojectcreationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
