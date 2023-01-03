import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'primeng/api';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-role-master',
  templateUrl: './role-master.component.html',
  styleUrls: ['./role-master.component.scss']
})
export class RoleMasterComponent implements OnInit {

  roleName: any;
  selectedType: any;
  rolemasterCols:any;
  rolemasterData:any[] = [];
  responseMsg: Message[] = [];
  RowId:any;
  loading:boolean = false;
  @ViewChild('f', {static: false}) _respondentForm!: NgForm;
  constructor(private restapiservice: RestapiService) { }

  ngOnInit(): void {
    this.onView();
    this.rolemasterCols = TableConstants.RoleMasterColumns;
  }
  onSave(){
    const params={
      'roleid':this.RowId,
      'rolename':this.roleName,
      'flag':(this.selectedType == 1) ? true : false
    };
   this.restapiservice.post(Pathconstants.rolemaster_Post, params).subscribe(res => {
    if(res!== null && res!== undefined)
    {
      this.onView();
      this.onClear();
      this._respondentForm.reset();
      this.responseMsg = [{ severity: ResponseMessage.SuccessSeverity, detail: ResponseMessage.SuccessMessage }];
      setTimeout(() => this.responseMsg = [], 3000);
    }
    else{
      this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: ResponseMessage.ErrorMessage }];
    setTimeout(() => this.responseMsg = [], 3000)
    }
    })
  }
onView(){
  this.restapiservice.get(Pathconstants.rolemaster_Get).subscribe(res => {this.rolemasterData = res
    if (res) {
      res.forEach((i: any) => {
        i.flag = (i.flag == true) ? 'Active' : 'InActive'
      })
    }
  })
}
onClear(){
  this.roleName = null;
  this.selectedType = null;
  this.RowId = 0;
}
onEdit(rowData:any){
this.RowId=rowData.roleid;
this.roleName=rowData.rolename;
this.selectedType = (rowData.flag === 'Active') ? 1 : 0;
}
onCheck() {
  this.rolemasterData.forEach( i => {
    if(i.rolename  === this.roleName ) {
      this.responseMsg = [{ severity: ResponseMessage.WarnSeverity, detail: 'Role name is already exist, Please input different name' }];
        this.roleName = null;
        setTimeout(() => this.responseMsg = [], 3000);
    }
  })
}
}

