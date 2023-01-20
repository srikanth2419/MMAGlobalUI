import { Component, OnInit } from '@angular/core';
import { Message, SelectItem } from 'primeng/api';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';

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
  scheduleCallTime: any;
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
  lodginginfocols:any;
  lodginginfoData:any[]=[];
  loading: boolean = false;
  RowId:any;
  responseMsg: Message[] = [];
  constructor(private restapiservice: RestapiService) { }

  ngOnInit(): void {
    this.callSheetCols = TableConstants.ShootingScheduleColumns;
    this.lodginginfocols=TableConstants.lodginginfoColumns;
  }
onSave1(){
  const params = {
    'slno': this.RowId,
    'location': this. locationName,
    'address':this.address,
    'note':this. note,
  };
  this.restapiservice.post(Pathconstants.lodginginfo_Post, params).subscribe(res => {
    if (res != null && res != undefined) {
      this.onView1();
      
      this.responseMsg = [{ severity: ResponseMessage.SuccessSeverity, detail: ResponseMessage.SuccessMessage }];
      setTimeout(() => this.responseMsg = [], 3000);
    }
    else {
      this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: ResponseMessage.ErrorMessage }];
      setTimeout(() => this.responseMsg = [], 3000);
    }
  })
}
onView1(){
    this.restapiservice.get(Pathconstants.lodginginfo_GET).subscribe(res => {
      this.lodginginfoData = res;
    })
}
onEdit1(rowData:any){
  this.RowId=rowData.slno;
  this.locationName=rowData.location;
  this.address=rowData.address;
  this.note=rowData.note;
}
onSave2(){
  const params = {
    'slno': this.RowId,
    'driver_name': this.driverName,
    'pickup_time':this.pickupTime,
    'pickup_loaction':this.pickupLocation,
    'drop_location':this.dropLocation,
    'passenger_id':this.passengerName
  };
  this.restapiservice.post(Pathconstants.transportinfo_Post, params).subscribe(res => {
    if (res != null && res != undefined) {
      this.onView1();
      
      this.responseMsg = [{ severity: ResponseMessage.SuccessSeverity, detail: ResponseMessage.SuccessMessage }];
      setTimeout(() => this.responseMsg = [], 3000);
    }
    else {
      this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: ResponseMessage.ErrorMessage }];
      setTimeout(() => this.responseMsg = [], 3000);
    }
  })

}
onView2(){
  this.restapiservice.get(Pathconstants.transportinfo_GET).subscribe(res => {
    this.lodginginfoData = res;
  })
}
onEdit2(rowData:any){
  this.RowId=rowData.slno;
  this.driverName=rowData.driver_name;
  this.pickupTime=rowData.pickup_time;
  this.pickupLocation=rowData.pickup_loaction;
  this.dropLocation=rowData.drop_location;
  this.passengerName=rowData.passenger_id;
}
}
