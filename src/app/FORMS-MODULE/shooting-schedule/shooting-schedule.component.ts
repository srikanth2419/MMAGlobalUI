import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';

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
  newprojectcreationData:any[] = [];


  constructor(private restapiservice: RestapiService) { 
  }

  ngOnInit(): void {
    this.dayNightOptions = [
      { label: 'select',value:1 },
      { label: 'DAY', value: 2 },
      { label: 'NIGHT', value: 3 },
      
    ];
    this.designOptions = [
      { label: 'select',value:1 },
      { label: 'Interior', value: 2 },
      { label: 'Exterior', value: 3 },
      
    ];
    this.statusOptions = [
      { label: 'select',value:1 },
      { label: 'Pending', value: 2 },
      { label: 'Started', value: 3 },
      { label: 'Completed', value: 4 },
      { label: 'Cancelled', value: 5 },


      
    ];
    this.shootingScheduleCols = TableConstants.ShootingScheduleColumns;
    this.restapiservice.get(Pathconstants.projectcreation_Get).subscribe(res => { this.newprojectcreationData = res })
  }

  onSelect(type: any) {
    let projectSelection: any = [];

    switch (type) {
      case 'p':
        this.newprojectcreationData.forEach((c: any) => {
          projectSelection.push({ label: c.project_name, value: c.slno });
        })
        this.projectNameOptions = projectSelection;
        this.projectNameOptions.unshift({ label: '-select', value: null });
        break;
    }
  }
  onSave() {}

}
