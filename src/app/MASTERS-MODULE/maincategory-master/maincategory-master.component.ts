import { Component, OnInit } from '@angular/core';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';




@Component({
  selector: 'app-maincategory-master',
  templateUrl: './maincategory-master.component.html',
  styleUrls: ['./maincategory-master.component.scss']
})
export class MaincategoryMasterComponent implements OnInit {

  categoryName: any;
  selectedType: any;
  cols: any[] = [];
  data: any[] = [];
  sino:any;

  constructor(private restApiService: RestapiService) { }

  ngOnInit(): void {

    this.cols = TableConstants.MainCategoryMaster;
    this.onView();
  }

  onEdit(rowData: any) {
  }

  onView() {
    this.restApiService.get(Pathconstants.MainCategoryMasterController_Get).subscribe(res => {
      this.data = res;
      if (res) {
        res.forEach((i: any) => {
          i.flag = (i.flag == true) ? 'Active' : 'InActive'
        })
      }
    })
  }

  onSave(){
    const params = {
      'sino': 0,
      'categoryname':this.categoryName,
      'flag': (this.selectedType == 1) ? true : false
    }
    this.restApiService.post(Pathconstants.MainCategoryMasterController_Post, params).subscribe(res => { })  
    this.onClear();
  }

  onClear(){
    this.categoryName = null;
    this.selectedType = null;
    this.sino = 0;
  }

}
