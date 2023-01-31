import { Component, OnInit } from '@angular/core';
import { Message, SelectItem } from 'primeng/api';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-daily-expenses',
  templateUrl: './daily-expenses.component.html',
  styleUrls: ['./daily-expenses.component.scss']
})
export class DailyExpensesComponent implements OnInit {

  date: any;
  projectName: string = '';;
  budgetAmount: any;
  invoiceNumber: any;
  expensesCategory: any;
  expensesOptions: SelectItem[] = [];
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
  constructor(private restapiservice: RestapiService) { }

  ngOnInit(): void {
    this.restapiservice.get(Pathconstants.expensescategorymaster_Get).subscribe(res => {this.expensescategorymasterData = res})
    this.onView();
    this.dailyexpensesCols = TableConstants.DailyexpensesColumns;
     
  }
  onSelect(type: any) {
    let dailyexpensesSelection: any = [];
    switch (type) {
      case 'D':
        this. expensescategorymasterData.forEach((c: any) => {
          dailyexpensesSelection.push({ label: c.name, value: c.sino });
        })
        this.expensesOptions = dailyexpensesSelection;
        this.expensesOptions.unshift({ label:'-select', value: null });
        break;
    }
  }
onSave(){
  const params = {
  'slno': this.RowId,
  'project_name': this. projectName,
  'budget_amount':this.budgetAmount,
  'date':this.date,
  'invoice_number':this.invoiceNumber,
  'expenses_category':this.expensesCategory,
  'amount':this.amount,
  'created_date': new Date(),
};
this.restapiservice.post(Pathconstants.dailyexpenses_Post, params).subscribe(res => {
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
onView(){
  this.restapiservice.get(Pathconstants.dailyexpenses_GET).subscribe(res => {
    this.dailyexpensesData = res;
  })
}
onEdit(rowData:any){
  this.RowId=rowData.slno;
  this.projectName=rowData.project_name;
  this.budgetAmount=rowData.budget_amount;
  this.date=rowData.date;
  this.invoiceNumber=rowData.invoice_number;
  this.expensesCategory=rowData.expenses_category;
  this.amount=rowData.amount;

}
onClear(){
    this.RowId=0;
    this.projectName = '';
    this.budgetAmount = null;
    this.date = null;
    this.invoiceNumber = null;
    this.expensesCategory = null;
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

  // onAdd() {
  //   this.dailyexpensesData = this.checkIfTotalExists(this.dailyexpensesData)
  //   this.dailyexpensesData.push({
  //     'Date': this.date,
  //     'Project': this.projectName,
  //     'BudgetAmount': this.budgetAmount,
  //     'InvoiceNo': this.invoiceNumber,
  //     'expenses': this.expensesCategory,
  //     'amount': this.amount,
  //   })
  //   this.calculateGrandTotal();
  // }

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
