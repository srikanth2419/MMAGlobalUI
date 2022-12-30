import { Component, OnInit, ViewChild } from '@angular/core';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Message } from 'primeng/api';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-maincategory-master',
  templateUrl: './maincategory-master.component.html',
  styleUrls: ['./maincategory-master.component.scss']
})
export class MaincategoryMasterComponent implements OnInit {

  categoryName: any;
  selectedType: any;
  cols: any[] = [];
  data: any[] = [];
  sino: any;
  RowId:any;
  responseMsg: Message[] = [];

  @ViewChild('f', {static: false}) _respondentForm!: NgForm;



  constructor(private restApiService: RestapiService) { }

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
      this.data = res;
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


  onClear() {
    this.categoryName = null;
    this.selectedType = null;
    this.sino = 0;
  }
  onCheck() {
    this.data.forEach(i => {
      if (i.categoryname === this.categoryName) {
        this.responseMsg = [{ severity: ResponseMessage.WarnSeverity, detail: 'Category name is already exist, Please input different name' }];
        setTimeout(() => this.responseMsg = [], 2000)
        this.categoryName = null;
      }
    })
  }
}

