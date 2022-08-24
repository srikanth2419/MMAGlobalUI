import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingScheduleComponent } from './shooting-schedule.component';

describe('ShootingScheduleComponent', () => {
  let component: ShootingScheduleComponent;
  let fixture: ComponentFixture<ShootingScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShootingScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShootingScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
