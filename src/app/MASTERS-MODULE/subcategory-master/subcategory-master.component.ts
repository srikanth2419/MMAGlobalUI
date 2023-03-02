import { Component, OnInit, ViewChild } from '@angular/core';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Message } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { MasterService } from 'src/app/services/master.service';


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
  RowId: any;
  responseMsg: Message[] = [];
  mainCategoryData: any;
  maincategoryOptions: any;
  mainCategorycode: any;

  block: RegExp = /^[^=<>*%(){}$@#_!+0-9&?,.;'"?/]/;

  @ViewChild('f', { static: false }) _respondentForm!: NgForm;

  constructor(private restApiService: RestapiService, private _masterService: MasterService) {
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
    const params = {
      'sino': this.RowId,
      'categoryname': this.categoryName,
      'maincategorycode': this.mainCategorycode,
      'flag': (this.selectedType == 1) ? true : false
    }

    this.restApiService.post(Pathconstants.SubCategoryMasterController_Post, params).subscribe(res => {
      if (res != null && res != undefined) {
        this.onView();
        this.onClear();
        this._respondentForm.reset();
        this.responseMsg = [{ severity: ResponseMessage.SuccessSeverity, detail: ResponseMessage.SuccessMessage }];
        setTimeout(() => this.responseMsg = [], 3000);
      }
      else {
        this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: ResponseMessage.ErrorMessage }];
        setTimeout(() => this.responseMsg = [], 3000);
      }
    })

  }


  onEdit(rowData: any) {
    this.RowId = rowData.sino;
    this.categoryName = rowData.categoryname;
    this.maincategoryOptions = [{ label: rowData.categoryname, Value: rowData.sino }];
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
    this.mainCategorycode = null;
    this.sino = 0;
  }
  onCheck() {
    this.subCategoryData.forEach(i => {
      if (i.categoryname === this.categoryName) {
        this.responseMsg = [{ severity: ResponseMessage.WarnSeverity, detail: 'Category name is already exist, Please input different name' }];
        setTimeout(() => this.responseMsg = [], 2000)
        this.categoryName = null;
      }
    })
  }


}
