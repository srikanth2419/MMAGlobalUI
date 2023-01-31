import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';
import { ResponseMessage } from '../CONSTANTS-MODULE/message-constants';
import { Pathconstants } from '../CONSTANTS-MODULE/pathconstants';
import { TableConstants } from '../CONSTANTS-MODULE/table-constants';
import { RestapiService } from '../services/restapi.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  productionHouseName: string = '';
  firstName: string = '';
  lastName: string = '';
  dob: any;
  mobileNo: any;
  emailId: string = '';
  password: string = '';
  confirmPwd: string = '';
  countryOptions: SelectItem[] = [];
  country: any;
  stateOptions: SelectItem[] = [];
  state: any;
  cityOptions: SelectItem[] = [];
  city: any;
  addressLine1: string = '';
  addressLine2: string = '';
  pincode: any;
  selectedType: any;
  loading:boolean = false;
  registrationData :any[]=[];
  registrationCols:any; 
  responseMsg: Message[] = [];
  RowId:any = 0;
  countrymasterData:any;
  statemasterData:any;
  citymasterData:any;
  @ViewChild('f', {static: false}) _respondentForm!: NgForm;
  constructor(private restapiservice: RestapiService) { }
  ngOnInit(): void {
    this.onView();
    this.restapiservice.get(Pathconstants.countrymaster_Get).subscribe(res => { this.countrymasterData = res })
    this.restapiservice.get(Pathconstants.StateMasterDB_GET).subscribe(res => { this.statemasterData = res })
    this.restapiservice.get(Pathconstants.CityMasterDB_GET).subscribe(res => { this.citymasterData = res})
    this.registrationCols = TableConstants.RegistrationColumns;
  }
  onSelect(type: any) {
    let countrySelection: any = [];
    let stateSelection: any = [];
    let citySelection: any =[];
    switch (type) {
      case 'C':
        this.countrymasterData.forEach((c: any) => {
          countrySelection.push({ label: c.countryname, value: c.countrycode });
        })
        this.countryOptions = countrySelection;
        this.countryOptions.unshift({ label: '-select', value: null });
        break;
        case 'S':
        this.statemasterData.forEach((c: any) => {
          stateSelection.push({ label: c.statename, value: c.statecode });
        })
        this.stateOptions = stateSelection;
        this.stateOptions.unshift({ label: '-select', value: null });
        break;
        case 'y':
          this.citymasterData.forEach((c:any) => {
            citySelection.push({ label: c.cityname, value: c.citycode });
          })
          this.cityOptions =citySelection;
          this.cityOptions.unshift({ label: '-select', value: null });
    }

  }
  onSave(){
    const params={
      'slno':this.RowId,
      'production_house_name':this.productionHouseName,
      'first_name':this.firstName,
      'last_name':this.lastName,
      'dob':this.dob,
      'mobile_number':this.mobileNo,
      'email_id':this.emailId,
      'password':this.password,
      'country':this.country,
      'state':this.state,
      'city':this.city,
      'address1':this.addressLine1,
      'address2':this.addressLine2,
      'pincode':this.pincode,
      'created_date': new Date(),
      'flag':(this.selectedType == 1) ? true : false
    };
   this.restapiservice.post(Pathconstants.registration_Post, params).subscribe(res => {
    if(res!== null && res!== undefined)
    {
      this.onView();
      this.onClear();
      this._respondentForm.reset();
      this.responseMsg = [{ severity: ResponseMessage.SuccessSeverity, detail: ResponseMessage.SuccessMessage }];
      setTimeout(() => this.responseMsg = [], 3000);
    }
    else{
      this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: ResponseMessage.ErrorMessage }];
    setTimeout(() => this.responseMsg = [], 3000)
    }
    })

  }
  onView(){
    this.restapiservice.get(Pathconstants.registration_GET).subscribe(res => {
      this.registrationData = res;
      if (res) {
        res.forEach((i: any) => {
          i.flag = (i.flag == true) ? 'Active' : 'InActive'
        })
      }
    })
  }
onEdit(rowData:any){
  this.RowId=rowData.slno;
  this.productionHouseName=rowData.production_house_name;
  this.firstName=rowData.first_name;
  this.lastName=rowData.last_name;
  this.dob=rowData.dob;
  this.mobileNo=rowData.mobile_number;
  this.emailId=rowData.email_id;
  this.password=rowData.password;
  this.country=rowData.country;
  this.state=rowData.state;
  this.city=rowData.city;
  this.addressLine1=rowData.address1;
  this.addressLine2=rowData.address2;
  this.pincode=rowData.pincode;
  this.selectedType = (rowData.flag === 'Active') ? 1 : 0;

}
onClear(){
  this.RowId =0;
  this.productionHouseName = '';
  this.firstName ='';
  this.lastName ='';
  this.dob =null;
  this.mobileNo =null;
  this.emailId ='';
  this.password ='';
  this.country =null;
  this.state =null;
  this.city =null;
  this.addressLine1='';
  this.addressLine2='';
  this.pincode =null;
}
}
