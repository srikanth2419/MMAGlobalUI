import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MediaManage';
  showMenu: boolean = true;
  hideContent: boolean = false;
  
  constructor(private _router: Router) {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login' ||event.url === '/') {
          this.hideContent = true;
          this.showMenu = false;
        } else {
          this.hideContent = false;
          this.showMenu = true;
        }
      }
    });
  }
  // ngAfterViewChecked(): void {
  //   let details = navigator.userAgent;
  //   let regexp = /android|iphone|kindle|ipad/i;
  //     let isMobileDevice = regexp.test(details);
  //     console.log('dv', isMobileDevice)
  // }

  toggleMenu(value: boolean) {
    this.showMenu = value;
    console.log('appcp', this.showMenu, value)
  }
}
