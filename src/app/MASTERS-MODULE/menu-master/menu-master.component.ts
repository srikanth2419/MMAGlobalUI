import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
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
  parentIdOptions:SelectItem [] = [];
  icon: any;
  roleId: any;
  roleOptions: SelectItem [] = [];
  selectedType: any;
  priorities: any;
  prioritiesOptions:SelectItem [] = [];
  cols:any;
  data: any[] = [];


  constructor(private restApiService: RestapiService) { }

  ngOnInit(): void {
    this.onView();
    this.cols = TableConstants.menuMasterColumns;
  }
  onSubmit()
  {
    this.onClear();
  }
  onView() {
    this.restApiService.get(Pathconstants.MenuMasterController_GET).subscribe(res => {
      this.data = res;
    })
  }
  onClear() {
    this.menuId  = null;
    this.Id=null;
    this.name=null;
    this.url  = null;
    this.parentId=null;
    this.icon=null;
    this.roleId  = null;
    this.selectedType=null;
    this.priorities=null;
  }

}
