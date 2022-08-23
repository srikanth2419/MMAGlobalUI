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
  constructor() { }

  ngOnInit(): void {
  }

}
