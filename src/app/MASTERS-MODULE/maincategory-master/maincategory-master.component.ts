import { Component, OnInit, ViewChild } from '@angular/core';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Message, MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-maincategory-master',
  templateUrl: './maincategory-master.component.html',
  styleUrls: ['./maincategory-master.component.scss']
})
export class MaincategoryMasterComponent implements OnInit {

  categoryName: any;
  selectedType: any;
  cols: any[] = [];
  mainCategoryData: any[] = [];
  sino: any;
  RowId:any;
  responseMsg: Message[] = [];
  block: RegExp = /^[^-=<>*%()^{}$@#_!+0-9&?,\s~`|.:;'"?/]/; 

  @ViewChild('f', {static: false}) _respondentForm!: NgForm;



  constructor(private restApiService: RestapiService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.cols = TableConstants.MainCategoryMaster;
    this.onView();
  }

  onEdit(rowData: any) {
    this.RowId = rowData.sino;
    this.categoryName = rowData.categoryname;
    this.selectedType = (rowData.flag === 'Active') ? 1 : 0;
  }


  onView() {
    this.restApiService.get(Pathconstants.MainCategoryMasterController_Get).subscribe(res => {
      this.mainCategoryData = res;
      if (res) {
        res.forEach((i: any) => {
          i.flag = (i.flag == true) ? 'Active' : 'InActive'
        })
      }
    })
  }


  onSave() {
    const params = {
      'sino': this.RowId,
      'categoryname': this.categoryName,
      'flag': (this.selectedType == 1) ? true : false
    }
    this.restApiService.post(Pathconstants.MainCategoryMasterController_Post, params).subscribe(res => { 
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
    this._respondentForm.reset();
  }
  onClear() {
    this.categoryName = null;
    this.selectedType = null;
    this.sino = 0;
  }
  onCheck() {
    this.messageService.add({
      key: 't-msg', severity: ResponseMessage.WarnSeverity, detail: 'Maincategory Name Already Exist, Please input different name'
    });
      setTimeout(() => this.responseMsg = [], 3000);
        setTimeout(() => this.responseMsg = [], 2000)
        this.categoryName = null;
      }
    }