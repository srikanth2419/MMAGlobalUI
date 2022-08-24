import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-city-master',
  templateUrl: './city-master.component.html',
  styleUrls: ['./city-master.component.scss']
})
export class CityMasterComponent implements OnInit {

  cityName: any;
  state: any;
  stateOptions: SelectItem [] = [];
  selectedType: any;

  constructor() { }

  ngOnInit(): void {
  }

}
