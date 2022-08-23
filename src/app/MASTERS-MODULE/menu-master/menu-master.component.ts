import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-menu-master',
  templateUrl: './menu-master.component.html',
  styleUrls: ['./menu-master.component.scss']
})
export class MenuMasterComponent implements OnInit {

  menuId: any;
  Id: any;
  name: any;
  url: any;
  parentId: any;
  icon: any;
  roleId: any;
  roleOptions: SelectItem [] = [];
  selectedType: any;
  priorities: any;


  constructor() { }

  ngOnInit(): void {
  }

}
