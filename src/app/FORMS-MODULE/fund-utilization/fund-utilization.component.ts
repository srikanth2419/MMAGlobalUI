import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DashStyleValue } from 'highcharts';
import { Message, SelectItem } from 'primeng/api';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { User } from 'src/app/interface/user.interface';
import { AuthService } from 'src/app/services/auth.service';

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
  userInfo: any;
  logged_user!: User
  productionhouse:any;

  @ViewChild('f', {static: false}) _respondentForm!: NgForm;
  prod_id: any;
  
  constructor(private restapiservice: RestapiService,private authservice: AuthService) {
  }

  ngOnInit(): void {
    this.onView();
    this.paymentByOptions = [
      { label: 'select', value: null },
      { label: 'PER DAY', value: 1 },
      { label: 'PER CALL', value: 2 },
      { label: 'PER PROJECT', value: 3 },

    ];
  this.fundCols = TableConstants.FundColumns;
  this.restapiservice.get(Pathconstants.projectcreation_Get).subscribe(res => { this.newprojectcreationData = res})
  this.restapiservice.get(Pathconstants.ContactListController_Get).subscribe(res => { this.contactlistData = res })
  this.logged_user = this.authservice.getUserInfo();
  this.productionhouse = this.logged_user.production_house_name;
  this.prod_id = this.logged_user.production_id;
  this.onView();
  this.prod_id = this.logged_user.production_id;

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
        'production_id':this.prod_id,
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
      if (i.project_id === this.projectName) {
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
          if(c.production_id === this.prod_id)
          {
          projectSelection.push({ label: c.project_name, value: c.project_id
          });
        }
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
    // this.restapiservice.get(Pathconstants.fundutilization_Get).subscribe(res => {
    //   this.FundUtilizationData = res;
    //   if (res) {
    //     res.forEach((i: any) => {

    //     })
    //   }
    // })

    const params = {
      "production_id" : this.prod_id
    };
    this.restapiservice.getByParameters(Pathconstants.FundUtilizationbyid_Get,params).subscribe(res => {
      this.FundUtilizationData = res;
      // if (Response) {
      //   Response.forEach((i: any) => {
      //   })
      // }
    })
  }

  onEdit(rowData: any) {
    this.RowId = rowData.slno;
    this.projectNameOptions=[{label:rowData.project_name,value:rowData.project_name}];
    this.budgetAmount=rowData.budget_amount;
    this.personNameOptions=[{label:rowData.first_name,value:rowData.person_name}];
    this.paymentBy = rowData.value;
    this.amount = rowData.amount;
    this.dayCall = rowData.day_or_call;
    this.totalAmount = rowData.total_amount;
  }


}

