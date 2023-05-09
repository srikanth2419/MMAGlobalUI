import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { RestapiService } from 'src/app/services/restapi.service';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Message, MessageService } from 'primeng/api';
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
  showPswd: boolean = true;

  @ViewChild('uname', { static: false }) _username!: HTMLInputElement;
  constructor(private restApiService: RestapiService, private _authService: AuthService, private _masterService: MasterService,private messageService: MessageService) { }

  ngOnInit(): void {
    this._authService.logout();
  }
  onLogin() {
    const login_params = new HttpParams().append('username', this.username).set('password', this.password);
    this.restApiService.getByParameters(Pathconstants.UserLogin_Get, login_params).subscribe(response => {
      if (response.item1) {
        this._masterService.invokeMasterData();
        if (response.item3.length !== 0) {
          [response.item3].forEach((key: any) => {
            const obj: User = {
              // Id = (key.id !== null && key.id !== undefined) ? key.id : 0;
              roleid: (key.roleid !== null && key.roleid !== undefined) ? key.roleid : 0
              , id: (key.id !== null && key.id !== undefined) ? key.id : 0
              , mailid: (key.username_emailid !== null && key.username_emailid !== undefined) ? key.username_emailid : ''
              , production_house_name: (key.production_house_name !== null && key.production_house_name !== undefined) ? key.production_house_name : ''
              ,production_id:(key.production_id !== null && key.production_id !== undefined) ? key.production_id : 0
            }
            this._authService.login(obj);
          })
          this.userInfo = response.item3;
          this._authService.setUserInfo(this.userInfo);
        }
        const menu_params = new HttpParams().append('roleid', this._authService.getUserInfo().roleid);
        this.restApiService.getByParameters('MenuMasterRoleid/GetMenuRoleid', menu_params).subscribe(res => {
          ///setting menu in authservice as object to load after login
          this._authService.setMenu(res);
          this._authService.setMenuStatus(true);
          this._authService.login(this.userInfo);

        });
      } else {
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.ErrorSeverity, detail: 'response.item2'
        });
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

  onShowPswd() {
    var inputValue = (<HTMLInputElement>document.getElementById('PWD'));
    if (inputValue.type === 'password') {
      inputValue.type = 'text';
      this.showPswd = !this.showPswd;
    } else {
      this.showPswd = !this.showPswd;
      inputValue.type = 'password';
    }
  }
}
