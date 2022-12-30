import { Component, OnInit } from '@angular/core';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-subcategory-master',
  templateUrl: './subcategory-master.component.html',
  styleUrls: ['./subcategory-master.component.scss']
})
export class SubcategoryMasterComponent implements OnInit {

  categoryName: any;
  selectedType: any;
  cols: any[] = [];
  data: any[] = [];
  sino: any;
  RowId:any;

  constructor(private restApiService: RestapiService) {
  }


  ngOnInit(): void {
    this.cols = TableConstants.SubCategoryMaster;
    this.onView();
  }

  onEdit(rowData: any) {
    this.RowId = rowData.sino;
    this.categoryName = rowData.categoryname;
    this.selectedType = (rowData.flag === 'Active') ? 1 : 0;
  }

  onView() {
    this.restApiService.get(Pathconstants.SubCategoryMasterController_Get).subscribe(res => {
      this.data = res;
      if (res) {
        res.forEach((i: any) => {
          i.flag = (i.flag == true) ? 'Active' : 'InActive'
        })
      }
    })
  }


  onSave() {
    const params = {
      'sino': this.RowId,
      'categoryname': this.categoryName,
      'flag': (this.selectedType == 1) ? true : false
    }

    this.restApiService.post(Pathconstants.SubCategoryMasterController_Post, params).subscribe(res => { })

  }

  onClear() {
    this.categoryName = null;
    this.selectedType = null;
    this.sino = 0;
  }


}
