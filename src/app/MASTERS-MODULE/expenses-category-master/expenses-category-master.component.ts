import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';

import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-expenses-category-master',
  templateUrl: './expenses-category-master.component.html',
  styleUrls: ['./expenses-category-master.component.scss']
})
export class ExpensesCategoryMasterComponent implements OnInit {

  name:any;
  notes: any;
  selectedType: any;
  expensescategorymasterCols:any;
  expensescategorymasterData:any[]=[];
  RowId:any;
  loading:boolean = false;
  responseMsg: Message[] = [];
  block:RegExp = /^[^=<>\*%(){}$@#-_!+0-9&?,|.-:;^'"~`?]/;
  @ViewChild('f', {static: false}) _expensescategoryForm!: NgForm;
  
  constructor(private restapiservice: RestapiService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.onView();
  this.expensescategorymasterCols=TableConstants.ExpensescategoryMaster;
  }
onSave()
{
const params={
  'sino':this.RowId,
  'name':this.name,
  'notes':this.notes,
  'flag':(this.selectedType == 1) ? true : false
};
this.restapiservice.post(Pathconstants.expensescategorymaster_Post, params).subscribe(res => { 
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
this._expensescategoryForm.reset();
}
onView(){
  this.restapiservice.get(Pathconstants.expensescategorymaster_Get).subscribe(res => {this.expensescategorymasterData = res
    if (res) {
      res.forEach((i: any) => {
        i.flag = (i.flag == true) ? 'Active' : 'InActive'
      })
    }
  })
}
onEdit(rowData:any){
this.RowId=rowData.sino;
this.name=rowData.name;
this.notes=rowData.notes;
this.selectedType = (rowData.flag === 'Active') ? 1 : 0;
}
onCheck() {
  this.expensescategorymasterData.forEach( i => {
    if(i.name  === this.name ) {
      this.messageService.add({
        key: 't-msg', severity: ResponseMessage.WarnSeverity, detail: 'Expenses Name Already Exist, Please input different name'
      });
        setTimeout(() => this.responseMsg = [], 3000);
        this.name = null;

    }
  })
}
}

