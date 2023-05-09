import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { User } from '../interface/user.interface';
import { AuthService } from '../services/auth.service';
import { RestapiService } from '../services/restapi.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];
  titles: any[] = [];
  // @Input() hide: boolean = false;
  @Input() status: boolean = false;
  @Output() public sidenavToggle = new EventEmitter();
  data: any[] = [];
  logged_user!: User;
  roleId: any;


  constructor(private authservice: AuthService) {
    this.authservice.isLoggedIn.subscribe(value => {
      if (value !== undefined || value !== null) {
        var menuList = this.authservice.fetchMenu;
        // if(this.items === undefined || this.items === null) {
        this.checkChildItems(menuList);
        this.items = menuList;
        // }
      }
      // else {
      //   this.items = []
      // }
    });

  }

  ngOnInit(): void {}


  checkChildItems(data: any) {
    if (data.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      if (data[i]) {
        if (data[i].items.length !== 0) {
          if (data[i].routerLink !== undefined && data[i].routerLink !== null) {
            data[i].command = () => this.onToggleSidenav();
          }
          //  continue;
          this.checkChildItems(data[i].items);
        } else {
          //delete data[i].items;
         this.items = [];   
        }
      }
    }
  }
  }   

  public onToggleSidenav = () => {
    this.status = this.status; //closing menu once its been clicked
    this.sidenavToggle.emit(this.status); //emitting event that menu is closed to app component
  }
}
