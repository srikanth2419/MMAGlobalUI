import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role-master',
  templateUrl: './role-master.component.html',
  styleUrls: ['./role-master.component.scss']
})
export class RoleMasterComponent implements OnInit {

  roleName: any;
  selectedType: any;

  constructor() { }

  ngOnInit(): void {
  }

}
