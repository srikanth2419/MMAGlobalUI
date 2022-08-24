import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

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
  constructor() { }

  ngOnInit(): void {
  }

}
