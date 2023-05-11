import { Component, OnInit, ViewChild } from '@angular/core';
import { Message, MessageService, SelectItem } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { MasterService } from 'src/app/services/master.service';
import { User } from 'src/app/interface/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  mailId: any;
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

  block: RegExp = /^[^=<>\*%(){}$@#-_!+0-9&?,|.-:;^'"~`?]/ ;
  block1: RegExp = /^[^=<>\*%(){}$@#-_!+&?,|.-:;^'"~`?]/ ;
  blockmail: RegExp = /^[^-=<>*%()^{}$#!+0-9&?,\s~`|:;'"?/]/;

  userName:any;
  logged_user!: User;
  prod_id: any;

  @ViewChild('f', { static: false }) _contactlistForm!: NgForm;
  pincode_max: any;
  constructor(private restapiService: RestapiService, private _masterService: MasterService, private authservice: AuthService,private messageService: MessageService) { }

  ngOnInit(): void {
 
    this.unionno = 0
    this.countryMaster = this._masterService.getMaster('CM');
    this.statemaster = this._masterService.getMaster('SM');
    this.cityMaster = this._masterService.getMaster('CIM');
    this.mainCategoryData = this._masterService.getMaster('MC')
    this.subCategoryData = this._masterService.getMaster('SC')
    this.roleMaster = this._masterService.getMaster('RM')
    this.unionMaster = this._masterService.getMaster('UM')
    this.cols = TableConstants.ContactslistColumns;
    this.logged_user = this.authservice.getUserInfo();
  this.prod_id = this.logged_user.production_id;
  this.onView();
  console.log('contact prod id',this.prod_id)
  this.pincode_max = 643253;
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
        this.countryMaster.forEach((c: any) => {
          countryselection.push({ label: c.name, value: c.code });
        })
        this.countryOptions = countryselection;
        this.countryOptions.unshift({ label: '-select', value: null });
        break;

      case 'C':
        this.statemaster.forEach((sm: any) => {
          if (sm.countrycode === this.country) {  // to filter statemaster based on countrymaster
            stateSelection.push({ label: sm.name, value: sm.code });
          }
        })
        this.stateOptions = stateSelection;
        this.stateOptions.unshift({ label: '-select', value: null });
        break;

      case 'D':
        this.cityMaster.forEach((cm: any) => {
          if (cm.statecode === this.state) {
            citySelection.push({ label: cm.name, value: cm.code });
          }
        })
        this.cityOptions = citySelection;
        this.cityOptions.unshift({ label: '-select', value: null });
        break;

      case 'E':
        this.mainCategoryData.forEach((mc: any) => {
          maincategoryselection.push({ label: mc.name, value: mc.code });

        })
        this.maincategoryOptions = maincategoryselection;
        this.maincategoryOptions.unshift({ label: '-select', value: null });
        break;

      case 'F':
        this.subCategoryData.forEach((c: any) => {
          if (c.maincategorycode === this.mainCategory) {   //to filter subcategory based on maincategory
            subcategoryselection.push({ label: c.name, value: c.code });
          }
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
    const conctantsparams = {
      'slno': this.Id,
      'first_name': this.firstName,
      'last_name': this.lastName,
      'roleid': this.role,
      'maincategory_id': this.mainCategory,
      'subcategory_id': this.subCategory,
      'dob': this.dob,
      'phonenumber': this.phoneNumber,
      'whatsappnumber': this.whatappNumber,
      'email_id': this.mailId,
      'countrycode': this.country,
      'statecode': this.state,
      'citycode': this.city,
      'address1': this.addressLine1,
      'address2': this.addressLine2,
      'pincode': this.pincode,
      'isunion': (this.selected == true) ? this.selected : false,
      'unionid': this.unionno != undefined ? this.unionno : null,
      'flag': (this.selectedType == 1) ? true : false,
      'production_id':this.prod_id
    }
    this.restapiService.post(Pathconstants.ContactListController_Post, conctantsparams).subscribe(res => {
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
    this._contactlistForm.reset();
    this.maincategoryOptions=[];
    this.subcategoryOptions = [];
    this.countryOptions=[];``
    this.stateOptions = [];
    this.cityOptions=[];
    this.unionOptions=[];

    }
  
  onView() {
    // this.restapiService.get(Pathconstants.ContactListController_Get).subscribe(res => {
    //   this.contactlistData = res;
    //   if (res) {
    //     res.forEach((i: any) => {
    //       i.flagstatus = (i.flag == true) ? 'Active' : 'InActive'
    //     })
    //   }
    // })
    const params = {
      "production_id" : this.prod_id
    };
    this.restapiService.getByParameters(Pathconstants.contactlistprodid_GET, params).subscribe(response => {
      this.contactlistData = response
      if (response) {
        response.forEach((i: any) => {
          i.flag = (i.flag == true) ? 'Active' : 'InActive'
        })
      }
    })
  }
  // onClear() {
  //   this.Id = 0;
  //   this.firstName = null;
  //   this.lastName = null;
  //   this.roleOptions = null;
  //   this.maincategoryOptions = null;
  //   this.subcategoryOptions = null;
  //   this.dob = null;
  //   this.phoneNumber = null;
  //   this.whatappNumber = null;
  //   this.mailId = null;
  //   this.stateOptions = null;
  //   this.cityOptions = null;
  //   this.addressLine1 = null;
  //   this.addressLine2 = null;
  //   this.pincode = null;
  //   this.unionOptions = null;
  //   this.selectedType = null;
  //   this.selected = null;
  //   this.isDisabled = true;
  // }
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
    this.mailId = rowData.email_id;
    this.country = rowData.countrycode;
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

  
  checkIfEmailExists() {
    this.data.forEach(i => {
      const email: string = i.mailid;
      if (email === this.mailId) {
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.ErrorSeverity, detail: 'Email-ID is already exist'
        });
          setTimeout(() => this.responseMsg = [], 3000);
        this.mailId = '';
      } else {
      }
    })
  }
  oncheck() {
    this.data.forEach(i => {
      if (i.username === this.userName) {
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.WarnSeverity, detail: 'User Name Already Exist, Please input different name'
        });
          setTimeout(() => this.responseMsg = [], 3000);       
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
            this.messageService.add({
              key: 't-msg', severity: ResponseMessage.ErrorSeverity, detail: 'Enter valid email address'
            });
              setTimeout(() => this.responseMsg = [], 3000); 
          }
        } else {
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.ErrorSeverity, detail: 'Enter valid email address'
          });
            setTimeout(() => this.responseMsg = [], 3000); 
        }
      }else {
        this.mailId = null;
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.ErrorSeverity, detail: 'Enter valid email address'
        });
          setTimeout(() => this.responseMsg = [], 3000);    
      }
        }}

        onphoneno() {
          this.contactlistData.forEach((i:any) => {
            if (i.phonenumber === this.phoneNumber) {
              this.messageService.add({
                key: 't-msg', severity: ResponseMessage.WarnSeverity, detail: 'Phone Number Already Exist, Please input different name'
              });
                setTimeout(() => this.responseMsg = [], 3000);
                this.phoneNumber = null;
            }
          })
        }

        onwhatsappno() {
          this.contactlistData.forEach((i:any) => {
            if (i.whatsappnumber === this.whatappNumber) {
              this.messageService.add({
                key: 't-msg', severity: ResponseMessage.WarnSeverity, detail: 'Whats Number Already Exist, Please input different name'
              });
                setTimeout(() => this.responseMsg = [], 3000);
                this.whatappNumber = null;
            }
          })
        }
        onCheck() {
        
          this.contactlistData.forEach((i:any) => {
            if (i.email_id === this.mailId) {
              this.messageService.add({
                key: 't-msg', severity: ResponseMessage.WarnSeverity, detail: 'Email Id Already Exist, Please input different name'
              });
                setTimeout(() => this.responseMsg = [], 3000);
                this.mailId = null;
            }
          })
        }
        validateFields() {
          if (this.pincode !== null && this.pincode !== undefined) {
             if (this.pincode > this.pincode_max) {
            this._contactlistForm.controls['_pincode'].setErrors({ 'incorrect': true });
             } } 
             else {
            this._contactlistForm.controls['_pincode'].setErrors({ 'incorrect': true });
        }
      }}