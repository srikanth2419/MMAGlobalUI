import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Message } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { MasterService } from 'src/app/services/master.service';
import { HttpErrorResponse } from '@angular/common/http';


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
  disableInput: boolean = false;
  blockIcon: RegExp = /^[^=<>*%(){}$@#_!+0-9&?,.:;^'"~`?/]/;
  blockUrl: RegExp = /^[^=<>\*%(){}$@#-_!+0-9&?,|.-:;^'"~`?]/;
  blockMenuName: RegExp = /^[^=<>\*%(){}$@#-_!+0-9&?,|.-:;^'"~`?]/;
  roleMaster: any = [];

  @ViewChild('f', { static: false }) _menumasterForm!: NgForm;

  constructor(private restApiService: RestapiService, private _masterService: MasterService,private messageService: MessageService,) { }

  ngOnInit(): void {
    this.onView();
    this.prioritiesOptions = [
      {label : '-select-', value: 0},
      {label:  '0', value: 0 },
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

    // this.restApiService.get(Pathconstants.rolemaster_Get).subscribe(res => { this.roleIdData = res })
    this.cols = TableConstants.menuMasterColumns;
    this.roleMaster = this._masterService.getMaster('RM')
  }

  //save
  onSubmit() {
    const params = {
      'menuid': this.menuId,
      'roleid': this.roleId,
      'parentid': this.parentId,
      'name': this.name,
      'url': (this.url !== null && this.url !== undefined) && this.url.length > 2 ? '/' + this.url : ' ',
      'icon': (this.icon !== null && this.icon !== undefined) ? this.icon : '',
      'priorities': this.priorities,
      'isactive': (this.selectedType == 1) ? true : false
    }   
    this.restApiService.post(Pathconstants.MenuMaster_Post, params).subscribe(res => {
      if (res) {
        this.clearform();
        this.onView();
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SuccessSeverity,
          summary: ResponseMessage.SuccessSeverity, detail: ResponseMessage.SuccessMessage
        });
      } else {
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
        });
      }
    }, (err: HttpErrorResponse) => {
      if (err.status === 0 || err.status === 400) {
        this.messageService.clear();
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
          summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
        })
      }
    })
  }
  clearform() {
    this._menumasterForm.reset();
    this.roleOptions=[];
    this.parentIdOptions=[];
    this.prioritiesOptions=[];
  }
//
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
    let prioritySelection: any = [];
    switch (type) {
      case 'R':
        this.roleMaster.forEach((c: any) => {
          roleSelection.push({ label: c.name, value: c.code });
        })
        this.roleOptions = roleSelection;
        this.roleOptions.unshift({ label: '-Select', value: null });
        break;
      case 'M':
        this.data.forEach((c: any) => {
          if(c.roleid === this.roleId ) {
          parentSelection.push({ label: c.name, value: c.id });
        }
        })
        this.parentIdOptions = parentSelection;
        this.parentIdOptions.unshift({ label: '-Select', value: 0 });
        break;
     
    }
  }

  onEdit(row: any) {
   
    this.menuId = row.menuid;
    this.roleOptions = [{ label: row.rolename, value: row.roleid }];
    this.parentIdOptions = [{ label: row.parentname, value: row.parentid }];
    this.parentId = row.parentid;
    this.name = row.name;
    this.url = row.url.replace('/', '');
    this.icon = row.icon;
    // this.prioritiesOptions =  [{ label: row.priorities, value: row.priorities }];
    this.selectedType = (row.isactive === 'Active') ? 1 : 0;
    this.priorities = row.priorities;

  }

  checkMenuName() {
    this.data.forEach(i => {
      if (i.name === this.name && i.url === this.url && i.roleid === this.roleId ) {
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.WarnSeverity, detail: 'Menu Name Already Exist, Please input different name'
        });
          setTimeout(() => this.responseMsg = [], 3000);
          this.name = null;

      }
    })
  }
  }
  
  

  