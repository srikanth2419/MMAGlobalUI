import { Component, OnInit, ViewChild } from '@angular/core';
import { Message, MessageService, SelectItem } from 'primeng/api';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { HttpErrorResponse } from '@angular/common/http';
import { MasterService } from 'src/app/services/master.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-state-master',
  templateUrl: './state-master.component.html',
  styleUrls: ['./state-master.component.scss']
})
export class StateMasterComponent implements OnInit {

  stateName: any;
  country: any;
  countryOptions: SelectItem[] = [];
  selectedType: any;
  statemasterCols: any;
  statemasterData: any[] = [];
  RowId: any;
  statecode: number=0;
  responseMsg: Message[] = [];
  countrymasterData: any;
  loading: boolean = false;
  block: RegExp = /^[^=<>\*%(){}$@#-_!+0-9&?|,.-:;^'"~`?]/; 
  @ViewChild('f', {static: false}) _stateForm!: NgForm;
 
  constructor(private restapiservice: RestapiService,private messageService: MessageService,private _masterService: MasterService) { }

  ngOnInit(): void {

    //this.restapiservice.get(Pathconstants.countrymaster_Get).subscribe(res => { this.countrymasterData = res })
    this.countrymasterData = this._masterService.getMaster('CM');
    this.onView();
    this.statemasterCols = TableConstants.statemasterCols;
  }

  onSelect(type: any) {
    let countrySelection: any = [];

    switch (type) {
      case 'C':
        this.countrymasterData.forEach((c: any) => {
          countrySelection.push({ label: c.name, value: c.code });
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
        'countrycode': this.country.value,
        'flag': (this.selectedType == 1) ? true : false
      };
      this.restapiservice.post(Pathconstants.StateMaster_Post, params).subscribe(res => { 
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
   
    }
    clearform() {
      this._stateForm.form.reset();
      
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


  onEdit(rowData: any) {
    this.statecode = rowData.statecode;
    this.stateName = rowData.statename;
    this.countryOptions = [{ label: rowData.countryname, value: rowData.countrycode }];
    this.country = { label: rowData.countryname, value: rowData.countrycode };
    this.selectedType = (rowData.flag === 'Active') ? 1 : 0;

  }

  onCheck(){
    this.statemasterData.forEach( i => {
      if(i.statename  === this.stateName ) {
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.WarnSeverity, detail: 'State Name Already Exist, Please input different name'
        });
          setTimeout(() => this.responseMsg = [], 3000);
          this.stateName = null;
  
      }
    })
  }
  }
  
  