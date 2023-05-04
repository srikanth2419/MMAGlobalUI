import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { AuthService } from '../services/auth.service';
// import { User } from '../interface/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  display: boolean = false;
  @ViewChild('op', { static: false }) _op!: OverlayPanel;
  @Output() openMenu = new EventEmitter<boolean>();
  @Input() hide: boolean = false;
  @Input() public toggle: boolean = true; 
  username: string = '';
  isLoggedIn: boolean = false;
  constructor(private authservice: AuthService) {
    this.authservice.isLoggedIn.subscribe(value => {
      if(value) {
        this.isLoggedIn = value;
        // this.username = this.authservice.getUserInfo().roleid;
        this.username =  this.authservice.getUserInfo().production_house_name;
      }
    })
   }

  ngOnInit(): void {
   
  }

  toggleMenu(value: boolean) {
    this.display = !this.display;
    this.openMenu.emit(value);
    console.log('val', value, this.display)
  }
  
}
