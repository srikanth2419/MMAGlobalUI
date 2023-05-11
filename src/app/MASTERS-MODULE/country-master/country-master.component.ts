import { Component, OnInit, ViewChild } from '@angular/core';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Message, MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-country-master',
  templateUrl: './country-master.component.html',
  styleUrls: ['./country-master.component.scss']
})
export class CountryMasterComponent implements OnInit {

  countryName: any;
  selectedType: any;
  countrymasterCols:any;
  countrymasterData:any[]=[];
  loading:boolean = false;
  RowId:any;
  data:any;
  responseMsg: Message[] = [];
  block:RegExp = /^[^=<>\*%(){}$@#-_!+0-9&?,|.-:;^'"~`?]/;
  @ViewChild('f', {static: false}) _countryForm!: NgForm;
  constructor(private restapiservice: RestapiService,private messageService: MessageService) { }
  ngOnInit(): void {
    this.onView();
    this.countrymasterCols = TableConstants.CountryMasterColumns;
  }
onSave(){
  const params={
    'countrycode':this.RowId,
    'countryname':this.countryName,
    'flag':(this.selectedType == 1) ? true : false
  };
 this.restapiservice.post(Pathconstants.countrymaster_Post, params).subscribe(res => { 
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
this._countryForm.reset();
}
onView(){
  this.restapiservice.get(Pathconstants.countrymaster_Get).subscribe(res => {this.countrymasterData = res
    if (res) {
      res.forEach((i: any) => {
        i.flag = (i.flag == true) ? 'Active' : 'InActive'
      })
    }
  })
}

onEdit(rowData:any){
  this.RowId=rowData.countrycode;
  this.countryName=rowData.countryname;
  this.selectedType = (rowData.flag === 'Active') ? 1 : 0;
}
onCheck() {
  this.countrymasterData.forEach( i => {
    if(i.countryname  === this.countryName ) {
      this.messageService.add({
        key: 't-msg', severity: ResponseMessage.WarnSeverity, detail: 'Country Name Already Exist, Please input different name'
      });
        setTimeout(() => this.responseMsg = [], 3000);
        this.countryName = null;

    }
  })
}
}

