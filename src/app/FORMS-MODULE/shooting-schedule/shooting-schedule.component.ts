import { Component, OnInit } from '@angular/core';
import { Header, Message, SelectItem } from 'primeng/api';
import { ConnectableObservable } from 'rxjs';
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
  projectNameOptions: SelectItem[] = [];
  projectName: any;
  scheduleDate: Date = new Date();
  scheduleDay: any;
  dayNightOptions: SelectItem[] = [];
  dayNight: any;
  designOptions: SelectItem[] = [];
  design: any;
  statusOptions: SelectItem[] = [];
  status: any;
  scene: any;
  shootingScheduleCols: any;
  shootingScheduleDetails: any[] = [];
  selectedPerson: any[] = [];
  newprojectcreationData: any[] = [];
  responseMsg: Message[] = [];
  RowId: any = 0;
  selected: any;
  block: RegExp = /[^=<>*%(){}$@#_!+0-9&?,.;'"?/]/;
  totalRecords: number = 0;
  selectAll: boolean = false;
  selectedCustomers: any[] = [];
  Disabled: any;
  ShootingScheduleCols: any;
  ShootingScheduleData: any[] = [];
  loading: boolean = false;
  contactlistData: any[] = [];
  maincategoryOptions: any;
  mainCategoryMaster: any
  mainCategoryData: any;
  subCategoryData: any;
  subcategoryOptions: any;
  subCategoryMaster: any;
  minDate: any;
  maincategorynew: any[] = [];
  shootingStatusData:any[] = [];
  selectedType: any;
  contactid:any =[];
  contactlistcols:any;
  constructor(private restapiservice: RestapiService) {
  }

  ngOnInit(): void {
    this.onView();
    this.minDate = new Date();
    this.dayNightOptions = [
      { label: 'select', value: null },
      { label: 'DAY', value: 1 },
      { label: 'NIGHT', value: 2 },
      { label: 'BOTH', value: 3 }

    ];
    this.designOptions = [
      { label: 'select', value: null },
      { label: 'Interior', value: 1 },
      { label: 'Exterior', value: 2 },

    ];
    
    this.shootingScheduleCols = TableConstants.ShootingScheduleColumns;
    this.ShootingScheduleCols = TableConstants.ShootingColums;
    this.restapiservice.get(Pathconstants.projectcreation_Get).subscribe(res => { this.newprojectcreationData = res });
    this.restapiservice.get(Pathconstants.MainCategoryMasterController_Get).subscribe(res => { this.mainCategoryData = res })
    this.restapiservice.get(Pathconstants.SubCategoryMasterController_Get).subscribe(res => { this.subCategoryData = res })
    this.restapiservice.get(Pathconstants.SubCategoryMasterController_Get).subscribe(res => { this.subCategoryData = res })
    this.restapiservice.get(Pathconstants.shooting_status_Get).subscribe(res => { this.shootingStatusData = res })
    
  }

  onSelect(type: any) {
    let projectSelection: any = [];
    let maincategoryselection: any = [];
    let subcategoryselection: any = [];
    let shootingstatusselection:any=[];


    switch (type) {
      case 'p':
        this.newprojectcreationData.forEach((c: any) => {
          projectSelection.push({ label: c.project_name, value: c.project_id });
        })
        this.projectNameOptions = projectSelection;
        this.projectNameOptions.unshift({ label: '-select', value: null });
        break;
      case 'E':
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
        case 'S':
          this.shootingStatusData.forEach((c: any) => {
            shootingstatusselection.push({ label: c.status, value: c.slno });
          })
          this.statusOptions = shootingstatusselection;
          this.statusOptions.unshift({ label: '-select', value: null });
          break;
    }
  }
  // mainCategory(mainCategory: any) {
  //   throw new Error('Method not implemented.');
  // }
  onSave() {
    this.getContactId();
    {
      const shootingparams = {
        'slno': this.RowId,
        'project_id': this.projectName,
        'scene': this.scene ,
        'interior_exterior': this.design.label,
        'day_night': this.dayNight.label,
        'schedule_day': this.scheduleDay,
        'schedule_date': this.scheduleDate,
        'status_id': this.status,
        'main_category_id': this.mainCategoryMaster.value,
        'sub_category_id': this.subCategoryMaster.value,
        'created_date': new Date(),
        'flag': (this.selectedType == 1) ? true : false,
        

      };
      const params={
        'shooting_Schedule':shootingparams,
        'contactusid':this.contactid
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
  getContactId() { 
    //get selected fields contact id as a string array 
      var arr:any = [];
       this.contactid = []
        this.selectedCustomers.forEach(i => {
           this.contactid.push(i.contactid)
          })
          arr = this.contactid
          //  var str = arr.toString();      
          console.log('array',this.contactid)
          //  console.log('strarray',str) 
         }
  onSelectionChange(value = []) {
    this.selectAll = value.length === this.totalRecords;
    this.selectedCustomers = value;
    console.log('dd',value);
  }

  onClear() {
    this.projectName = null;
    this.scheduleDay = null;
    this.selected = null;
    this.dayNight = null;
    this.design = null;
    this.scene = null;
    this.subCategoryMaster = null;
    this.mainCategoryMaster = null;
    this.status = null;
    this.Disabled = null;
    this.selectedType = null;
    this.Disabled=null;

  }

  onAdd() {
    this.restapiservice.get(Pathconstants.ContactListController_Get).subscribe(res => { 
    this.shootingScheduleDetails = res; 
    this.shootingScheduleDetails.forEach((i: any) => {
      console.log('1')

    if(i.maincategory_id === this.mainCategoryMaster.value && i.subcategory_id === this.subCategoryMaster.value) { 
      console.log('2')

    this.maincategorynew.push ({'maincategoryname':i.maincategoryname, 'subcategoryname': i.subcategoryname,'rolename' :i.rolename,'phonenumber':i.phonenumber,'first_name':i.first_name,'contactid':i.slno});
     }
    }) 
    })
    }
    
  onView() {
    this.restapiservice.get(Pathconstants.shooting_schedule_Get).subscribe(res => {
      this.ShootingScheduleData = res;
      if (res) {
        res.forEach((i: any) => {
          i.flag = (i.flag == true) ? 'Active' : 'InActive'
        })
      }
    })
  }


  onEdit(rowData: any) {

    this.RowId = rowData.slno;
    this.projectName = rowData.project_id;
    this.projectNameOptions=[{label:rowData.project_name,value:rowData.project_id}];
    this.scene = rowData.scene;
    this.design = rowData.interior_exterior;
    this.designOptions = rowData.design.label;
    this.design = rowData.interior_exterior;
    this.designOptions = rowData.design.label;
    this.scheduleDay = rowData.schedule_day;  
    this.scheduleDate = rowData.schedule_date;  
    this.status = rowData.status_id;  
    this.mainCategoryMaster = rowData.main_category_id;
    this.maincategoryOptions=[{label:rowData.categoryname,value:rowData.sino}];
    this.subCategoryMaster = rowData.sub_category_id;
    this.subcategoryOptions=[{label:rowData.categoryname,value:rowData.sino}];
    this.selectedType = (rowData.flag === 'Active') ? 1 : 0;

  }
}