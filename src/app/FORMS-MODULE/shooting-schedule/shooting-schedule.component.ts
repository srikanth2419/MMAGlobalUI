import { Component, OnInit, ViewChild } from '@angular/core';
import { Header, Message, MessageService, SelectItem } from 'primeng/api';
import { ConnectableObservable } from 'rxjs';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { MasterService } from 'src/app/services/master.service';
import { User } from 'src/app/interface/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shooting-schedule',
  templateUrl: './shooting-schedule.component.html',
  styleUrls: ['./shooting-schedule.component.scss']
})
export class ShootingScheduleComponent implements OnInit {
  projectNameOptions: any;
  projectName: any;
  scheduleDate:any;
  scheduleDay: any;
  dayNightOptions: any;
  dayNight: any;
  designOptions: any;
  design: any;
  statusOptions: any;
  status: any;
  scene: any;
  shootingScheduleCols: any;
  shootingScheduleDetails: any[] = [];
  selectedPerson: any[] = [];
  newprojectcreationData: any[] = [];
  responseMsg: Message[] = [];
  RowId: any = 0;
  selected: any;
  block: RegExp = /^[^-=<>*%()^{}$@#_!+0-9&?,\s~`|.:;'"?/]/;
  totalRecords: number = 0;
  selectAll: boolean = false;
  selectedCustomers: any[] = [];
  Disabled: any;
  ShootingScheduleCols: any;
  ShootingScheduleData: any[] = [];
  loading: boolean = false;
  contactlistData: any[] = [];
  maincategoryOptions: any;
  mainCategory: any
  mainCategoryData: any[] = [];
  subCategoryData: any;
  subcategoryOptions: any;
  subCategory: any;
  minDate: any;
  maincategorynew: any[] = [];
  shootingStatusData:any[] = [];
  selectedType: any;
  contactid:any =[];
  contactlistcols:any;
  masterData:any[] = [];
  userInfo: any;
  logged_user!: User;
  prod_id:any;
  @ViewChild('f', { static: false }) _shootingsheduleForm!: NgForm;
  constructor(private restapiservice: RestapiService,private _masterService: MasterService,private authservice: AuthService,private messageService: MessageService) {
  }

  ngOnInit(): void {
    
    this.minDate = new Date();
    this.mainCategoryData = this._masterService.getMaster('MC')
    this.subCategoryData = this._masterService.getMaster('SC')
    this.shootingStatusData=this._masterService.getMaster('SS')
    this.logged_user = this.authservice.getUserInfo();
    this.prod_id= this.logged_user.production_id;
    this.onView();

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
  }

  onSelect(type: any) {
    let projectSelection: any = [];
    let maincategoryselection: any = [];
    let subcategoryselection: any = [];
    let shootingstatusselection:any=[];


    switch (type) {
      case 'PN':
        this.newprojectcreationData.forEach((c: any) => {
          if(c.production_id === this.prod_id)
          {
          projectSelection.push({ label: c.project_name, value: c.project_id });
          }
        })
        this.projectNameOptions = projectSelection;
        this.projectNameOptions.unshift({ label: '-select', value: null });
        break;
      case 'MC':
        this.mainCategoryData.forEach((c: any) => {
          maincategoryselection.push({ label: c.name, value: c.code });
        })
        this.maincategoryOptions = maincategoryselection;
        this.maincategoryOptions.unshift({ label: '-select', value: null });
        break;

      case 'SC':
        this.subCategoryData.forEach((c: any) => {
          subcategoryselection.push({ label: c.name, value: c.code });
        })
        this.subcategoryOptions = subcategoryselection;
        this.subcategoryOptions.unshift({ label: '-select', value: null });
        break;

        case 'SS':
          this.shootingStatusData.forEach((c: any) => {
            shootingstatusselection.push({ label: c.name, value: c.code });
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
        'project_id': this.projectName.value,
        'scene': this.scene ,
        'interior_exterior': this.design.label,
        'day_night': this.dayNight.label,
        'schedule_day': this.scheduleDay,
        'schedule_date': this.scheduleDate,
        'status_id': this.status.value,
        'main_category_id': this.mainCategory.value,
        'sub_category_id': this.subCategory.value,
        'created_date': new Date(),
        'flag': (this.selectedType == 1) ? true : false,
        'production_id':this.prod_id

      };
      const params={
        'shooting_Schedule':shootingparams,
        'contactusid':this.contactid,
        
      };
      this.restapiservice.post(Pathconstants.shooting_schedule_Post, params).subscribe(res => {
        if (res) {
          this.clearform();
          this.onView();
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SuccessSeverity,
            summary: ResponseMessage.SuccessSeverity, detail: ResponseMessage.SuccessMessage
          });
        } else {
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
            summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
          });
        }
      }, (err: HttpErrorResponse) => {
        if (err.status === 0 || err.status === 400) {
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
            summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
          })
        }
      })
      }
    }
    
  getContactId() { 
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

  clearform() {
     this._shootingsheduleForm.reset();
     this.projectNameOptions=[];
     this.dayNightOptions=[];
     this.statusOptions=[];
     this.maincategoryOptions = [];
     this.subcategoryOptions = [];
     this.selectedType = null;
     this.onAdd();
  }

  onAdd() {
    this.shootingScheduleDetails = [];
    this.maincategorynew =[];
    this.restapiservice.get(Pathconstants.ContactListController_Get).subscribe(res => { 
    this.shootingScheduleDetails = res; 
    this.shootingScheduleDetails.forEach((i: any) => {
    if(i.maincategory_id === this.mainCategory.value && i.subcategory_id === this.subCategory.value) { 
      console.log('succ')
    this.maincategorynew.push ({'maincategoryname':i.maincategoryname, 'subcategoryname': i.subcategoryname,'rolename' :i.rolename,'phonenumber':i.phonenumber,'first_name':i.first_name,'contactid':i.slno});
     }
    }) 
    })
    this.mainCategoryData.forEach(i => {
      if (i.maincategory_id === this.maincategoryOptions) {
        this.responseMsg = [{ severity: ResponseMessage.WarnSeverity, detail: 'Category name is already exist, Please input different name' }];
        setTimeout(() => this.responseMsg = [], 2000)
        this.mainCategory = null;
      }
    })
  } 
  
  onView() {
    // this.restapiservice.get(Pathconstants.shooting_schedule_Get).subscribe(res => {
    //   this.ShootingScheduleData = res;
    //   if (res) {
    //     res.forEach((i: any) => {
    //       i.flag = (i.flag == true) ? 'Active' : 'InActive'
    //     })
    //   }
    // })
    const params = {
      "production_id" : this.prod_id
    };
    this.restapiservice.getByParameters(Pathconstants.shooting_schedule_Get_by_prodid, params).subscribe(response => {
      this.ShootingScheduleData = response
      if (response) {
        response.forEach((i: any) => {
          i.flag = (i.flag == true) ? 'Active' : 'InActive'
        })
      }
    })
  }
  onEdit(rowData: any) {
    this.RowId = rowData.slno;
    this.projectName = rowData.project_id;
    this.projectNameOptions=[{label:rowData.project_name,value:rowData.project_id}];
    this.scene=rowData.scene;
    this.design=rowData.interior_exterior;
    this.designOptions=[{label:rowData.interior_exterior,value:rowData.interior_exterior}];
    this.dayNight=rowData.day_night;
    this.dayNightOptions=[{label:rowData.day_night,value:rowData.day_night}];
    this.scheduleDay=rowData.schedule_day;
    this.scheduleDate=new Date(rowData.schedule_date);
    this.status=rowData.status_id;
    this.statusOptions=[{label:rowData.shooting_status,value:rowData.status_id}];
    this.mainCategory=rowData.main_category_id;
    this.maincategoryOptions=[{label:rowData.maincategoryname,value:rowData.main_category_id}];
    this.subCategory=rowData.sub_category_id;
    this.subcategoryOptions=[{label:rowData.subcategoryname,value:rowData.sub_category_id}];
    this.selectedType = (rowData.flag === 'Active') ? 1 : 0;
    this.onAdd();
  }
}