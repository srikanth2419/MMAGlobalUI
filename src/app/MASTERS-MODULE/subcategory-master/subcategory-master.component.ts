import { Component, OnInit, ViewChild } from '@angular/core';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Message, MessageService, SelectItem } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { MasterService } from 'src/app/services/master.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-subcategory-master',
  templateUrl: './subcategory-master.component.html',
  styleUrls: ['./subcategory-master.component.scss']
})
export class SubcategoryMasterComponent implements OnInit {

  categoryName: any;
  selectedType: any;
  cols: any[] = [];
  subCategoryData: any[] = [];
  sino: any;
  RowId:number=0;
  responseMsg: Message[] = [];
  mainCategoryData: any;
  maincategoryOptions: SelectItem[] = [];
  mainCategorycode: any;

  block: RegExp = /^[^=<>\*%(){}$@#-_!+0-9&?,|.-:;^'"~`?]/;

  @ViewChild('f', { static: false }) _respondentForm!: NgForm;

  constructor(private restApiService: RestapiService, private _masterService: MasterService,private messageService: MessageService) {
  }


  ngOnInit(): void {
    this.mainCategoryData = this._masterService.getMaster('MC')
    this.cols = TableConstants.SubCategoryMaster;
    this.onView();
  }

  onSelect(type: any) {
    let maincategorySelection: any = [];
    switch (type) {
      case 'C':
        this.mainCategoryData.forEach((c: any) => {
          maincategorySelection.push({ label: c.name, value: c.code });
        })
        this.maincategoryOptions = maincategorySelection;
        this.maincategoryOptions.unshift({ label: '-select', value: null });
        break;
    }
  }
  onSave() {
    console.log('1',this.mainCategorycode.value)
    const params = {
      'sino': this.RowId,
      'categoryname': this.categoryName,
      'maincategorycode': this.mainCategorycode,
      'flag': (this.selectedType == 1) ? true : false
    }

    this.restApiService.post(Pathconstants.SubCategoryMasterController_Post, params).subscribe(res => {
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
  onEdit(rowData: any) {
    console.log('n',this.mainCategorycode)
    this.RowId = rowData.sino;
    this.categoryName = rowData.categoryname;
    this.mainCategorycode = rowData.maincategorycode;
    this.maincategoryOptions = [{ label: rowData.maincategoryname, value: rowData.maincategorycode }];
    this.selectedType = (rowData.flag === 'Active') ? 1 : 0;
  }

  onView() {
    this.restApiService.get(Pathconstants.SubCategoryMasterController_Get).subscribe(res => {
      this.subCategoryData = res;
      if (res) {
        res.forEach((i: any) => {
          i.flag = (i.flag == true) ? 'Active' : 'InActive'
        })
      }
    })
  }


  onClear() {
    this.categoryName = null;
    this.selectedType = null;
    this.mainCategorycode = 0;
    this.sino = 0;
    this.maincategoryOptions=[];
  }
  onCheck() {
    this.subCategoryData.forEach(i => {
      if (i.categoryname === this.categoryName) {
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.WarnSeverity, detail: 'Subcategory Name Already Exist, Please input different name'
        });
          setTimeout(() => this.responseMsg = [], 3000);
          this.categoryName = null;
  
      }
    })
  }
  }
  
  
