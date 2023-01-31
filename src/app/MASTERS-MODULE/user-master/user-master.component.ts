import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Message } from 'primeng/api';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.scss']
})
export class UserMasterComponent implements OnInit {

  selectedType: any;
  cols: any[] = [];
  data: any[] = [];
  usernameEmailid: any;
  rolenameOptions: any;
  roleId: any;
  Id: any;
  roleName: any;
  roleIdData: any;
  Password:any;
  responseMsg: Message[] = [];
  SpecialCharErrMsg: boolean = false;
  pswdStrongMsg: boolean = false;
  NumericErrMsg: boolean = false;
  UpperCaseErrMsg: boolean = false;
  LengthErrMsg: boolean = false;
  showMatchMsg: boolean = false;
  

  @ViewChild('f', { static: false }) _respondentForm!: NgForm;

  constructor(private restApiService: RestapiService) { }

  ngOnInit(): void {

    this.restApiService.get(Pathconstants.rolemaster_Get).subscribe(res => { this.roleIdData = res })
    this.cols = TableConstants.UserMaster;
    this.onView();
  }

  onSubmit() {
    const params = {
      'id': this.Id,
      'username_emailid': this.usernameEmailid,
      'roleid': this.roleName,
      'password':this.Password,
      'flag': (this.selectedType == 1) ? true : false
    }
    this.restApiService.post(Pathconstants.UserMaster_Post, params).subscribe(res => {
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
        this.onView();
        this.onClear();
      }
    })
  }

  onView() {
    this.restApiService.get(Pathconstants.UserMasterController_Get).subscribe(res => {
      this.data = res;
      if (res) {
        res.forEach((i: any) => {
          i.flag = (i.flag == true) ? 'Active' : 'InActive'
        })
      }
    })
  }

  onSelect(type: any) {
    let roleSelection: any = [];
    switch (type) {
      case 'R':
        this.roleIdData.forEach((c: any) => {
          roleSelection.push({ label: c.rolename, value: c.roleid });
        })
        this.rolenameOptions = roleSelection;
        this.rolenameOptions.unshift({ label: '-Select', value: null });
        break;
    }
  }

  onClear() {
    this.usernameEmailid = null;
    this.selectedType = null;
    this.rolenameOptions = null;
    this.Password=null;
    this.Id = 0;

  }

  onEdit(rowData: any) {
    this.Id = rowData.id;
    this.usernameEmailid = rowData.username_emailid;
    this.rolenameOptions = [{ label: rowData.rolename, value: rowData.roleid }];
    this.Password=rowData.password;
    this.selectedType = (rowData.flag === 'Active') ? 1 : 0;

  }

  checkMenu() {
    this.data.forEach(i => {
      if (i.username_emailid === this.usernameEmailid) {
        this.responseMsg = [{ severity: ResponseMessage.WarnSeverity, detail: 'username is already exist, Please input different name' }];
        setTimeout(() => this.responseMsg = [], 2000)
        this.usernameEmailid = null;
      }
    })
  }

  check(Password: any) {

    if (Password.match(/[@$!%*?&]/g)) {
    this.SpecialCharErrMsg = false;
    } else {
    this.SpecialCharErrMsg = true;
    this.pswdStrongMsg = false;
   }    
  if (Password.match(/[0-9]/g)) {   
    this.NumericErrMsg = false;
   } else {    
   this.NumericErrMsg = true;    
   this.pswdStrongMsg = false;    
   }    
   if (Password.match(/[A-Z]/g)) {    
   this.UpperCaseErrMsg = false;    
   } else {    
   this.UpperCaseErrMsg = true;    
   this.pswdStrongMsg = false;    
   }    
   if (Password.length >= 8) {    
   this.LengthErrMsg = false;    
   } else {    
   this.LengthErrMsg = true;    
   this.pswdStrongMsg = false;
   }
   if (Password.match(/[@$!%*?&]/g) && Password.match(/[0-9]/g) && Password.match(/[A-Z]/g) && Password.length > 8)
   this.pswdStrongMsg = true;
  }

}
