import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-state-master',
  templateUrl: './state-master.component.html',
  styleUrls: ['./state-master.component.scss']
})
export class StateMasterComponent implements OnInit {

  stateName: any;
  country: any;
  countryOptions: SelectItem [] = [];
  selectedType: any;

  constructor() { }

  ngOnInit(): void {
  }

}
