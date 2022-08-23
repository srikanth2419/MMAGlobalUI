import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subcategory-master',
  templateUrl: './subcategory-master.component.html',
  styleUrls: ['./subcategory-master.component.scss']
})
export class SubcategoryMasterComponent implements OnInit {

  categoryName: any;
  selectedType: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
