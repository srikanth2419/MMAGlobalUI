import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { ResponseMessage } from 'src/app/CONSTANTS-MODULE/message-constants';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import { TableConstants } from 'src/app/CONSTANTS-MODULE/table-constants';
import { RestapiService } from 'src/app/services/restapi.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interface/user.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-newprojectcreation-master',
  templateUrl: './newprojectcreation-master.component.html',
  styleUrls: ['./newprojectcreation-master.component.scss'],
})
export class NewprojectcreationMasterComponent implements OnInit {

  projectName: any;
  durationDay: any;
  budget: any;
  projectstartDate: any;
  prodhouseName: any;
  prod_id: any;
  selectedType: any;
  loading: boolean = false;
  newprojectcreationData: any[] = [];
  newprojectcreationCols: any;
  block: RegExp = /^[^-=<>*%()^{}$@#_!+0-9&?,\s~`|.:;'"?/]/;
  responseMsg: Message[] = [];
  RowId: any;
  userInfo: any;
  logged_user!: User
   productionhouse:any;

  constructor(private restapiservice: RestapiService, private authservice: AuthService,private messageService: MessageService) { }

  ngOnInit(): void {
    //this.restapiservice.get(Pathconstants.projectcreation_Get).subscribe(res => { this.newprojectcreationData = res })
  
    this.newprojectcreationCols = TableConstants.newprojectcreationCols;
    this.logged_user = this.authservice.getUserInfo();
    this.productionhouse = this.logged_user.production_house_name;
    this.prod_id = this.logged_user.production_id;
    this.onView();

  }

  onSave() {
    {
      const params = {
        'project_id': this.RowId,
        'project_name': this.projectName,
        'duration_in_days': this.durationDay,
        'budget': this.budget,
        'project_start_date': this.projectstartDate,
        'created_date': new Date(),
        'production_id':this.prod_id,
        'flag': (this.selectedType == 1) ? true : false
      };
      this.restapiservice.post(Pathconstants.projectcreation_Post, params).subscribe(res => {
        if (res) {
          this.onClear();
          this.onView();
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SuccessSeverity,
            summary: ResponseMessage.SuccessSeverity, detail: ResponseMessage.SuccessMessage
          });
        } else {
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
            summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
          });
        }
      }, (err: HttpErrorResponse) => {
        if (err.status === 0 || err.status === 400) {
          this.messageService.clear();
          this.messageService.add({
            key: 't-msg', severity: ResponseMessage.SEVERITY_ERROR,
            summary: ResponseMessage.SUMMARY_ERROR, detail: ResponseMessage.ErrorMessage
          })
        }
      })
    }
    
  }
  onClear() {
    this.projectName = null;
    this.durationDay = null;
    this.budget = null;
    this.projectstartDate = null;
    this.selectedType = null;
    this.prodhouseName = null;

  }

  onView() {
    // this.restapiservice.get(Pathconstants.projectcreation_Get).subscribe(res => {
    //   this.newprojectcreationData = res;
    //   if (res) {
    //     res.forEach((i: any) => {
    //       i.flag = (i.flag == true) ? 'Active' : 'InActive'
    //     })
    //   }
    // })
    const params = {
      "production_id" : this.prod_id
    };
    this.restapiservice.getByParameters(Pathconstants.projectcreationproduction_GET, params).subscribe(response => {
      this.newprojectcreationData = response
      if (response) {
        response.forEach((i: any) => {
          i.flag = (i.flag == true) ? 'Active' : 'InActive'
        })
      }
    })
  }

  onEdit(rowData: any) {
    this.RowId = rowData.project_id;
    this.projectName = rowData.project_name;
    this.durationDay = rowData.duration_in_days;
    this.budget = rowData.budget;
    this.projectstartDate = new Date(rowData.project_start_date);
    this.selectedType = (rowData.flag === 'Active') ? 1 : 0;

  }
  onCheck() {
    this.newprojectcreationData.forEach(i => {
      if (i.project_name === this.projectName) {
        this.messageService.add({
          key: 't-msg', severity: ResponseMessage.WarnSeverity, detail: 'Project Name Already Exist, Please input different name'
        });
          setTimeout(() => this.responseMsg = [], 3000);
          this.projectName = null;
      }
    })
  }
}

