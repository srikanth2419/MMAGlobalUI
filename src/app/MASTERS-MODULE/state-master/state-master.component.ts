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
  statecode: any;
  responseMsg: Message[] = [];
  countrymasterData: any;
  loading: boolean = false;


  constructor(private restapiservice: RestapiService) { }

  ngOnInit(): void {

    this.restapiservice.get(Pathconstants.countrymaster_Get).subscribe(res => { this.countrymasterData = res })
    this.onview();
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
        'citycode': 0,
        'statename': this.stateName,
        'countrycode': this.countryOptions,
        'isactive': (this.selectedType == 1) ? true : false
      };
      this.restapiservice.post(Pathconstants.StateMaster_Post, params).subscribe(res => { })
      this.responseMsg = [{ severity: ResponseMessage.SuccessSeverity, detail: 'SuccessMessage' }];
      this.onClear();
    }

  }
  onview() {
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
  }

  onEdit(rowData: any) {
    this.statecode = rowData.countrycode;
    this.stateName = rowData.statename;
    this.country = rowData.statecode;
    this.countryOptions = [{ label: rowData.statecode, value: rowData.statecode }];
    this.selectedType = (rowData.isactive === true) ? 1 : 0;

  }
}
