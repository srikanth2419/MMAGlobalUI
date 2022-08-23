import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnionMasterComponent } from './union-master.component';

describe('UnionMasterComponent', () => {
  let component: UnionMasterComponent;
  let fixture: ComponentFixture<UnionMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnionMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
