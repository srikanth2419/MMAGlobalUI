import { Component, OnInit } from '@angular/core';
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
  projectNameOptions: SelectItem[] = [];
  projectName: any;
  roleOptions: SelectItem[] = [];
  role: any;
  date: Date = new Date();
  locationOptions: SelectItem[] = [];
  location: any;
  generalCallTime: any;
  scheduleCallTime: any;
  callSheetCols: any;
  callSheetDetails: any[] = [];
  selectedPerson: any[] = [];
  locationName: string = '';
  phoneNumber:any;
  mainCategoryOptions:any;
  subCategoryOptions:any;
  mainCategory:any;
  subCategory:any;
  note: string = '';
  address: string = '';
  driverName: string = '';
  pickupTime: any;
  pickupLocation: string = '';
  dropLocation: string = '';
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
  constructor(private restapiservice: RestapiService) { }
  ngOnInit(): void {
    this.onView1();
    this.onView2();
    this.onView3();
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
          projectcreationSelection.push({ label:c. project_name, value: c.slno });
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
  onSave1(){
    const params ={
      'slno':this.Row,
      'project_name':this.projectName,
      'role_id':this.role,
      'date':this.date,
      'general_call_time':this.generalCallTime,
      'shooting_call_time':this.scheduleCallTime,
      'location_id':this.location,
      'phone_number':this.phoneNumber,
      'created_date': new Date(),
      'flag':(this.selectedType == 1) ? true : false
    };
    this.restapiservice.post(Pathconstants.callinfo_Post, params).subscribe(res => {
      if (res != null && res != undefined) {
        this.onView1();
        this.responseMsg = [{ severity: ResponseMessage.SuccessSeverity, detail: ResponseMessage.SuccessMessage }];
        setTimeout(() => this.responseMsg = [], 3000);
      }
      else {
        this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: ResponseMessage.ErrorMessage }];
        setTimeout(() => this.responseMsg = [], 3000);
      }
    })
    
  }
  onSelectionChange(value = []) {
    this.selectAll = value.length === this.totalRecords;
    this.selectedCustomers = value;
    console.log('m',value)
}
  onView1(){
    this.restapiservice.get(Pathconstants.callinfo_GET).subscribe(res => {
      this.callinfoData = res;
    })

  }
  onEdit1(){

  }
onSave2(){
  const params = {
    'slno': this.RowId,
    'location': this. locationName,
    'address':this.address,
    'note':this. note,
  };
  this.restapiservice.post(Pathconstants.lodginginfo_Post, params).subscribe(res => {
    if (res != null && res != undefined) {
      this.onView2();
      
      this.responseMsg = [{ severity: ResponseMessage.SuccessSeverity, detail: ResponseMessage.SuccessMessage }];
      setTimeout(() => this.responseMsg = [], 3000);
    }
    else {
      this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: ResponseMessage.ErrorMessage }];
      setTimeout(() => this.responseMsg = [], 3000);
    }
  })
}
onView2(){
    this.restapiservice.get(Pathconstants.lodginginfo_GET).subscribe(res => {
      this.lodginginfoData = res;
    })
}
onEdit2(rowData:any){
  this.RowId=rowData.slno;
  this.locationName=rowData.location;
  this.address=rowData.address;
  this.note=rowData.note;
}
onSave3(){
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
      this.onView3();
      
      this.responseMsg = [{ severity: ResponseMessage.SuccessSeverity, detail: ResponseMessage.SuccessMessage }];
      setTimeout(() => this.responseMsg = [], 3000);
    }
    else {
      this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: ResponseMessage.ErrorMessage }];
      setTimeout(() => this.responseMsg = [], 3000);
    }
  })

}
onView3(){
  this.restapiservice.get(Pathconstants.transportinfo_GET).subscribe(res => {
    this.transportinfoData = res;
  })
}
onEdit3(rowData:any){
  this.Id=rowData.slno;
  this.driverName=rowData.driver_name;
  this.pickupTime=rowData.pickup_time;
  this.pickupLocation=rowData.pickup_loaction;
  this.dropLocation=rowData.drop_location;
  this.passengerName=rowData.passenger_id;
}

onAdd() {
  this.restapiservice.get(Pathconstants.ContactListController_Get).subscribe(res => {this.contactlistData = res})   

    }
  }