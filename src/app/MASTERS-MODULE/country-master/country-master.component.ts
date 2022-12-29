import { Component, OnInit } from '@angular/core';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Message } from 'primeng/api';
@Component({
  selector: 'app-country-master',
  templateUrl: './country-master.component.html',
  styleUrls: ['./country-master.component.scss']
})
export class CountryMasterComponent implements OnInit {

  countryName: any;
  selectedType: any;
  spinner: boolean = false;
  countrymasterCols:any;
  countrymasterData:any;
  RowId:any;
  data:any;
  responseMsg: Message[] = [];
  constructor(private restapiservice: RestapiService) { }

  ngOnInit(): void {
    this.countrymasterCols = TableConstants.CountryMasterColumns;
  }
onSave(){
  const params={
    'countrycode':this.RowId,
    'countryname':this.countryName,
    'flag':(this.selectedType == 1) ? true : false
  };
 this.restapiservice.post(Pathconstants.countrymaster_Post, params).subscribe(res => { 
  if(res!= null && res!= undefined){
    this.onView();
    this.onclear();
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
  this.restapiservice.get(Pathconstants.countrymaster_Get).subscribe(res => {this.countrymasterData = res})
}
onclear(){
  this.countryName = null;
  this.selectedType = null;
  this.RowId = 0;
}
}
