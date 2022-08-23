import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {

  firstName: string = '';
  lastName: string = '';
  dob: any;
  mobileNo: any;
  emailId: string = '';
  mainCategory: any;
  maincategoryOptions: SelectItem[] = [];
  subCategory: any;
  subcategoryOptions: SelectItem[] = [];
  countryOptions: SelectItem[] = [];
  country: string = '';
  stateOptions: SelectItem[] = [];
  state: string = '';
  cityOptions: SelectItem[] = [];
  city: string = '';
  addressLine1: string = '';
  addressLine2: string = '';
  pincode: any;
  unionOptions: SelectItem[] = [];
  unionSelection: any;
  selectedType: any;

  constructor() { }

  ngOnInit(): void {
  }

}
