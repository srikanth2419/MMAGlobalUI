import { Component, OnInit, ViewChild } from '@angular/core';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Message } from 'primeng/api';
import { NgForm } from '@angular/forms';
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
  @ViewChild('f', {static: false}) _respondentForm!: NgForm;
  constructor(private restapiservice: RestapiService) { }
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
  this.restapiservice.get(Pathconstants.countrymaster_Get).subscribe(res => {this.countrymasterData = res
    if (res) {
      res.forEach((i: any) => {
        i.flag = (i.flag == true) ? 'Active' : 'InActive'
      })
    }
  })
}
onClear(){
  this.countryName = null;
  this.selectedType = null;
  this.RowId = 0;
}
onEdit(rowData:any){
  this.RowId=rowData.countrycode;
  this.countryName=rowData.countryname;
  this.selectedType = (rowData.flag === true) ? 1 : 0;

}
onCheck() {
  this.countrymasterData.forEach( i => {
    if(i.countryname  === this.countryName ) {
      this.responseMsg = [{ severity: ResponseMessage.WarnSeverity, detail: 'Country name is already exist, Please input different name' }];
        this.countryName = null;
        setTimeout(() => this.responseMsg = [], 3000);
    }
  })
}
}
