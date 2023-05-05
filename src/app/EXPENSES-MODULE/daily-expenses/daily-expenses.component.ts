import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { MasterService } from 'src/app/services/master.service';
import { RestapiService } from 'src/app/services/restapi.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-daily-expenses',
  templateUrl: './daily-expenses.component.html',
  styleUrls: ['./daily-expenses.component.scss']
})
export class DailyExpensesComponent implements OnInit {

  date: any;
  projectName: any;
  projectOptions:any;
  budgetAmount: any;
  invoiceNumber: any;
  expensesCategory: any;
  expensesOptions: any;
  amount: any;
  dailyexpensesCols: any;
  dailyexpensesData: any[] = [];
  expensescategorymasterData :any[] = [];
  spinner: boolean = false;
  grandTotal: number = 0;
  Total: any;
  RowId:any;
  responseMsg: Message[] = [];
  loading: boolean = false;
  newprojectcreationData: any[] = [];
  newfundbudgetAmount:any;
  dailyexpenses: any[] = [];
  userInfo: any;
  logged_user!: User
  productionhouse:any;
  prod_id: any;
  block: RegExp = /^[^=<>*%(){}$@#_!+0-9-&?,.;'"?/]/;
  @ViewChild('f', {static: false}) _respondentForm!: NgForm;

  constructor(private restapiservice: RestapiService,private _masterService: MasterService,private authservice: AuthService) { }

  ngOnInit(): void {
    this.dailyexpenses=this._masterService.getMaster('EC')
    //this.restapiservice.get(Pathconstants.expensescategorymaster_Get).subscribe(res => {
      this.expensescategorymasterData = this.dailyexpenses
   // })
    this.restapiservice.get(Pathconstants.projectcreation_Get).subscribe(res => {
      this.newprojectcreationData = res
    })
    this.dailyexpensesCols = TableConstants.DailyexpensesColumns;
    this.logged_user = this.authservice.getUserInfo();
    this.productionhouse = this.logged_user.production_house_name;
    this.prod_id = this.logged_user.production_id;
    this.onView();

     
  }
  onSelect(type: any) {
    let dailyexpensesSelection: any = [];
    let projectnameSelection:any =[];
    switch (type) {
      case 'P':
        this.newprojectcreationData.forEach((c: any) => {
          projectnameSelection.push({ label: c.project_name, value: c.project_id });
        })
        this.projectOptions = projectnameSelection;
        this.projectOptions.unshift({ label:'-select', value: null });
        break;
      case 'D':
        this.expensescategorymasterData.forEach((c: any) => {
          dailyexpensesSelection.push({ label: c.name, value: c.code });
          console.log('d',c);
        })
        this.expensesOptions = dailyexpensesSelection;
        this.expensesOptions.unshift({ label:'-select', value: null });
        break;
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

onSave(){
  const params = {
  'slno': this.RowId,
  'project_name': this.projectName,
  'budget_amount':this.budgetAmount,
  'date':this.date,
  'invoice_number':this.invoiceNumber,
  'expenses_category':this.expensesCategory,
  'amount':this.amount,
  'production_id':this.prod_id,
  'created_date': new Date(),
};
this.restapiservice.post(Pathconstants.dailyexpenses_Post, params).subscribe(res => {
  if (res != null && res != undefined) {
    this.onView();
    this.onClear();
    this._respondentForm.reset();
    this.responseMsg = [{ severity: ResponseMessage.SuccessSeverity, detail: ResponseMessage.SuccessMessage }];
    setTimeout(() => this.responseMsg = [], 3000);
  }
  else {
    this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: ResponseMessage.ErrorMessage }];
    setTimeout(() => this.responseMsg = [], 3000);
  }
})

}
onView(){
  // })
  const params = {
    "production_id" : this.prod_id
  };
  this.restapiservice.getByParameters(Pathconstants.dailyexpensesId_Get, params).subscribe(response => {
    this.dailyexpensesData = response
    if (response) {
      response.forEach((i: any) => {
        i.flag = (i.flag == true) ? 'Active' : 'InActive'
      })
    }
  })
}
onEdit(rowData:any){
  this.RowId=rowData.slno;
  this.projectName=rowData.project_name;
  this.projectOptions=[{ label: rowData.projectname, value: rowData.project_name }];
  this.budgetAmount=rowData.budget_amount;
  this.date=new Date(rowData.date);
  this.invoiceNumber=rowData.invoice_number;
  this.expensesCategory=rowData.expenses_category;
  this.expensesOptions=[{ label: rowData.name, value: rowData.expenses_category }];
  this.amount=rowData.amount;

}
onClear(){
    this.RowId=0;
    this.projectOptions = null;
    this.budgetAmount = null;
    this.date = null;
    this.invoiceNumber = null;
    this.expensesOptions = null;
    this.amount = null;
}
  checkBudgetAmount() {
    if (this.budgetAmount !== null && this.budgetAmount !== undefined && this.amount !== undefined && this.amount !== null) {
      if (this.amount > this.budgetAmount) {
        var msg = 'Entering amount should not be greater than available budget amount !';
        // this.messageService.clear();
        // this.messageService.add({
        //   key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
        //   summary: ResponseMessage.SUMMARY_ERROR, detail: msg
        // });
        console.log('u', msg)
      }
    }
  }


  checkIfTotalExists(data: any[]) {
    var result = [];
    if (data.length >= 1) {
      var last_index = data.length - 1;
      if (data[last_index].BudgetAmount === 'Total Amount') {
        data.splice(last_index, 1);
        result = data;
      }
    }
    return result;
  }

  calculateGrandTotal() {
    let grand_total = 0;
    if (this.dailyexpensesData.length !== 0) {
      this.dailyexpensesData.forEach(p => {
        grand_total += (p.amount * 1);
      })
      var item = {
        BudgetAmount: 'Total Amount', amount: (grand_total * 1).toFixed(2)
      };
      const index = this.dailyexpensesData.length;
      this.dailyexpensesData.splice(index, 0, item);
      this.grandTotal = grand_total;
    } else {
      this.grandTotal = 0;
    }
  }
}
