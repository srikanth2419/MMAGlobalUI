import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';

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
  constructor() { }

  ngOnInit(): void {
    this.fundCols = TableConstants.FundColumns;
  }

}
