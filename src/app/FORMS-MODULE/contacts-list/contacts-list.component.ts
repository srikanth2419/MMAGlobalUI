import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})

export class ContactsListComponent implements OnInit {
  firstName: any;
  lastName: any;
  dob: any;
  mobileNo: any;
  emailId: any;
  mainCategory: any;
  maincategoryOptions:any;
  subCategory: any;
  subcategoryOptions: any;
  countryOptions: any;
  country: any;
  stateOptions: any;
  state: any;
  cityOptions:any;
  city: any;
  addressLine1: any;
  addressLine2: any;
  pincode: any;
  unionOptions:any;
  roleOptions:any;
  unionSelection: any;
  selectedType: any;
  cols: any[] = [];
  data: any[] = [];
  statemasterData: any;
  citymasterData: any;
  countrymasterData: any;
  mainCategoryData: any;
  subCategoryData: any;
  rolemasterData: any;
  Id:any;
  phoneNumber: any;
  whatappNumber: any;
  unionMaster: any;
  role: any;
  contactlistData: any;
  selected:any;      
  constructor(private restapiService: RestapiService) { }

  ngOnInit(): void {
    this.onView();
    this.restapiService.get(Pathconstants.StateMasterDB_GET).subscribe(res => { this.statemasterData = res })
    this.restapiService.get(Pathconstants.CityMasterDB_GET).subscribe(res => { this.citymasterData = res })
    this.restapiService.get(Pathconstants.countrymaster_Get).subscribe(res => { this.countrymasterData = res })
    this.restapiService.get(Pathconstants.MainCategoryMasterController_Get).subscribe(res => { this.mainCategoryData = res })
    this.restapiService.get(Pathconstants.SubCategoryMasterController_Get).subscribe(res => { this.subCategoryData = res })
    this.restapiService.get(Pathconstants.UnionMasterController_GET).subscribe(res => { this.data = res})
    this.restapiService.get(Pathconstants.rolemaster_Get).subscribe(res => {this.rolemasterData = res})
    this.cols = TableConstants.ContactslistColumns;
  }

  onSelect(type: any) {
    let stateSelection: any = [];
    let citySelection: any = [];
    let countryselection: any = [];
    let maincategoryselection: any = [];
    let subcategoryselection: any = [];
    let roleselection: any = [];
    let unionselection: any = [];
    switch (type) {
      case 'B':
        this.countrymasterData.forEach((c: any) => {
          countryselection.push({ label: c.countryname, value: c.countrycode });
        })
        this.countryOptions = countryselection;
        this.countryOptions.unshift({ label: '-select', value: null });
        break;
      case 'C':
        this.statemasterData.forEach((c: any) => {
          stateSelection.push({ label: c.statename, value: c.statecode });
        })
        this.stateOptions = stateSelection;
        this.stateOptions.unshift({ label: '-select', value: null });
        break;
      case 'D':
        this.citymasterData.forEach((c: any) => {
          citySelection.push({ label: c.cityname, value: c.citycode });
        })
        this.cityOptions = citySelection;
        this.cityOptions.unshift({ label: '-select', value: null });
        break;
      case 'E':
        console.log(this.mainCategory)
        this.mainCategoryData.forEach((c: any) => {
          maincategoryselection.push({ label: c.categoryname, value: c.sino });
        })
        this.maincategoryOptions = maincategoryselection;
        this.maincategoryOptions.unshift({ label: '-select', value: null });
        break;
      case 'F':
        this.subCategoryData.forEach((c: any) => {
          subcategoryselection.push({ label: c.categoryname, value: c.sino });
        })
        this.subcategoryOptions = subcategoryselection;
        this.subcategoryOptions.unshift({ label: '-select', value: null });
        break;
      case 'G':
        this.rolemasterData.forEach((c: any) => {
          roleselection.push({ label: c.rolename, value: c.roleid });
        })
        this.roleOptions = roleselection;
        this.roleOptions.unshift({ label: '-select', value: null });
        break;
        case 'H':
          this.data.forEach((c: any) => {
            unionselection.push({ label: c.unionname, value: c.sino });
          })
          this.unionOptions = unionselection;
          this.unionOptions.unshift({ label: '-select', value: null });
         break;
    }
  }
  onSave() {  
    const params = {
      'slno': this.Id,
      'first_name': this.firstName,
      'last_name': this.lastName,
      'roleid': this.role,
      'maincategory_id': this.mainCategory,
      'subcategory_id': this.subCategory,
      'dob': this.dob,
      'phonenumber': this.phoneNumber,
      'whatsappnumber': this.whatappNumber,
      'email_id': this.emailId,
      'countrycode': this.country,
      'statecode': this.state,
      'citycode': this.city,
      'address1': this.addressLine1,
      'address2': this.addressLine2,
      'pincode': this.pincode,
      'isunion':this.selected.value,  
      'unionid': this.unionMaster,
      'flag': (this.selectedType == 1) ? true : false
    }
    this.restapiService.post(Pathconstants.ContactListController_Post, params).subscribe(res => { })
  }

  onView() {
    this.restapiService.get(Pathconstants.ContactListController_Get).subscribe(res => {
      this.contactlistData = res;
      if (res) {
        res.forEach((i: any) => {
          i.flagstatus = (i.flag == true) ? 'Active' : 'InActive'
        })
      }
    })
  }

  onEdit(rowData: any) {
    this.Id = rowData.slno;
    this.firstName=rowData.first_name;
    this.lastName=rowData.last_name;
    this.roleOptions=[{ label: rowData.rolename, value: rowData.roleid }];
    this.mainCategory = rowData.sino;
    this.maincategoryOptions=[{label: rowData.categoryname, value: rowData.sino}];
    this.subcategoryOptions=[{label: rowData.categoryname, value: rowData.sino}];
    this.dob=rowData.dob;
    this.phoneNumber=rowData.phonenumber;
    this.whatappNumber=rowData.whatsappnumber;
    this.emailId=rowData.email_id;
    this.countryOptions=[{label: rowData.countryname, value: rowData.countrycode}];
    this.stateOptions=[{ label: rowData.statename, value: rowData.statecode}];
    this.state = rowData.statecode;
    this.cityOptions=[{label: rowData.cityname, value: rowData.citycode}];
    this.city=rowData.citycode;
    this.addressLine1=rowData.address1;
    this.addressLine2=rowData.address2;
    this.pincode=rowData.pincode;
    this.unionOptions=[{label: rowData.unionname, value: rowData.sino}];
    this.selectedType = (rowData.flag === 'Active') ? 1 : 0;
  }

  onClear() {
    this.Id = 0;
    this.firstName = null;
    this.lastName = null;
    this.roleOptions = null;
    this.maincategoryOptions = null;
    this.subcategoryOptions = null;
    this.dob = null;
    this.phoneNumber = null;
    this.whatappNumber = null;
    this.emailId = null;
    this.countryOptions = null;
    this.stateOptions = null;
    this.cityOptions = null;
    this.addressLine1 = null;
    this.addressLine2 = null;
    this.pincode = null;
    this.unionOptions = null;
    this.selectedType = null;
  }
}
