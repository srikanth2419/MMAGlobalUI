import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'primeng/api';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';

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
  @ViewChild('f', {static: false}) _respondentForm!: NgForm;
  constructor(private restapiservice: RestapiService) { }

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
  if(res!== null && res!== undefined){
    this.onView();
    this.onClear();
    this._respondentForm.reset();
    this.responseMsg = [{ severity: ResponseMessage.SuccessSeverity, detail: ResponseMessage.SuccessMessage }];
    setTimeout(() => this.responseMsg = [], 3000);
  }
  else{
    this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: ResponseMessage.ErrorMessage }];
    setTimeout(() => this.responseMsg = [], 3000);
  }
})
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
this.selectedType = (rowData.flag === true) ? 1 : 0;
}
onClear(){
  this.name=null;
  this.notes=null;
  this.selectedType = null;
  this.RowId = 0;
}
onCheck() {
  this.expensescategorymasterData.forEach( i => {
    if(i.name  === this.name ) {
      this.responseMsg = [{ severity: ResponseMessage.WarnSeverity, detail: 'Expensescategory name is already exist, Please input different name' }];
        this.name = null;
        setTimeout(() => this.responseMsg = [], 3000);
    }
  })
}
}
