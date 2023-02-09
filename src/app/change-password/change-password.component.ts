import { Component, OnInit } from '@angular/core';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Message } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../interface/user.interface';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  oldPwd: any;
  blockSpace: RegExp = /[^\s]/;
  newPwd: any;
  SpecialCharErrMsg: boolean = false;
  pswdStrongMsg: boolean = false;
  NumericErrMsg: boolean = false;
  UpperCaseErrMsg: boolean = false;
  LengthErrMsg: boolean = false;
  showMatchMsg: boolean = false;
  showErrMsg: boolean = false;
  confirmPassword: string = '';
  userdata: any[] = [];
  userId: any[] = [];
  usermasterData: any[] = [];
  showPswd: any;
  userInfo: any;
  responseMsg: Message[] = [];
  logged_user!: User

  constructor(private restApiService: RestapiService, private authservice: AuthService) { }

  ngOnInit(): void {
    this.onView();
    this.logged_user = this.authservice.getUserInfo();
    this.userId = this.logged_user.id;
    // console.log('info', this.userId)
  }

  onView() {
    this.restApiService.get(Pathconstants.UserMasterController_Get).subscribe(res => {
      if (res !== null && res !== undefined) {
        if (res.length !== 0) {
          this.usermasterData = res
        }
      }
    })
  }

  onCheckOldPwd() {
    this.usermasterData.forEach((i: any) => {
      if (i.password == this.oldPwd) {
        this.onSubmit();
      } else {
        this.responseMsg = [{ severity: ResponseMessage.WarnSeverity, summary: ResponseMessage.SUMMARY_INVALID, detail: 'Entered old password is incorrect' }];
        setTimeout(() => this.responseMsg = [], 3000);
      }
    })
  }

  checkPassword() {
    if (this.newPwd !== undefined && this.newPwd !== null && this.newPwd.trim() !== '' &&
      this.confirmPassword !== undefined && this.confirmPassword !== null && this.confirmPassword.trim() !== '') {
      if (this.newPwd.trim() !== this.confirmPassword.trim()) {
        this.showErrMsg = true;
        this.showMatchMsg = false;
      } else {
        this.showErrMsg = false;
        this.showMatchMsg = true;
      }
    } else {
      this.showErrMsg = false;
    }
  }

  check(NewPassword: any) {
    if (NewPassword.match(/[@$!%*?&]/g)) {
      this.SpecialCharErrMsg = false;
    } else {
      this.SpecialCharErrMsg = true;
      this.pswdStrongMsg = false;
    }
    if (NewPassword.match(/[0-9]/g)) {
      this.NumericErrMsg = false;
    } else {
      this.NumericErrMsg = true;
      this.pswdStrongMsg = false;
    }
    if (NewPassword.match(/[A-Z]/g)) {
      this.UpperCaseErrMsg = false;
    } else {
      this.UpperCaseErrMsg = true;
      this.pswdStrongMsg = false;
    }
    if (NewPassword.length >= 8) {
      this.LengthErrMsg = false;
    } else {
      this.LengthErrMsg = true;
      this.pswdStrongMsg = false;
    }
    if (NewPassword.match(/[@$!%*?&]/g) && NewPassword.match(/[0-9]/g) && NewPassword.match(/[A-Z]/g) && NewPassword.length > 8)
      this.pswdStrongMsg = true;
  }

  onSubmit() {
    console.log('save')
    const params = {
      'id': this.userId,
      'password': this.confirmPassword,
    }
    this.restApiService.post(Pathconstants.updateChangePassword_Update, params).subscribe(res => {
      if (res) {
        // this.onClear();
        // this.messageService.clear();
        this.responseMsg = [{ severity: ResponseMessage.SuccessSeverity, detail: ResponseMessage.SuccessMessage }];
        setTimeout(() => this.responseMsg = [], 3000);
      } else {
        // this.messageService.clear();
        this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: ResponseMessage.ErrorMessage }];
        setTimeout(() => this.responseMsg = [], 3000);
      }
    })
  }

  onClear() {
    this.oldPwd = '';
    this.newPwd = '';
    this.confirmPassword = '';
    this.showMatchMsg = false;
    this.pswdStrongMsg = false;
  }
}
