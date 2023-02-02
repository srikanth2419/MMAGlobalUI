import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-newprojectcreation-master',
  templateUrl: './newprojectcreation-master.component.html',
  styleUrls: ['./newprojectcreation-master.component.scss'],
})
export class NewprojectcreationMasterComponent implements OnInit {

  projectName: any;
  durationDay: any;
  budget: any;
  projectstartDate: any;
  prodhouseName: any;
  selectedType: any;
  loading: boolean = false;
  newprojectcreationData: any[] = [];
  newprojectcreationCols: any;
  block: RegExp = /^[^=<>*%(){}$@#_!+0-9&?,.-;'"?/]/;
  responseMsg: Message[] = [];
  RowId: any;
  constructor(private restapiservice: RestapiService) { }

  ngOnInit(): void {
    this.restapiservice.get(Pathconstants.projectcreation_Get).subscribe(res => { this.newprojectcreationData = res })
    this.onView();
    this.newprojectcreationCols = TableConstants.newprojectcreationCols;
  }

  onSave() {
    {
      const params = {
        'project_id': this.RowId,
        'project_name': this.projectName,
        'duration_in_days': this.durationDay,
        'budget': this.budget,
        'project_start_date': this.projectstartDate,
        'production_house_name':this.prodhouseName,
        'created_date': new Date(),
        'flag': (this.selectedType == 1) ? true : false
      };
      this.restapiservice.post(Pathconstants.projectcreation_Post, params).subscribe(res => {
        if (res != null && res != undefined) {
          this.onView();
          this.onClear();
          this.responseMsg = [{ severity: ResponseMessage.SuccessSeverity, detail: ResponseMessage.SuccessMessage }];
          setTimeout(() => this.responseMsg = [], 3000);
        }
        else {
          this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: ResponseMessage.ErrorMessage }];
          setTimeout(() => this.responseMsg = [], 3000);
        }
      })
    }
  }

  onClear() {
    this.projectName = null;
    this.durationDay = null;
    this.budget = null;
    this.projectstartDate = null;
    this.selectedType = null;
    this.prodhouseName = null;

  }

  onView() {
    this.restapiservice.get(Pathconstants.projectcreation_Get).subscribe(res => {
      this.newprojectcreationData = res;
      if (res) {
        res.forEach((i: any) => {
          i.flag = (i.flag == true) ? 'Active' : 'InActive'
        })
      }
    })
  }

  onEdit(rowData: any) {
    this.RowId = rowData.project_id;
    this.projectName = rowData.project_name;
    this.durationDay = rowData.duration_in_days;
    this.budget = rowData.budget;
    this.projectstartDate = rowData.project_start_date;
    this.selectedType = (rowData.flag === 'Active') ? 1 : 0;

  }
  onCheck() {
    this.newprojectcreationData.forEach(i => {
      if (i.project_name === this.projectName) {
        this.responseMsg = [{ severity: ResponseMessage.WarnSeverity, detail: 'project name is already exist, Please input different name' }];
        this.projectName = null;
      }
    })
  }
}

