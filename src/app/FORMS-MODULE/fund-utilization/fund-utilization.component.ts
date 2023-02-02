import { Component, OnInit } from '@angular/core';
import { DashStyleValue } from 'highcharts';
import { Message, SelectItem } from 'primeng/api';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-fund-utilization',
  templateUrl: './fund-utilization.component.html',
  styleUrls: ['./fund-utilization.component.scss']
})
export class FundUtilizationComponent implements OnInit {
  projectNameOptions: SelectItem[] = [];
  projectName: any;
  budgetAmount: any;
  personNameOptions: SelectItem[] = [];
  personName: any;
  paymentByOptions: SelectItem[] = [];
  paymentBy: any;
  amount: any;
  dayCall: any;
  totalAmount: any;
  fundDetails: any[] = [];
  fundCols: any;
  RowId: any = 0;
  responseMsg: Message[] = [];
  FundUtilizationData: any[] = [];
  loading: boolean = false;
  block: RegExp = /^[^=<>*%(){}$@#_!+0-9&?,.-;'"?/]/;
  item: any;
  newprojectcreationData: any[] = [];
  contactlistData: any[] = [];
  data: any;
  newfundbudgetAmount: any;

  constructor(private restapiservice: RestapiService) {
  }

  ngOnInit(): void {
    this.paymentByOptions = [
      { label: 'select', value: 1 },
      { label: 'PER DAY', value: 2 },
      { label: 'PER CALL', value: 3 },
      { label: 'PER PROJECT', value: 4 },

    ];
  this.fundCols = TableConstants.FundColumns;
  this.restapiservice.get(Pathconstants.projectcreation_Get).subscribe(res => {   this.newprojectcreationData = res})
  this.restapiservice.get(Pathconstants.ContactListController_Get).subscribe(res => { this.contactlistData = res })
  }

  onSave() {
    {
      const params = {
        'slno': this.RowId,
        'project_name': this.projectName,
        'budget_amount': this.budgetAmount,
        'person_name': this.personName,
        'payment_by': this.paymentBy.label,
        'amount': this.amount,
        'day_or_call': this.dayCall,
        'total_amount': this.totalAmount,
        'created_date': new Date(),

      };
      this.restapiservice.post(Pathconstants.fundutilization_Post, params).subscribe(res => {
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

  check() {
    this.newprojectcreationData.forEach(i => {
      if (i.slno === this.projectName) {
        this.newfundbudgetAmount = i.budget
      }
    });
    this.budgetAmount = this.newfundbudgetAmount
  }

  onSelect(type: any) {
    let projectSelection: any = [];
    let personNameSelection: any = [];
    switch (type) {
      case 'p':
        this.newprojectcreationData.forEach((c: any) => {
          projectSelection.push({ label: c.project_name, value: c.slno });
            })
        this.projectNameOptions = projectSelection;
        this.projectNameOptions.unshift({ label: '-select', value: null });
        break;
    }
    switch (type) {
      case 'C':
        this.contactlistData.forEach((c: any) => {
          personNameSelection.push({ label: c.first_name, value: c.slno });
        })
        this.personNameOptions = personNameSelection;
        this.personNameOptions.unshift({ label: '-select', value: null });
        break;
    }
  }

  onClear() {
    this.personName = null;
    this.projectName = null;
    this.budgetAmount = 0;
    this.paymentBy = null;
    this.amount = null;
    this.dayCall = null;
    this.totalAmount = null;
  }

  onView() {
    this.restapiservice.get(Pathconstants.fundutilization_Get).subscribe(res => {
      this.FundUtilizationData = res;
      if (res) {
        res.forEach((i: any) => {

        })
      }
    })
  }

  onEdit(rowData: any) {
    this.RowId = rowData.slno;
    this.projectName = rowData.project_name;
    this.budgetAmount = rowData.budget_amount;
    this.personName = rowData.person_name;
    this.paymentBy = rowData.payment_by;
    this.amount = rowData.day_or_call;
    this.dayCall = rowData.project_start_date;
    this.totalAmount = rowData.total_amount;
  }

  // onCheck() {
  //   this.newprojectcreationData.forEach(i => {
  //     if (i.project_name === this.projectName) {
  //       this.responseMsg = [{ severity: ResponseMessage.WarnSeverity, detail: 'project name is already exist, Please input different name' }];
  //       this.projectName = null;
  //     }
  //   })

  //}
}
