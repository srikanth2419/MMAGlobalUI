import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: any;
  showLogin: boolean = true;
  emailId: string = '';
  otp: any;
  newPassword: any;
  confirmPassword: any;

  constructor() { }

  ngOnInit(): void {
  }

}
