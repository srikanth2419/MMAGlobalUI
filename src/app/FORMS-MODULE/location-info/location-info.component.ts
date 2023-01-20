import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.scss']
})
export class LocationInfoComponent implements OnInit {

  firstName: any;
  locationName: any;
  locationManager: any;
  locationEP: any;
  country: any;
  locationOptions: SelectItem[] = [];
  locationEPOptions: SelectItem[] = [];
  countryOptions: SelectItem[] = [];
  stateOptions: SelectItem[] = [];
  mobileNo: any;
  emailId: any;
  state: any;
  cityOptions: SelectItem[] =[];
  city: any;
  addressLine1:any;
  addressLine2: any;
  pincode: any;
  flag: any;
  parkingFacility:any;
  parkingNote:any;
  cols: any[] = [];
  data: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.cols = TableConstants.locationInfoColumns;
  }
 onSubmit()
 {

 }
  onClear() {
    this.firstName = null;
    this.locationName = null;
    this.locationManager = null;
    this.locationEP = null;
    this.country = null;
    this.locationOptions = [];
    this.locationEPOptions = [];
    this.countryOptions = [];
    this.stateOptions = [];
    this.mobileNo = null;
    this.emailId = null;
    this.state = null;
    this.cityOptions = [];
    this.city = null;
    this.addressLine1 = null;
    this.addressLine2 = null;
    this.pincode = null;
    this.parkingNote = null;
    this.parkingFacility = null;
    this.flag = null;
  }

  onEdit(rowData: any)
  {

  }
}
