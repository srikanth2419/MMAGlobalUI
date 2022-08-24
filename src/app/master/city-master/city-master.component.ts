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
  citymasterCols: any;
  citymasterData: any [] = [];
  spinner: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.citymasterCols = [
      { field: 'cityname', header: 'City Name', align: 'left !important' },
      { field: 'State', header: 'State', align: 'left !important' },     
      { field: 'Status', header: 'Status', align: 'left !important'},      
    ]
  }

  onSubmit() {
    this.citymasterData.push({
      'cityname': this.cityName,
      'state': this.state,
      'status': (this.selectedType * 1)      
    })

  }

}
