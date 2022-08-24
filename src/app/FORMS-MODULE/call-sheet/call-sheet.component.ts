import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';

@Component({
  selector: 'app-call-sheet',
  templateUrl: './call-sheet.component.html',
  styleUrls: ['./call-sheet.component.scss']
})
export class CallSheetComponent implements OnInit {
  projectNameOptions: SelectItem[] = [];
  projectName: any;
  roleOptions: SelectItem[] = [];
  role: any;
  date: Date = new Date();
  locationOptions: SelectItem[] = [];
  location: any;
  generalCallTime: any;
  shootingCallTime: any;
  callSheetCols: any;
  callSheetDetails: any[] = [];
  selectedPerson: any[] = [];
  locationName: string = '';
  note: string = '';
  address: string = '';
  driverName: string = '';
  pickupTime: any;
  pickupLocation: string = '';
  dropLocation: string = '';
  passengerNameOptions: SelectItem[] = [];
  passengerName: any;
  constructor() { }

  ngOnInit(): void {
    this.callSheetCols = TableConstants.ShootingScheduleColumns;
  }

}
