import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';
import { Observable, observable } from 'rxjs';
import { ResponseMessage } from '../CONSTANTS-MODULE/message-constants';
import { Pathconstants } from '../CONSTANTS-MODULE/pathconstants';
import { TableConstants } from '../CONSTANTS-MODULE/table-constants';
import { MasterService } from '../services/master.service';
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
  mailId: any;
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
  approvedstatus:any;
  countryMaster:any[]=[];
  statemaster:any[]=[];
  cityMaster:any[]=[];
  masterData:any;
  data: any[] = [];
  userName:any;
  block: RegExp = /^[^-=<>*%()^{}$@#_!+0-9&?,\s~`|.:;'"?/]/;
  blockemail : RegExp = /^[^-=<>*%()^{}$#!+0-9&?,\s~`|:;'"?/]/;
  blockadd :RegExp = /^[^-=<>*%()^{}$#!+&?s~`|;'"?/]/;
  @ViewChild('f', {static: false}) _RegistrationForm!: NgForm;
  pincode_max: any;
  obj: any;
  constructor(private restapiservice: RestapiService,private _masterService: MasterService) { 
    // let masterData:any =new Observable<any[]>();
   this.masterData=this._masterService.invokeMasterData();
    // masterData.subscribe();
  }
  ngOnInit(): void {
    this.onView();
    setTimeout(() => {
      this.countryMaster = this._masterService.getMaster('CM');
    this.statemaster = this._masterService.getMaster('SM');
    this.cityMaster = this._masterService.getMaster('CIM');
    }, 500);
    this.registrationCols = TableConstants.RegistrationColumns;
    this.pincode_max = 643253;
     
  }
  onSelect(type: any) {
    let countrySelection: any = [];
    let stateSelection: any = [];
    let citySelection: any =[];
    switch (type) {
      case 'C':
        this.countryMaster.forEach((c: any) => {
          countrySelection.push({ label: c.name, value: c.code });
        })
        this.countryOptions = countrySelection;
        this.countryOptions.unshift({ label: '-select', value: null });
        break;
        case 'S':
        this.statemaster.forEach((sm: any) => {
          if (sm.countrycode === this.country){
          stateSelection.push({ label: sm.name, value: sm.code });
          }
        })
        this.stateOptions = stateSelection;
        this.stateOptions.unshift({ label: '-select', value: null });
        break;
        case 'y':
          this.cityMaster.forEach((cm:any) => {
            if (cm.statecode === this.state) {
            citySelection.push({ label: cm.name, value: cm.code });
            }
          })
          this.cityOptions =citySelection;
          this.cityOptions.unshift({ label: '-select', value: null });
    }

  }
  onSave(){
    const params={
      'production_id':this.RowId,
      'production_house_name':this.productionHouseName,
      'first_name':this.firstName,
      'last_name':this.lastName,
      'dob':this.dob,
      'mobile_number':this.mobileNo,
      'email_id':this.mailId,
      'password':this.password,
      'country':this.country,
      'state':this.state,
      'city':this.city,
      'address1':this.addressLine1,
      'address2':this.addressLine2,
      'pincode':this.pincode,
      'created_date': new Date(),
      'flag':(this.selectedType == 1) ? true : false,
      'approvalstatus':0,
    };
   this.restapiservice.post(Pathconstants.registration_Post, params).subscribe(res => {
    if(res!== null && res!== undefined)
    {
      this.onView();
      this.onClear();
      this._RegistrationForm.reset();
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
  this.RowId=rowData.production_id;
  this.productionHouseName=rowData.production_house_name;
  this.firstName=rowData.first_name;
  this.lastName=rowData.last_name;
  this.dob=rowData.dob;
  this.mobileNo=rowData.mobile_number;
  this.mailId=rowData.email_id;
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
  this.mailId ='';
  this.password ='';
  this.country =null;
  this.state =null;
  this.city =null;
  this.addressLine1='';
  this.addressLine2='';
  this.pincode =null;
}
checkIfEmailExists() {
  this.data.forEach(i => {
    const email: string = i.mailid;
    if (email === this.mailId) {
      this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: 'Email-ID is already exist' }];
      setTimeout(() => this.responseMsg = [], 3000);
      this.mailId = '';
    } else {
    }
  })
}
onCheck() {
  this.data.forEach(i => {
    if (i.username === this.userName) {
      this.responseMsg = [{ severity: ResponseMessage.WarnSeverity, detail: ' Username already exists, Please enter valid Username' }];
      this.userName = null;
    }
  })
}
//checking existing mailid
emailValidationCheck() {
  if (this.mailId !== undefined && this.mailId !== null && this.mailId.trim() !== '' 
      ) {
    const entered_email: string = this.mailId.trim();
    const substr = entered_email.split('@');
    if (substr !== undefined && substr.length > 1) {
      const last_str = substr[1].split('.');
      if (last_str !== undefined && last_str.length > 1) {
        if (last_str[1].toLowerCase() === 'com' || last_str[1].toLowerCase() === 'in') {
        } else {
          this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: 'Enter valid email address' }];
          setTimeout(() => this.responseMsg = [], 3000);      
        }
      } else {
        this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: 'Enter valid email address' }];
        setTimeout(() => this.responseMsg = [], 3000);      
      }
    }else {
      this.mailId = null;
      this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: 'Enter valid email address' }];
      setTimeout(() => this.responseMsg = [], 3000);      
    }
  }
}


validateFields() {
  if (this.pincode !== null && this.pincode !== undefined) {
     if (this.pincode > this.pincode_max) {
    this._RegistrationForm.controls['_pincode'].setErrors({ 'incorrect': true });
     } } 
     else {
    this._RegistrationForm.controls['_pincode'].setErrors({ 'incorrect': true });
}
}
}