import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MediaManage';
 // showMenu: boolean = true;
  hideContent: boolean = false;
  show: boolean = false;
  isLoggedIn: boolean = false;
  
  constructor(private _router: Router,private _authService: AuthService) {
    this._authService.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
      console.log('s',this.isLoggedIn)
    });
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login' || event.url === '/registration' ) {
          this.hideContent = true;
        //  this.showMenu = false;
        } else {
          this.hideContent = false;
         // this.showMenu = true;
        }
      }
    }); 
   }

   ngOnInit() {

   }

  openMenu($event: boolean) {
    this.show = $event; // setting value from header component whether to open/close menu
    this.show = !this.show; // changing  show value to avoid double click of icon to open menu
  }

  onToggle($event: boolean) {
    this.show = $event; //setting show value from menu component
    console.log('p')
  }
  
  // ngAfterViewChecked(): void {
  //   let details = navigator.userAgent;
  //   let regexp = /android|iphone|kindle|ipad/i;
  //     let isMobileDevice = regexp.test(detgails);
  //     console.log('dv', isMobileDevice)
  // }

  toggleMenu(value: boolean) {
   // this.showMenu = value;
   // console.log('appcp', this.showMenu, value)
  }
}
