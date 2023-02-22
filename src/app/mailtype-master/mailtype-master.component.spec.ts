import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailtypeMasterComponent } from './mailtype-master.component';

describe('MailtypeMasterComponent', () => {
  let component: MailtypeMasterComponent;
  let fixture: ComponentFixture<MailtypeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailtypeMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailtypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
