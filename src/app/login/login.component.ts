import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
onLogin()
{
  this.router.navigate(['/home']);
}
}
