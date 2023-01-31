import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { RestapiService } from 'src/app/services/restapi.service';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Message } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { MasterService } from '../services/master.service';
import { User } from '../interface/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;
  showLogin: boolean = true;
  emailId: string = '';
  otp: any;
  newPassword: any;
  confirmPassword: any;
  userInfo!: User;
  responseMsg: any;

  @ViewChild('uname', { static: false }) _username!: HTMLInputElement;
  constructor(private restApiService: RestapiService, private _authService: AuthService, private _masterService: MasterService,) { }

  ngOnInit(): void {
    this._authService.logout();
  }
  onLogin() {
    const login_params = new HttpParams().append('username', this.username).set('password', this.password);
    console.log(this.username)
    this.restApiService.getByParameters(Pathconstants.UserLogin_Get, login_params).subscribe(response => {
      if (response.item1) {
        if (response.item3.length !== 0) {
          this.userInfo = response.item3;
          this._authService.setUserInfo(this.userInfo);
          this._authService.login();
        }
      } else {
        this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: response.item2 }];
        setTimeout(() => this.responseMsg = [], 3000);
      }
    })
  }

  onEnter($event: any) {
    if ($event.key === 'Enter') {
      if (this.username !== null && this.username !== undefined && this.password !== null
        && this.password !== undefined) {
        this.onLogin();
      }
    }
  }
}
