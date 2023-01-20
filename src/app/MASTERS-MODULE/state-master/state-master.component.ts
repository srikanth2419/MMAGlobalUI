import { Component, OnInit } from '@angular/core';
import { Message, SelectItem } from 'primeng/api';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
@Component({
  selector: 'app-state-master',
  templateUrl: './state-master.component.html',
  styleUrls: ['./state-master.component.scss']
})
export class StateMasterComponent implements OnInit {

  stateName: any;
  country: any;
  countryOptions: any;
  selectedType: any;
  statemasterCols: any;
  statemasterData: any[] = [];
  RowId: any;
  statecode: number=0;
  responseMsg: Message[] = [];
  countrymasterData: any;
  loading: boolean = false;
  block: RegExp = /^[^=<>*%(){}$@#_!+0-9&?,.-;'"?/]/; 
  
  constructor(private restapiservice: RestapiService) { }

  ngOnInit(): void {

    this.restapiservice.get(Pathconstants.countrymaster_Get).subscribe(res => { this.countrymasterData = res })
    this.onView();
    this.statemasterCols = TableConstants.statemasterCols;
  }

  onSelect(type: any) {
    let countrySelection: any = [];

    switch (type) {
      case 'C':
        this.countrymasterData.forEach((c: any) => {
          countrySelection.push({ label: c.countryname, value: c.countrycode });
        })
        this.countryOptions = countrySelection;
        this.countryOptions.unshift({ label: '-select', value: null });
        break;
    }
  }

  onSave() {
    {
      const params = {
        'statecode': this.statecode,
        'statename': this.stateName,
        'countrycode': this.country,
        'flag': (this.selectedType == 1) ? true : false
      };
      this.restapiservice.post(Pathconstants.StateMaster_Post, params).subscribe(res => { 
        if(res!= null && res!= undefined){
          this.onView();
          this.onClear();
          this.responseMsg = [{ severity: ResponseMessage.SuccessSeverity, detail: ResponseMessage.SuccessMessage }];
          setTimeout(() => this.responseMsg = [], 3000);
        }
        else{
          this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: ResponseMessage.ErrorMessage }];
          setTimeout(() => this.responseMsg = [], 3000);
        }
       })
      }
      }
     
    
  onView() {
    this.restapiservice.get(Pathconstants.StateMasterDB_GET).subscribe(res => {
      this.statemasterData = res;
      if (res) {
        res.forEach((i: any) => {
          i.flag = (i.flag == true) ? 'Active' : 'InActive'
        })
      }
    })
  }

  onClear() {
    this.stateName = null;
    this.selectedType = null;
    this.countryOptions = null;
    this.statecode = 0;
    this.selectedType=null;
  }

  onEdit(rowData: any) {
    this.statecode = rowData.statecode;
    this.stateName = rowData.statename;
    this.country = rowData.statecode;
    this.countryOptions = [{ label: rowData.countryname, value: rowData.countrycode }];
    this.selectedType = (rowData.flag === 'Active') ? 1 : 0;

  }

  onCheck(){
    this.statemasterData.forEach( i => {
      if(i.statename  === this.stateName ) {
        this.responseMsg = [{ severity: ResponseMessage.WarnSeverity, detail: 'statename name is already exist, Please input different name' }];
          this.stateName = null;
      }
    })
  }
  }
  