import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expenses-category-master',
  templateUrl: './expenses-category-master.component.html',
  styleUrls: ['./expenses-category-master.component.scss']
})
export class ExpensesCategoryMasterComponent implements OnInit {

  expenseName: string = '';
  remarks: any;
  selectedType: any;

  constructor() { }

  ngOnInit(): void {
  }

}
