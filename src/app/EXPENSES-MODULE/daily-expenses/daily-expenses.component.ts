import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-daily-expenses',
  templateUrl: './daily-expenses.component.html',
  styleUrls: ['./daily-expenses.component.scss']
})
export class DailyExpensesComponent implements OnInit {

  date: any;
  projectName: string = '';
  budgetAmount: any;
  invoiceNumber: any;
  expensesCategory: any;
  expensesOptions: SelectItem[] = [];
  amount: any;
  dailyexpensesCols: any;
  dailyexpensesData: any[] = [];
  spinner: boolean = false;
  grandTotal: number = 0;
  Total: any;

  constructor() { }

  ngOnInit(): void {
    this.dailyexpensesCols = [
      { field: 'BudgetAmount', header: 'Budget Amount', align: 'left !important' },
      { field: 'Date', header: 'Date', align: 'left !important' },
      { field: 'Project', header: 'Project', align: 'right !important' },
      { field: 'InvoiceNo', header: 'Invoice No', align: 'left !important' },
      { field: 'expenses', header: 'Expenses category', align: 'left !important' },
      { field: 'amount', header: 'Amount', align: 'left !important' },
    ]
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

  onAdd() {
    this.dailyexpensesData = this.checkIfTotalExists(this.dailyexpensesData)
    this.dailyexpensesData.push({
      'Date': this.date,
      'Project': this.projectName,
      'BudgetAmount': this.budgetAmount,
      'InvoiceNo': this.invoiceNumber,
      'expenses': this.expensesCategory,
      'amount': this.amount,
    })
    this.calculateGrandTotal();
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
