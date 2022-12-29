import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';

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
  statemasterData:any;

  constructor(private restapiservice: RestapiService) { }

  ngOnInit(): void {
    this.restapiservice.get(Pathconstants.StateMasterDB_GET).subscribe(res => {this.statemasterData = res})
    this.onview();
    this.citymasterCols = TableConstants.citymasterCols; 
  }

  onSelect(type: any) {
    let stateSelection: any = [];
    
    switch (type) {
      case 'C':
        this.statemasterData.forEach((c: any) => {
          stateSelection.push({ label: c.statename, value: c.statecode });
        })
        this.stateOptions = stateSelection;
        this.stateOptions.unshift({ label: '-select', value: null });
        break;
      }}

  onSubmit() {
    const params = {
      'citycode': 0,
      'cityname': this.cityName,
      'statecode': this.state,
      'isactive': (this.selectedType == 1) ? true : false
    };
    this.restapiservice.post(Pathconstants.CityMaster_Post, params).subscribe(res => { })
  }
  onview() {
    this.restapiservice.get(Pathconstants.CityMasterDB_GET).subscribe(res => {
      this.citymasterData = res;
    })
  }
}
