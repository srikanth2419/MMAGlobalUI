import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message, MessageService, SelectItem } from 'primeng/api';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { MasterService } from 'src/app/services/master.service';
import { RestapiService } from 'src/app/services/restapi.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interface/user.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-call-sheet',
  templateUrl: './call-sheet.component.html',
  styleUrls: ['./call-sheet.component.scss']
})
export class CallSheetComponent implements OnInit {
  projectNameOptions:any;
  projectName: any;
  roleOptions: any;
  role: any;
  date: any;
  locationOptions:any;
  location: any;
  generalCallTime: any;
  shootingCallTime: any;
  callSheetCols: any;
  callSheetDetails: any[] = [];
  selectedPerson: any[] = [];
  locationName: any;
  phoneNumber:any;
  mainCategoryOptions:any;
  subCategoryOptions:any;
  mainCategory:any;
  subCategory:any;
  note: any;
  address: any;
  driverName: any;
  pickupTime: any;
  pickupLocation: any;
  dropLocation: any;
  passengerNameOptions: SelectItem[] = [];
  passengerName: any;
  lodginginfocols:any;
  lodginginfoData:any[]=[];
  callinfoData:any[]=[];
  transportinfocols:any;
  transportinfoData:any[]=[];
  loading: boolean = false;
  RowId:any;
  responseMsg: Message[] = [];
  selectedType: any;
  rolemasterData:any[]=[];
  Id:any = 0;
  Row:any =0;
  newprojectcreationData: any[] = [];
  data: any[]=[];
  contactlistData:any[]=[];
  shootingScheduleDetails:any;
  contactlistcols:any;
  mainCategoryData:any[]=[];
  subCategoryData:any[]=[];
  totalRecords: number = 0;
  selectAll: boolean = false;
  selectedCustomers: any[] = [];
  callinfocol:any;
  mainCategoryMaster:any;
  subCategoryMaster:any;
  maincategorynew:any[] = [];
  rowData:any;
  roleMaster:any[]=[];
  contactid: any = [];
  generalCallTimeUpdate: any;
  shootingCallTimeUpdate: any;
  pickupTimeUpdate: any;
  userInfo: any;
  logged_user!: User
  prod_id: any;
  block: RegExp = /^[^-=<>*%()^{}$@#_!+0-9&?,\s~`|.:;'"?/]/; 

  @ViewChild('f', {static: false}) _respondentForm!: NgForm;

  
  constructor(private restapiservice: RestapiService,private _masterService: MasterService, private _datePipe: DatePipe,private authservice: AuthService,private messageService: MessageService) { }
  ngOnInit(): void {
    this.callinfocol =TableConstants.callinfoColumns
    this.contactlistcols = TableConstants.ShootingScheduleColumns;
    this.lodginginfocols=TableConstants.lodginginfoColumns;
    this.transportinfocols=TableConstants.transportinfoColumns;
    this.restapiservice.get(Pathconstants.projectcreation_Get).subscribe(res => { this.newprojectcreationData = res })
    this.restapiservice.get(Pathconstants.LocationInfo_Get).subscribe(res => { this.data = res})
    this.mainCategoryData = this._masterService.getMaster('MC')
    this.subCategoryData = this._masterService.getMaster('SC')
    this.roleMaster = this._masterService.getMaster('RM')
        this.restapiservice.get(Pathconstants.ContactListController_Get).subscribe(res => {
          this.contactlistData = res})
          this.logged_user = this.authservice.getUserInfo();
          this.prod_id = this.logged_user.production_id;
          this.onView();
          
  }
    onSelect(type: any) {
      console.log('l',this.generalCallTime)
    let roleSelection: any = [];
    let projectcreationSelection:any =[];
    let locationSelection:any =[];
    let contactSelection:any =[];
    let maincategorySelection:any=[];
    let subcategorySelection:any=[];
    switch (type) {
      case 'P':
        this.newprojectcreationData.forEach((c: any) => {
          if(c.production_id === this.prod_id)
          {
          projectcreationSelection.push({ label:c. project_name, value: c.project_id });
          }
        })
        this.projectNameOptions =  projectcreationSelection;
        this.projectNameOptions.unshift({ label: '-select', value: null });
        break;
      case 'R':
        this.roleMaster.forEach((c: any) => {
          roleSelection.push({label: c.name, value: c.code });
        })
        this.roleOptions =  roleSelection;
        this.roleOptions.unshift({ label: '-select', value: null });
        break;
        case 'L':
          this.data.forEach((c: any) => {
            locationSelection.push({ label: c.location_name, value: c.slno });
          })
          this.locationOptions =  locationSelection;
          this.locationOptions.unshift({ label: '-select', value: null });
          break;
          case 'T':
          this.contactlistData.forEach((c: any) => {
            contactSelection.push({ label: c.first_name, value: c.slno });
          })
          this.passengerNameOptions =  contactSelection;
          this.passengerNameOptions.unshift({ label: '-select', value: null });
          break;
          case 'M':
            this.mainCategoryData.forEach((c: any) => {
              maincategorySelection.push({ label: c.name, value: c.code });
            })
            this.mainCategoryOptions =  maincategorySelection;
            this.mainCategoryOptions.unshift({ label: '-select', value: null });
            break;
            case 'S':
            this.subCategoryData.forEach((c: any) => {
              if (c.maincategorycode === this.mainCategory.value) {
              subcategorySelection.push({ label: c.name, value: c.code });
              }
            })
            this.subCategoryOptions =  subcategorySelection;
            this.subCategoryOptions.unshift({ label: '-select', value: null });
            break;
        }
    }
  onSavecallsheet(){
    this.getContactId();
    const callinfoparams ={
      'slno':this.Row,
      'project_name':this.projectName.value,
      'role_id':this.role.value,
      'date':this.date,
      'general_call_time':(this.generalCallTimeUpdate)? this.generalCallTimeUpdate : this._datePipe.transform(this.generalCallTime, 'hh:mm:ss'),
      'shooting_call_time':(this.shootingCallTimeUpdate)? this.shootingCallTimeUpdate:this._datePipe.transform(this.shootingCallTime, 'hh:mm:ss'),
      //'general_call_time':this.generalCallTime,
      //'shooting_call_time':this.shootingCallTime,
      'location_id':this.location.value,
      'phone_number':this.phoneNumber,
      'main_category_id':this.mainCategory.value,
      'sub_category_id':this.subCategory.value,
      'created_date': new Date(),
      'production_id':this.prod_id,
      'flag':(this.selectedType == 1) ? true : false
    };
//lodginginfo
const lodginginfoparams = {
  'slno': this.RowId,
  'location': this. locationName,
  'address':this.address,
  'note':this. note,
};
//transportinfo
const transportinfoparams = {
  'slno': this.Id,
  'driver_name': this.driverName,
  'pickup_time':(this.pickupTimeUpdate) ? this.pickupTimeUpdate :this._datePipe.transform(this.pickupTime, 'hh:mm:ss'),
  'pickup_location':this.pickupLocation,
  'drop_location':this.dropLocation,
  'passenger_id':this.passengerName,
};
const params=   //call character
{
'callinfo' : callinfoparams,
'lodging' : lodginginfoparams,
'transport' : transportinfoparams,
'contactusid' : this.contactid,

};
    this.restapiservice.post(Pathconstants.callinfo_Post, params).subscribe(res => {
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
    clearform() {
    this._respondentForm.reset();
    }
  getContactId() {            //get selected fields contact id as a string array
    var arr:any = [];
    this.contactid = []
    this.selectedCustomers.forEach(i => {
        this.contactid.push(i.contactid)
       })
       arr = this.contactid
       console.log('array',this.contactid)
  }
   
  onSelectionChange(value : any) {
     this.selectAll = value.length === this.totalRecords;
     this.selectedCustomers = value;
   console.log('m',value)
}
  onView(){
     
    //  const params = {
    //   "production_id" : this.prod_id
    // };
    // this.restapiservice.getByParameters(Pathconstants.callinfo_GET,params).subscribe(res => {
    //   this.callinfoData = res
    //   if (res) {
    //     res.forEach((i: any) => {
    //       i.flag = (i.flag == true) ? 'Active' : 'InActive'
    //     })
    //   }
    // })
    const params = {
      "production_id" : this.prod_id
    };
    this.restapiservice.getByParameters(Pathconstants.callinfo_get_by_productionid_GET, params).subscribe(response => {
      this.callinfoData = response
      if (response) {
        response.forEach((i: any) => {
          i.flag = (i.flag == true) ? 'Active' : 'InActive'
        })
      }
    })
    const params1 ={
      "production_id" : this.prod_id
    };
    this.restapiservice.getByParameters(Pathconstants.lodginginfo_GET,params1).subscribe(res => {
      this.lodginginfoData = res;
    })
    const params2={
      "production_id" : this.prod_id
    };
    this.restapiservice.getByParameters(Pathconstants.transportinfo_GET,params2).subscribe(res => {
      this.transportinfoData = res;
    })
  } 
  onEditcallinfo(rowData:any){
  this.Row=rowData.slno;
  this.projectName=rowData.project_name;
  this.projectNameOptions=[{ label: rowData.projectname, value: rowData.project_name}];
  this.role=rowData.role_id;
  this.roleOptions=[{ label: rowData.rolename, value: rowData.role_id }];
  this.date=new Date(rowData.date);
  this.generalCallTime= rowData.general_call_time;
  this.generalCallTimeUpdate=new Date(rowData.general_call_time);
  this.shootingCallTime=rowData.shooting_call_time;
  this.shootingCallTimeUpdate=rowData.shooting_call_time;
  this.location=rowData.location_id;
  this.locationOptions=[{ label: rowData.location_name, value: rowData.location_id }];
  this.phoneNumber=rowData.phone_number,
  this.mainCategory=rowData.main_category_id,
  this.mainCategoryOptions=[{ label: rowData.categoryname, value: rowData.main_category_id }];
  this.subCategory=rowData.sub_category_id,
  this.subCategoryOptions=[{ label: rowData.subcategoryname, value: rowData.sub_category_id }];
  this.selectedType = (rowData.flag === 'Active') ? 1 : 0;
  this.onAdd();
  }
onSavelodginginfo(){
  const params = {
    'slno': this.RowId,
    'location': this. locationName,
    'address':this.address,
    'note':this. note,
  };
  this.restapiservice.post(Pathconstants.lodginginfo_Post, params).subscribe(res => {
    if (res != null && res != undefined) {
      this.responseMsg = [{ severity: ResponseMessage.SuccessSeverity, detail: ResponseMessage.SuccessMessage }];
      setTimeout(() => this.responseMsg = [], 3000);
    }
    else {
      this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: ResponseMessage.ErrorMessage }];
      setTimeout(() => this.responseMsg = [], 3000);
    }
  })
}
onEditlodginginfo(rowData:any){
  this.RowId=rowData.slno;
  this.locationName=rowData.location;
  this.address=rowData.address;
  this.note=rowData.note;
}
onSavetransportinfo(){
  const params = {
    'slno': this.Id,
    'driver_name': this.driverName,
    'pickup_time':this.pickupTime,
    'pickup_location':this.pickupLocation,
    'drop_location':this.dropLocation,
    'passenger_id':this.passengerName,
  };
  this.restapiservice.post(Pathconstants.transportinfo_Post, params).subscribe(res => {
    if (res != null && res != undefined) {
      
      this.responseMsg = [{ severity: ResponseMessage.SuccessSeverity, detail: ResponseMessage.SuccessMessage }];
      setTimeout(() => this.responseMsg = [], 3000);
    }
    else {
      this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: ResponseMessage.ErrorMessage }];
      setTimeout(() => this.responseMsg = [], 3000);
    }
  })
}
onEdittransportinfo(rowData:any){
  this.Id=rowData.slno;
  this.driverName=rowData.driver_name;
  this.pickupTime=rowData.pickup_time;
  this.pickupTimeUpdate=rowData.pickup_time;
  this.pickupLocation=rowData.pickup_location;
  this.dropLocation=rowData.drop_location;
  this.passengerName=rowData.passenger_id;
  this.passengerNameOptions=[{ label: rowData.passengername, value: rowData.passenger_id
  }];
  
}
onAdd() {
  this.maincategorynew=[];
   this.restapiservice.get(Pathconstants.ContactListController_Get).subscribe(res => {
    //console.log(2,res);
   this.shootingScheduleDetails = res;
   //console.log(3,res);
  // console.log('kj',this.shootingScheduleDetails)
    this.shootingScheduleDetails.forEach((i: any) => {
       if(i.maincategory_id === this.mainCategory.value && i.subcategory_id === this.subCategory.value) 
       {console.log('i',i.maincategory_id)
        console.log('i2',i.subcategory_id)
        console.log('this',this.mainCategoryMaster)
        console.log('this1',this.subCategoryMaster)
        this.maincategorynew.push ({'maincategoryname':i.maincategoryname, 'subcategoryname': i.subcategoryname,'rolename' :i.rolename,'phonenumber':i.phonenumber,'first_name':i.first_name, 'contactid':i.slno});
      }})
    })}
    onClear(){
      this.Id=0;
      this.projectNameOptions=null;
      this.roleOptions=null;
      this.generalCallTime=null;
      this.date=null;
      this.generalCallTime=null;
      this.shootingCallTime=null;
      this.locationOptions=null;
      this.phoneNumber=null;
      this.mainCategoryOptions=null;
      this.subCategoryOptions=null;
      this.selectedType = null;
      this.locationName=null;
      this.address=null;
      this.note=null;
      this.driverName=null;
      this.pickupTime=null;
      this.pickupLocation=null;
      this.dropLocation=null;
      this.passengerName=null;
      this.onAdd();
    }
    oncheck(){
      this.data.forEach( i => {
        if(i.maincategory_id == this.mainCategory.value && i.subcategory_id == this.subCategory.value)  {
          this.responseMsg = [{ severity: ResponseMessage.WarnSeverity, detail: 'Name is already exist, Please input different name' }];
           this.mainCategory = null;
           this.subCategory =null;
        } 
      })
    }
}