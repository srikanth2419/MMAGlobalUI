import { Component, OnInit, ViewChild } from '@angular/core';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Message } from 'primeng/api';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-union-master',
  templateUrl: './union-master.component.html',
  styleUrls: ['./union-master.component.scss']
})
export class UnionMasterComponent implements OnInit {

  unionName: any;
  regNumber: any;
  selectedType: any;
  cols: any;
  RowId: any;
  sno: any;
  data: any[] = [];
  loading: boolean = false;
  responseMsg: Message[] = [];
  blockRegno: RegExp = /^[^=<>*%(){}$@#_!+&?,.:;^'"~`?/]/; 
  blockUnionname: RegExp = /^[^=<>*%(){}$@#-_!+0-9&?,.-:;^'"~`?/]/; 

  @ViewChild('f', { static: false }) _unionmasterForm!: NgForm;

  constructor(private restApiService: RestapiService) { }

  ngOnInit(): void {
    this.onView();
    this.cols = TableConstants.unionMasterColumns;

  }

  onSubmit() {
    const params = {
      'sino': this.sno,
      'unionname': this.unionName,
      'registernumber': this.regNumber,
      'flag': (this.selectedType == 1) ? true : false
    }
    this.restApiService.post(Pathconstants.UnionMaster_Post, params).subscribe(res => {
      if (res != null && res != undefined) {
        this.onView();
        this.onClear();
        this._unionmasterForm.reset();
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
    this.restApiService.get(Pathconstants.UnionMasterController_GET).subscribe(res => {
      this.data = res;
      if (res) {
        res.forEach((i: any) => {
          i.flag = (i.flag == true) ? 'Active' : 'InActive'
        })
      }
    })
  }
  onEdit(rowData: any) {
    this.sno = rowData.sino;
    this.unionName = rowData.unionname;
    this.regNumber = rowData.registernumber;
    this.selectedType = (rowData.flag === 'Active') ? 1 : 0;
  }
  onClear() {
    this.unionName = null;
    this.regNumber = null;
    this.selectedType = null;
  }
  checkUnionName() {
    this.data.forEach(i => {
      if (i.unionname === this.unionName) {
        this.responseMsg = [{ severity: ResponseMessage.WarnSeverity, detail: 'Union name is already exist, Please input different name' }];
        setTimeout(() => this.responseMsg = [], 2000)
        this.unionName = null;
      }
    })
  }
  checkRegno() {
    this.data.forEach(i => {
      if (i.registernumber === this.regNumber) {
        this.responseMsg = [{ severity: ResponseMessage.WarnSeverity, detail: 'Register Number already exist, Please input different name' }];
        setTimeout(() => this.responseMsg = [], 2000)
        this.regNumber = null;
      }
    })
  }

}
