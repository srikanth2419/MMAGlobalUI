import { Component, OnInit } from '@angular/core';
import { Header, Message, SelectItem } from 'primeng/api';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
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
  //scheduleDate: Date = new Date();
  scheduleDate:any;
  scheduleDay: any;
  dayNightOptions: SelectItem[] = [];
  dayNight: any;
  designOptions: SelectItem[] =[];
  design: any;
  statusOptions: SelectItem[] = [];
  status: any;  
  scene: any;
  characters: any;
  shootingScheduleCols: any;
  shootingScheduleDetails: any[] = [];
  selectedPerson: any[] = [];
  newprojectcreationData:any[] = [];
  responseMsg: Message[] = [];
  RowId: any = 0;
  selected:any;
  block: RegExp = /[^=<>*%(){}$@#_!+0-9&?,.;'"?/]/; 
  
  
  constructor(private restapiservice: RestapiService) { 
  }

  ngOnInit(): void {
    
    this.dayNightOptions = [
      { label: 'select',value:1 },
      { label: 'DAY', value: 2 },
      { label: 'NIGHT', value: 3 },
      { label:'BOTH',value:4}
      
    ];
    this.designOptions = [
      { label: 'select',value:1 },
      { label: 'Interior', value: 2 },
      { label: 'Exterior', value: 3 },
      
    ];
    this.statusOptions= [
      { label: 'Pending',value:1 },
    ];
    //this.onView();
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
  onSave() {
    {
      const params = {  
        'slno': this.RowId,
        'project_name': this.projectName,
        'schedule_day': this.scheduleDay,
        'schedule_date': this.scheduleDate,
        'interior_exterior': this.design,
        'day_night':this.dayNight,
        'scene': this.scene,
        'characters': this.characters,
        'status': this.status,
        'created_date':new Date(),

      };
      this.restapiservice.post(Pathconstants.shooting_schedule_Post, params).subscribe(res => {
        if (res != null && res != undefined) {
          this.onView();
          this.onClear();
          this.responseMsg = [{ severity: ResponseMessage.SuccessSeverity, detail: ResponseMessage.SuccessMessage }];
          setTimeout(() => this.responseMsg = [], 3000);
        }
        else {
          this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: ResponseMessage.ErrorMessage }];
          setTimeout(() => this.responseMsg = [], 3000);
        }
      })
    }
  }
  
  onClear(){
    this.projectName = null;
    this.scheduleDay = null;
    this.selected = null;
    this.dayNight = null;
    this.design = null;
    this.scene = null;
    this.characters = null;
    this.status = null;

  }

  onAdd() {
    this.restapiservice.get(Pathconstants.ContactListController_Get).subscribe(res => {
     this.shootingScheduleDetails = res;
     this.selectedPerson = res;
    })
  }
  onView(){
  }
}