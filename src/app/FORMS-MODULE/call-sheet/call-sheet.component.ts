import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';

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
  contactid: any = [];
  @ViewChild('f', {static: false}) _respondentForm!: NgForm;
  constructor(private restapiservice: RestapiService) { }
  ngOnInit(): void {
    this.callinfocol =TableConstants.callinfoColumns
    this.contactlistcols = TableConstants.ShootingScheduleColumns;
    this.lodginginfocols=TableConstants.lodginginfoColumns;
    this.transportinfocols=TableConstants.transportinfoColumns;
    this.restapiservice.get(Pathconstants.rolemaster_Get).subscribe(res => {this.rolemasterData = res})
    this.restapiservice.get(Pathconstants.projectcreation_Get).subscribe(res => { this.newprojectcreationData = res })
    this.restapiservice.get(Pathconstants.LocationInfo_Get).subscribe(res => { this.data = res})
    this.restapiservice.get(Pathconstants.MainCategoryMasterController_Get).subscribe(res => {
      this.mainCategoryData = res})
      this.restapiservice.get(Pathconstants.SubCategoryMasterController_Get).subscribe(res => {
        this.subCategoryData =res})
        this.restapiservice.get(Pathconstants.ContactListController_Get).subscribe(res => {
          this.contactlistData = res})
          this.onView();
  }
    onSelect(type: any) {
    let roleSelection: any = [];
    let projectcreationSelection:any =[];
    let locationSelection:any =[];
    let contactSelection:any =[];
    let maincategorySelection:any=[];
    let subcategorySelection:any=[];
    switch (type) {
      case 'P':
        this.newprojectcreationData.forEach((c: any) => {
          projectcreationSelection.push({ label:c. project_name, value: c.project_id });
        })
        this.projectNameOptions =  projectcreationSelection;
        this.projectNameOptions.unshift({ label: '-select', value: null });
        break;
      case 'R':
        this.rolemasterData.forEach((c: any) => {
          roleSelection.push({ label: c.rolename, value: c.roleid });
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
              maincategorySelection.push({ label:c. categoryname, value: c.sino });
            })
            this.mainCategoryOptions =  maincategorySelection;
            this.mainCategoryOptions.unshift({ label: '-select', value: null });
            break;
            case 'S':
            this.subCategoryData.forEach((c: any) => {
              subcategorySelection.push({ label:c. categoryname, value: c.sino });
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
      'general_call_time':this.generalCallTime,
      'shooting_call_time':this.shootingCallTime,
      'location_id':this.location.value,
      'phone_number':this.phoneNumber,
      'main_category_id':this.mainCategory.value,
      'sub_category_id':this.subCategory.value,
      'created_date': new Date(),
      'flag':(this.selectedType == 1) ? true : false
    };
//save 2
const lodginginfoparams = {
  'slno': this.RowId,
  'location': this. locationName,
  'address':this.address,
  'note':this. note,
};
//save3
const transportinfoparams = {
  'slno': this.Id,
  'driver_name': this.driverName,
  'pickup_time':this.pickupTime,
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
      if (res != null && res != undefined) {
        this.onView();
        this.onClear();
        this._respondentForm.reset();
        this.responseMsg = [{ severity: ResponseMessage.SuccessSeverity, detail: ResponseMessage.SuccessMessage }];
        setTimeout(() => this.responseMsg = [], 3000);
      }
      else {
        this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: ResponseMessage.ErrorMessage }];
        setTimeout(() => this.responseMsg = [], 3000);
      }
    })
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
    this.restapiservice.get(Pathconstants.callinfo_GET).subscribe(res => {
      this.callinfoData = res
      if (res) {
        res.forEach((i: any) => {
          i.flag = (i.flag == true) ? 'Active' : 'InActive'
        })
      }
    })
    this.restapiservice.get(Pathconstants.lodginginfo_GET).subscribe(res => {
      this.lodginginfoData = res;
    })
    this.restapiservice.get(Pathconstants.transportinfo_GET).subscribe(res => {
      this.transportinfoData = res;
    })
  }
  onEditcallinfo(rowData:any){
  this.RowId=rowData.slno;
  this.projectName=rowData.project_name;
  this.projectNameOptions=[{ label: rowData.projectname, value: rowData.project_id }];
  this.role=rowData.role_id;
  this.roleOptions=[{ label: rowData.rolename, value: rowData.roleid }];
  this.date=new Date(rowData.date);
  this.generalCallTime=rowData.general_call_time;
  this.shootingCallTime=rowData.shooting_call_time;
  this.location=rowData.location_id;
  this.locationOptions=[{ label: rowData.location_name, value: rowData.slno }];
  this.phoneNumber=rowData.phone_number,
  this.mainCategory=rowData.main_category_id,
  this.mainCategoryOptions=[{ label: rowData.categoryname, value: rowData.sino }];
  this.subCategory=rowData.sub_category_id,
  this.subCategoryOptions=[{ label: rowData.subcategoryname, value: rowData.sino }];
  this.selectedType = (rowData.flag === 'Active') ? 1 : 0;
  
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
  this.pickupLocation=rowData.pickup_location;
  this.dropLocation=rowData.drop_location;
  this.passengerName=rowData.passenger_id;
  this.passengerNameOptions=[{ label: rowData.passengername, value: rowData.passenger_id
  }];
}

onAdd() {
   this.restapiservice.get(Pathconstants.ContactListController_Get).subscribe(res => {
    console.log(2,res);
   this.shootingScheduleDetails = res;
   console.log(3,res);
   console.log('kj',this.shootingScheduleDetails)
    this.shootingScheduleDetails.forEach((i: any) => {
       console.log(4)
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
    }
}