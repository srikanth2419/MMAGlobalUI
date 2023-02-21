import { Component, OnInit, ViewChild } from '@angular/core';
import { Message, SelectItem } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { MasterService } from 'src/app/services/master.service';

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
  mainCategory: any = [];
  maincategoryOptions: any;
  subCategory: any = [];
  subcategoryOptions: any;
  countryOptions: any;
  country: any;
  stateOptions: any;
  state: any;
  cityOptions: any;
  city: any;
  addressLine1: any;
  addressLine2: any;
  pincode: any;
  unionOptions: any;
  roleOptions: any;
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
  Id: any = 0;
  phoneNumber: any;
  whatappNumber: any;
  unionMaster: any = [];
  role: any;
  contactlistData: any;
  selected: any = 0;
  responseMsg: Message[] = [];
  isDisabled: boolean = true;
  productionId: any;
  unionno: any;
  masters?: any;
  countryMaster: any = [];
  statemaster: any = [];
  cityMaster: any = [];
  roleMaster: any = [];
  block: RegExp = /^[^=<>*%(){}$@#_!+0-9&?,;'"?/]/;

  @ViewChild('f', { static: false }) _respondentForm!: NgForm;
  constructor(private restapiService: RestapiService, private _masterService: MasterService) { }

  ngOnInit(): void {
    this.onView();
    this.unionno = 0
    this.countryMaster = this._masterService.getMaster('CM');
    this.statemaster = this._masterService.getMaster('SM');
    this.cityMaster = this._masterService.getMaster('CIM');
    this.mainCategory = this._masterService.getMaster('MC')
    this.subCategory = this._masterService.getMaster('SC')
    this.roleMaster = this._masterService.getMaster('RM')
    this.unionMaster = this._masterService.getMaster('UM')
    this.cols = TableConstants.ContactslistColumns;
  }

  //dropdown
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
        console.log('d', this.countryMaster)
        this.countryMaster.forEach((c: any) => {
          countryselection.push({ label: c.name, value: c.code });
        })
        this.countryOptions = countryselection;
        this.countryOptions.unshift({ label: '-select', value: null });
        break;

      case 'C':
        console.log('e', this.statemaster)
        this.statemaster.forEach((c: any) => {
          stateSelection.push({ label: c.name, value: c.code });
        })
        this.stateOptions = stateSelection;
        this.stateOptions.unshift({ label: '-select', value: null });
        break;

      case 'D':
        this.cityMaster.forEach((c: any) => {
          citySelection.push({ label: c.name, value: c.code });
        })
        this.cityOptions = citySelection;
        this.cityOptions.unshift({ label: '-select', value: null });
        break;


      case 'E':
        console.log(this.mainCategory)
        this.mainCategory.forEach((c: any) => {
          maincategoryselection.push({ label: c.name, value: c.code });
        })
        this.maincategoryOptions = maincategoryselection;
        this.maincategoryOptions.unshift({ label: '-select', value: null });
        break;


      case 'F':
        this.subCategory.forEach((c: any) => {
          subcategoryselection.push({ label: c.name, value: c.code });
        })
        this.subcategoryOptions = subcategoryselection;
        this.subcategoryOptions.unshift({ label: '-select', value: null });
        break;

      case 'G':
        this.roleMaster.forEach((c: any) => {
          roleselection.push({ label: c.name, value: c.code });
        })
        this.roleOptions = roleselection;
        this.roleOptions.unshift({ label: '-select', value: null });
        break;

      case 'H':
        this.unionMaster.forEach((c: any) => {
          unionselection.push({ label: c.name, value: c.code });
        })
        this.unionOptions = unionselection;
        this.unionOptions.unshift({ label: '-select', value: null });
        break;
    }
  }
  
  //save method
  onSave() {
    if (this.unionMaster !== 0) {
      this.unionno = this.unionMaster
    }
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
      'isunion': (this.selected == true) ? this.selected : false,
      'unionid': this.unionno != undefined ? this.unionno : null,
      'flag': (this.selectedType == 1) ? true : false
    }
    this.restapiService.post(Pathconstants.ContactListController_Post, params).subscribe(res => {
      if (res !== null && res !== undefined) {
        this.onView();
        this.onClear();
        this._respondentForm.reset();
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
    this.restapiService.get(Pathconstants.ContactListController_Get).subscribe(res => {
      this.contactlistData = res;
      if (res) {
        res.forEach((i: any) => {
          i.flagstatus = (i.flag == true) ? 'Active' : 'InActive'
        })
      }
    })
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
    this.selected = null;
    this.isDisabled = true;
  }

  onEdit(rowData: any) {
    this.Id = rowData.slno;
    this.firstName = rowData.first_name;  
    this.lastName = rowData.last_name;
    this.roleOptions = [{ label: rowData.rolename, value: rowData.roleid }];
    this.maincategoryOptions = [{ label: rowData.maincategoryname, value: rowData.maincategory_id }];
    this.subcategoryOptions = [{ label: rowData.subcategoryname, value: rowData.subcategory_id }];
    this.dob = new Date(rowData.dob);
    this.phoneNumber = rowData.phonenumber;
    this.whatappNumber = rowData.whatsappnumber;
    this.emailId = rowData.email_id;
    this.countryOptions = [{ label: rowData.countryname, value: rowData.countrycode }];
    this.stateOptions = [{ label: rowData.statename, value: rowData.statecode }];
    this.city = rowData.citycode;
    this.cityOptions = [{ label: rowData.cityname, value: rowData.citycode }];
    this.addressLine1 = rowData.address1;
    this.addressLine2 = rowData.address2;
    this.pincode = rowData.pincode;
    this.selected = rowData.isunion;
    this.unionMaster = rowData.unionid;
    this.unionOptions = [{ label: rowData.unionname, value: rowData.unionid }];
    this.selectedType = (rowData.flagstatus === 'Active') ? 1 : 0;
    this.isDisabled = false;
  }

  onCheck() {
    this.data.forEach(i => {
      if (i.first_name === this.firstName) {
        this.responseMsg = [{ severity: ResponseMessage.WarnSeverity, detail: 'name is already exist, Please input different name' }];
        this.firstName = null;
      }
    })
  }
}
