import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maincategory-master',
  templateUrl: './maincategory-master.component.html',
  styleUrls: ['./maincategory-master.component.scss']
})
export class MaincategoryMasterComponent implements OnInit {

  categoryName: any;
  selectedType: any;

  constructor() { }

  ngOnInit(): void {
  }

}
