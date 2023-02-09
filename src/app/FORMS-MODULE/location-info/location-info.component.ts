import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Message } from 'primeng/api';
import { NgForm } from '@angular/forms';

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
  

  @ViewChild('f', { static: false }) _locationinfoForm!: NgForm;

  constructor(private restApiService: RestapiService) { }

  ngOnInit(): void {
    this.onView();
    this.restApiService.get(Pathconstants.countrymaster_Get).subscribe(res => { this.countrymasterData = res })
    this.restApiService.get(Pathconstants.StateMasterDB_GET).subscribe(res => { this.statemasterData = res })
    this.restApiService.get(Pathconstants.CityMasterDB_GET).subscribe(res => { this.citymasterData = res})
    this.restApiService.get(Pathconstants.ContactListController_Get).subscribe(res => {this.contactlistData = res;})
    this.cols = TableConstants.locationInfoColumns;
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
     'flag':(this.flag == 1) ? true : false
  }
  this.restApiService.post(Pathconstants.LocationInfo_Post, params).subscribe(res => {
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

 onView() {
  this.restApiService.get(Pathconstants.LocationInfo_Get).subscribe(res => {
    this.data = res;
    if (res) {
      res.forEach((i: any) => {
        i.flag = (i.flag == true) ? 'Active' : 'InActive',
        i.parking_facility =(i.parking_facility == true) ? 'Yes' : 'No'
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
       case 'CT':
          this.citymasterData.forEach((c: any) => {
            citySelection.push({ label: c.cityname, value: c.citycode });
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
}
