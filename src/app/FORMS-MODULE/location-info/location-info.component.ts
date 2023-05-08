import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Message } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { MasterService } from 'src/app/services/master.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interface/user.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.scss']
})
export class LocationInfoComponent implements OnInit {
 slno:any;
  firstName: any;
  locationName: any;
  locationManager: any;
  locationEP: any;
  country: any;
  locationmanagerOptions: SelectItem[] = [];
  locationEPOptions: SelectItem[] = [];
  countryOptions:any;
  stateOptions: any;
  mobileNo: any;
  emailId: any;
  state: any;
  cityOptions:any;
  city: any;
  addressLine1:any;
  addressLine2: any;
  pincode: any;
  flag: any;
  parkingFacility:any;
  parkingNote:any;
  cols: any[] = [];
  data: any[] = [];
  responseMsg: Message[] = [];
  countrymasterData: any;
  statemasterData:any;
  citymasterData:any;
  contactlistData:any;
  countryMaster: any = [];
  statemaster: any = [];
  cityMaster: any = [];
  logged_user!: User
  productionhouse:any;
  prod_id: any;
  userInfo: any;
  blockadd :RegExp = /^[^-=<>*%()^{}$#!+&?\s~`|;'"?/]/;
  block: RegExp = /^[^-=<>*%()^{}$@#_!+0-9&?,\s~`|.:;'"?/]/;
  @ViewChild('f', { static: false }) _locationinfoForm!: NgForm;
  pincode_max: any;

  constructor(private restApiService: RestapiService, private _masterService: MasterService,private authservice: AuthService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.onView();
    // this.restApiService.get(Pathconstants.countrymaster_Get).subscribe(res => { this.countrymasterData = res })
    // this.restApiService.get(Pathconstants.StateMasterDB_GET).subscribe(res => { this.statemasterData = res })
    // this.restApiService.get(Pathconstants.CityMasterDB_GET).subscribe(res => { this.citymasterData = res})
    this.countryMaster = this._masterService.getMaster('CM');
    this.statemaster = this._masterService.getMaster('SM');
    this.cityMaster = this._masterService.getMaster('CIM');
    this.restApiService.get(Pathconstants.ContactListController_Get).subscribe(res => {this.contactlistData = res;})
    this.cols = TableConstants.locationInfoColumns;
    this.logged_user = this.authservice.getUserInfo();
    this.productionhouse = this.logged_user.production_house_name;
    this.prod_id = this.logged_user.production_id;
    this.onView();
    this.pincode_max = 643253;

  }
  
 onSubmit()
 {
  const params = {
    'slno': this.slno,
     'location_name':this.locationName,
     'location_managerid':this.locationManager,
     'local_epid':this.locationEP,
     //'location_managerid':this.locationManager,
     //'local_epid':this.locationEP,
     'country_id':this.country,
     'state_id':this.state,
     'city_id':this.city,
     'address1':this.addressLine1,
     'address2':this.addressLine2,
     'phonenumber':this.mobileNo,
     'pincode':this.pincode,
     'parking_note':this.parkingNote,
     'parking_facility':(this.parkingFacility == 1) ? true : false,
     'production_id':this.prod_id,
     'flag':(this.flag == 1) ? true : false
  }
  this.restApiService.post(Pathconstants.LocationInfo_Post, params).subscribe(res => {
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
  this._locationinfoForm.reset();
  }
 onView() {
  // this.restApiService.get(Pathconstants.LocationInfo_Get).subscribe(res => {
  //   this.data = res;
  //   if (res) {
  //     res.forEach((i: any) => {
  //       i.flag = (i.flag == true) ? 'Active' : 'InActive',
  //       i.parking_facility =(i.parking_facility == true) ? 'Yes' : 'No'
  //     })
  //   }
  // })
  const params = {
    "production_id" : this.prod_id
  };
  this.restApiService.getByParameters(Pathconstants.locationInfo_GET, params).subscribe(response => {
    this.data = response
    if (response) {
      response.forEach((i: any) => {
        i.flag = (i.flag == true) ? 'Active' : 'InActive'
      })
    }
  })
}
 onSelect(type: any) {
  let countrySelection: any = [];
  let stateSelection: any =[];
  let citySelection:any=[];
  let locationmanagerSelection:any=[];
  let locationEPSelection:any=[];
  switch (type) {
    case 'C':
      this.countryMaster.forEach((c: any) => {
        countrySelection.push({ label: c.name, value: c.code });
      })
      this.countryOptions = countrySelection;
      this.countryOptions.unshift({ label: '-select', value: null });
      break;
      case 'S':
        this.statemaster.forEach((c: any) => {
          if (c.countrycode === this.country){
          stateSelection.push({ label: c.name, value: c.code });
          }
        })
        this.stateOptions = stateSelection;
        this.stateOptions.unshift({ label: '-select', value: null });
        break;
       case 'CT':
          this.cityMaster.forEach((c: any) => {
            if (c.statecode === this.state) {
            citySelection.push({ label: c.name, value: c.code });
            }
          })
          this.cityOptions = citySelection;
          this.cityOptions.unshift({ label: '-select', value: null });
          break;
       case 'LM':
            this.contactlistData.forEach((c: any) => {
              if(c.roleid === 5) {
              locationmanagerSelection.push({ label: c.first_name, value: c.slno });
            }
            })
            this.locationmanagerOptions = locationmanagerSelection;
            this.locationmanagerOptions.unshift({ label: '-select', value: null });
            break;
       case 'LEP':
              this.contactlistData.forEach((c: any) => {
                if(c.roleid === 6) {
                locationEPSelection.push({ label: c.first_name, value: c.slno});
                }
              })
              this.locationEPOptions = locationEPSelection;
              this.locationEPOptions.unshift({ label: '-select', value: null });
              break;
  }
}
  onClear() {
    this._locationinfoForm.form.reset();
    
    // this.locationName = null;
    // this.locationManager = null;
    // this.locationEP = null;
    // this.country = null;
    // this.locationmanagerOptions = [];
    // this.locationEPOptions = [];
    // this.countryOptions = [];
    // this.stateOptions = [];
    // this.mobileNo = null;
    // this.state = null;
    // this.cityOptions = [];
    // this.city = null;
    // this.addressLine1 = null;
    // this.addressLine2 = null;
    // this.pincode = null;
    // this.parkingNote = null;
    // this.parkingFacility = null;
    // this.flag = null;
  }

  onEdit(row: any)
  {
    this.slno = row.slno,
    this.locationName = row.location_name;
    this.locationManager = row.location_managerid;
    this.locationEP = row.local_epid;
    this.locationmanagerOptions = [{ label: row.first_name, value: row.location_managerid }];
    this.locationEPOptions =[{ label: row.first_name, value: row.local_epid }];
    this.countryOptions = [{ label: row.countryname, value: row.country_id }];
    this.stateOptions =  [{ label: row.statename, value: row.state_id }];
    this.cityOptions = [ { label: row.cityname, value: row.city_id }];
    this.mobileNo = row.phonenumber;
    this.addressLine1 = row.address1;
    this.addressLine2 = row.address2;
    this.pincode = row.pincode;
    this.parkingNote = row.parking_note;
    this.parkingFacility = (row.parking_facility == 'Yes') ? 1 : 0;
    this.flag = (row.flag === 'Active') ? 1 : 0;
  }
  validateFields() {
    if (this.pincode !== null && this.pincode !== undefined) {
       if (this.pincode > this.pincode_max) {
      this._locationinfoForm.controls['_pincode'].setErrors({ 'incorrect': true });
       } } 
       else {
      this._locationinfoForm.controls['_pincode'].setErrors({ 'incorrect': true });
  }
  }
}
