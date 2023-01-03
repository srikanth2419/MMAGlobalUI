import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Message } from 'primeng/api';
import { NgForm } from '@angular/forms';


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
  parentIdOptions: SelectItem[] = [];
  icon: any;
  roleId: any;
  roleOptions: SelectItem[] = [];
  selectedType: any;
  priorities: any;
  prioritiesOptions: SelectItem[] = [];
  cols: any;
  data: any[] = [];
  roleIdData: any;
  responseMsg: Message[] = [];

  @ViewChild('f', { static: false }) _menumasterForm!: NgForm;

  constructor(private restApiService: RestapiService) { }

  ngOnInit(): void {
    this.onView();
    this.prioritiesOptions = [
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 },
      { label: '6', value: 6 },
      { label: '7', value: 7 },
      { label: '8', value: 8 },
      { label: '9', value: 9 },
      { label: '10', value: 10 },
      { label: '11', value: 11 },
      { label: '12', value: 12 },
      { label: '13', value: 13 },
      { label: '14', value: 14 },
      { label: '15', value: 15 }
    ]

    this.restApiService.get(Pathconstants.rolemaster_Get).subscribe(res => { this.roleIdData = res })
    this.cols = TableConstants.menuMasterColumns;
  }
  onSubmit() {
    const params = {
      'menuid': this.menuId,
      'id': 1,
      'roleid': this.roleId,
      'parentid': this.parentId,
      'name': this.name,
      'url': (this.url !== null && this.url !== undefined) ? this.url : ' ',
      'icon': (this.icon !== null && this.icon !== undefined) ? this.icon : '',
      'priorities': this.priorities,
      'isactive': (this.selectedType == 1) ? true : false
    }
    this.restApiService.post(Pathconstants.MenuMaster_Post, params).subscribe(res => {
      if (res != null && res != undefined) {
        this.onView();
        this.onClear();
        this._menumasterForm.reset();
        this.responseMsg = [{ severity: ResponseMessage.SuccessSeverity, detail: ResponseMessage.SuccessMessage }];
        setTimeout(() => this.responseMsg = [], 3000);
      }
      else {
        this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: ResponseMessage.ErrorMessage }];
        setTimeout(() => this.responseMsg = [], 3000);
      }
    })
  }

  onView() {
    this.restApiService.get(Pathconstants.MenuMasterController_GET).subscribe(res => {
      this.data = res;
      if (res) {
        res.forEach((i: any) => {
          i.isactive = (i.isactive == true) ? 'Active' : 'InActive'
        })
      }
      console.log('name', this.data);
    })
  }
  onSelect(type: any) {

    let roleSelection: any = [];
    let parentSelection: any = [];
    switch (type) {
      case 'R':
        this.roleIdData.forEach((c: any) => {
          roleSelection.push({ label: c.rolename, value: c.roleid });
        })
        this.roleOptions = roleSelection;
        this.roleOptions.unshift({ label: '-Select', value: null });
        break;
      case 'P':
        this.data.forEach((c: any) => {
          parentSelection.push({ label: c.name, value: c.menuid });
        })
        this.parentIdOptions = parentSelection;
        this.parentIdOptions.unshift({ label: '-Select', value: null });
        break;
    }
  }
  onClear() {
    this.roleId = null;
    this.parentId = null;
    this.name = null;
    this.icon = null;
    this.url = null;
    this.priorities = null;
    this.selectedType = null;
    this.menuId = 0;
  }

  onEdit(row: any) {
    this.menuId = row.menuid;
    this.roleOptions = [{ label: row.rolename, value: row.roleid }];
    this.parentIdOptions = [{ label: row.name, value: row.menuid }];
    this.name = row.name;
    this.url = row.url;
    this.icon = row.icon;
    this.priorities = row.priorities;
    this.selectedType = (row.isactive === 'Active') ? 1 : 0;

  }

  checkMenuName() {
    this.data.forEach(i => {
      if (i.name === this.name) {
        this.responseMsg = [{ severity: ResponseMessage.WarnSeverity, detail: 'Menu Name already exist, Please input different name' }];
        setTimeout(() => this.responseMsg = [], 2000)
        this.name = null;
      }
    })
  }
  checkUrl() {
    this.data.forEach(i => {
      if (i.url === this.url) {
        this.responseMsg = [{ severity: ResponseMessage.WarnSeverity, detail: 'URL already exist, Please input different name' }];
        setTimeout(() => this.responseMsg = [], 2000)
        this.url = null;
      }
    })
  }

}
