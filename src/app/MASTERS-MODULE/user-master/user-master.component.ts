import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Message } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

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
  block: RegExp = /^[^-=<>*%()^{}$#!+0-9&?,\s~`|:;'"?/]/;
  

  @ViewChild('f', { static: false }) _userForm!: NgForm;

  constructor(private restApiService: RestapiService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.onView();
    this.restApiService.get(Pathconstants.rolemaster_Get).subscribe(res => { this.roleIdData = res })
    this.cols = TableConstants.UserMaster;
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
    this._userForm.reset();
    this.rolenameOptions=[];
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

  onEdit(rowData: any) {
    this.Id = rowData.id;
    this.usernameEmailid = rowData.username_emailid;
    this.rolenameOptions = [{ label: rowData.rolename, value: rowData.roleid }];
    this.roleName=rowData.roleid;
    this.Password=rowData.password;
    this.selectedType = (rowData.flag === 'Active') ? 1 : 0;
  }

  checkMenu() {
    this.data.forEach(i => {
      if (i.username_emailid === this.usernameEmailid) {
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.WarnSeverity, detail: 'Role Name Already Exist, Please input different name'
        });
          setTimeout(() => this.responseMsg = [], 3000);
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
