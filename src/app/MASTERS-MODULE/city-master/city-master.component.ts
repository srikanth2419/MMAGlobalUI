import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message, MessageService, SelectItem } from 'primeng/api';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-city-master',
  templateUrl: './city-master.component.html',
  styleUrls: ['./city-master.component.scss']
})
export class CityMasterComponent implements OnInit {

  cityName: any;
  state: any;
  stateOptions: any;
  selectedType: any;
  citymasterCols: any;
  citymasterData: any[] = [];
  spinner: boolean = false;
  statemasterData: any;
  citycode: number = 0;
  loading: boolean = false;
  statecode: any;
  responseMsg: Message[] = [];
  block: RegExp = /^[^=<>\*%(){}$@#-_!+0-9&?,|.-:;^'"~`?]/;

  @ViewChild('f', { static: false }) _citymasterForm!: NgForm;
  constructor(private restapiservice: RestapiService,private messageService: MessageService,) { }

  ngOnInit(): void {
    this.restapiservice.get(Pathconstants.StateMasterDB_GET).subscribe(res => { this.statemasterData = res })
    this.citycode = 0;
    this.onView();
    this.citymasterCols = TableConstants.citymasterCols;
  }

  onSelect(type: any) {
    let stateSelection: any = [];

    switch (type) {
      case 'C':
        this.statemasterData.forEach((c: any) => {
          stateSelection.push({ label: c.statename, value: c.statecode });
        })
        this.stateOptions = stateSelection;
        this.stateOptions.unshift({ label: '-select', value: null });
        break;
    }
  }
  //
  onSubmit() {
    const params = {
      'citycode': this.citycode,
      'cityname': this.cityName,
      'statecode': this.state.value,
      'isactive': (this.selectedType == 1) ? true : false
    };
    this.restapiservice.post(Pathconstants.CityMaster_Post, params).subscribe(res => {
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
    this._citymasterForm.reset();
  }
  onView() {
    this.restapiservice.get(Pathconstants.CityMasterDB_GET).subscribe(res => {
      this.citymasterData = res;
      if (res) {
        res.forEach((i: any) => {
          i.flag = (i.flag == true) ? 'Active' : 'InActive'
        })
      }
    })
  }
  onEdit(rowData: any) {
    this.citycode = rowData.citycode;
    this.cityName = rowData.cityname;
    this.state = [{ label: rowData.statename, value: rowData.statecode }];
    this.stateOptions = [{ label: rowData.statename, value: rowData.statecode }];
    this.selectedType = (rowData.flag === true) ? 1 : 0;

  }
  onClear() {
    this.cityName = null;
    this.selectedType = null;
    this.stateOptions = null;
    this.citycode = 0;

  }
  onCheck() {
    this.citymasterData.forEach(i => {
      if (i.cityname === this.cityName) {
        this.responseMsg = [{ severity: ResponseMessage.WarnSeverity, detail: 'cityname name is already exist, Please input different name' }];
        this.cityName = null;
      }
    })
  }
}
