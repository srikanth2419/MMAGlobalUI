import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';

@Component({
  selector: 'app-shooting-schedule',
  templateUrl: './shooting-schedule.component.html',
  styleUrls: ['./shooting-schedule.component.scss']
})
export class ShootingScheduleComponent implements OnInit {
  projectNameOptions: SelectItem[] =[];
  projectName: any;
  scheduleDate: Date = new Date();
  scheduleDay: any;
  dayNightOptions: SelectItem[] = [];
  dayNight: any;
  designOptions: SelectItem[] =[];
  design: any;
  statusOptions: SelectItem[] = [];
  status: any;
  scene: string = '';
  characters: string = '';
  shootingScheduleCols: any;
  shootingScheduleDetails: any[] = [];
  selectedPerson: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.shootingScheduleCols = TableConstants.ShootingScheduleColumns;
  }

}
