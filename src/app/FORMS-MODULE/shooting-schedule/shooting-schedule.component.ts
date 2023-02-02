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
  totalRecords: number = 0;
  selectAll: boolean = false;
  selectedCustomers: any[] = [];
  Disabled:any;
  ShootingScheduleCols:any;
  ShootingScheduleData:any[] = [];
  loading:boolean = false;
  contactlistData:any[]=[];
  maincategoryOptions: any;
mainCategoryData:any;
subCategoryData:any;
subcategoryOptions:any;
  
subCategory:any;

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
    this.ShootingScheduleCols = TableConstants.ShootingColums;
    this.restapiservice.get(Pathconstants.projectcreation_Get).subscribe(res => { this.newprojectcreationData = res });
    this.restapiservice.get(Pathconstants.MainCategoryMasterController_Get).subscribe(res => { this.mainCategoryData = res })
    this.restapiservice.get(Pathconstants.SubCategoryMasterController_Get).subscribe(res => { this.subCategoryData = res })
  }
 
  onSelect(type: any) {
    let projectSelection: any = [];
    let maincategoryselection: any = [];
    let subcategoryselection: any = [];
    

    switch (type) {
      case 'p':
        this.newprojectcreationData.forEach((c: any) => {
          projectSelection.push({ label: c.project_name, value: c.slno });
        })
        this.projectNameOptions = projectSelection;
        this.projectNameOptions.unshift({ label: '-select', value: null });
        break;
        case 'E':
          console.log(this.mainCategory)
          this.mainCategoryData.forEach((c: any) => {
            maincategoryselection.push({ label: c.categoryname, value: c.sino });
          })
          this.maincategoryOptions = maincategoryselection;
          this.maincategoryOptions.unshift({ label: '-select', value: null });
          break;
        case 'F':
          this.subCategoryData.forEach((c: any) => {
            subcategoryselection.push({ label: c.categoryname, value: c.sino });
          })
          this.subcategoryOptions = subcategoryselection;
          this.subcategoryOptions.unshift({ label: '-select', value: null });
          break;
      }
      
    
  }
  mainCategory(mainCategory: any) {
    throw new Error('Method not implemented.');
  }
  onSave() {
    let value = this.selectedCustomers;
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
  onSelectionChange(value = []) {
    this.selectAll = value.length === this.totalRecords;
    this.selectedCustomers = value;
    console.log('m',value)
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
    this.Disabled = null;

  }

  onAdd() {
    this.restapiservice.get(Pathconstants.ContactListController_Get).subscribe(res => {
     this.shootingScheduleDetails = res;
     this.selectedPerson = res;
    })
  }
  onView(){
  }

  onEdit(rowData:any){
  }
}