import { Component, OnInit } from '@angular/core';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
@Component({
  selector: 'app-union-master',
  templateUrl: './union-master.component.html',
  styleUrls: ['./union-master.component.scss']
})
export class UnionMasterComponent implements OnInit {

  unionName: any;
  regNumber: any;
  selectedType: any;
  cols: any;
  RowId:any;
  data: any[] = [];
  loading:boolean = false;

  constructor(private restApiService: RestapiService) { }

  ngOnInit(): void {
    this.onView();
    this.cols = TableConstants.unionMasterColumns;

  }

  onSubmit() {
    const params = {
      'sino': 0,
      'unionname': this.unionName,
      'registernumber': this.regNumber,
      'isactive': (this.selectedType == 1) ? true : false
    }
    this.restApiService.post(Pathconstants.UnionMaster_Post, params).subscribe(res => { })
    this.onClear();
  }
  onView() {
    this.restApiService.get(Pathconstants.UnionMasterController_GET).subscribe(res => {
      this.data = res;
    })
  }
  onEdit(rowData:any){
this.RowId=rowData.sino;
this.unionName=rowData.unionname;
this.regNumber=rowData.registernumber;
this.selectedType = (rowData.flag === true) ? 1 : 0;
  }
  onClear() {
    this.unionName = null;
    this.regNumber = null;
    this.selectedType = null;
  }
}
