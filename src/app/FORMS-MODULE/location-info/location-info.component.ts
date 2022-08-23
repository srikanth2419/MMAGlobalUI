import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.scss']
})
export class LocationInfoComponent implements OnInit {

  firstName: string = '';
  locationName: string = '';
  locationManager: any;
  locationEP: any;
  country: any;
  locationOptions: SelectItem[] = [];
  locationEPOptions: SelectItem[] = [];
  countryOptions: SelectItem[] = [];
  stateOptions: SelectItem[] = [];
  mobileNo: any;
  emailId: string = '';
  state: any;
  cityOptions: SelectItem[] =[];
  city: any;
  addressLine1: string = '';
  addressLine2: string = '';
  pincode: any;
  selectedType: any;

  constructor() { }

  ngOnInit(): void {
  }

}
