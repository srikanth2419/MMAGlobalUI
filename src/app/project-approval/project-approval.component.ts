import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Pathconstants } from '../CONSTANTS-MODULE/pathconstants';
import { RestapiService } from '../services/restapi.service';
import { ResponseMessage } from '../CONSTANTS-MODULE/message-constants';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-project-approval',
  templateUrl: './project-approval.component.html',
  styleUrls: ['./project-approval.component.scss']
})
export class ProjectApprovalComponent implements OnInit {
  registrationData: any[] = [];
  userdata: any[] = [];
  disableApprove: boolean = false;
  disableReject: boolean = false;
  tEnableTick: boolean = false;
  tCrossTick: boolean = false;
  id:any;
  responseMsg: Message[] = [];

  constructor(private restApiService: RestapiService, private _confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.onView();
  }

  onUserMasterGet(row: any) {
    const params = {
      'username_emailid': row.email_id
    }
    this.restApiService.get(Pathconstants.UserMasterController_Get).subscribe(res => {
      this.userdata = res;
      if (res.Table.length === 0) {
        this.userdata = res.Table;
        this.onSave(row);
      } else {
        this.userdata = res.Table;
        console.log('e', this.userdata)
      }
    })
  }
  onView() {
    this.restApiService.get(Pathconstants.registration_GET).subscribe(res => {
      this.registrationData = res;
      if (res) {
        res.forEach((i: any) => {
          i.flag = (i.flag == true) ? 'Active' : 'InActive'
          i.disableApprove = (i.approvalstatus === 1) ? false : true;
          i.disableReject = (i.approvalstatus !== 2) ? true : false;
          i.tCrossTick = (i.approvalstatus === 2) ? true : false;
          i.tEnableTick = (i.approvalstatus === 1) ? true : false;

        })
      }
    })
  }

  selectForApproval(row: any) {
    if (row !== null && row !== undefined) {
      const params = {
        'production_id': row.production_id,
        'approvalstatus': 1
      }
      this.restApiService.post(Pathconstants.UpdateApprovalStatus_update, params).subscribe(res => {
        if (res) {
          this.onUserMasterGet(row);
          this.disableApprove = false;
          this.tEnableTick = true;
          this.onView();
          // this.messageService.clear();
          // this.messageService.add({
            this.responseMsg = [{ severity: ResponseMessage.SuccessSeverity, detail: ResponseMessage.UpdateMsg }];
            setTimeout(() => this.responseMsg = [], 3000);
        }
      })
    }
  }
  selectForDisApproval(row: any) {
    if (row !== null && row !== undefined) {
      this._confirmationService.confirm({
        message: 'Do You Want To Reject?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const params = {
            'production_id': row.production_id,
            'approvalstatus': 2
          }
          this.restApiService.post(Pathconstants.UpdateApprovalStatus_update, params).subscribe(res => {
            if (res) {
              this.disableReject = false;
              this.tCrossTick = true;
              this.disableApprove = false;
              this.onView();
              // this.messageService.clear();
              // this.messageService.add({
                this.responseMsg = [{ severity: ResponseMessage.SuccessSeverity, detail: ResponseMessage.UpdateMsg }];
                setTimeout(() => this.responseMsg = [], 3000);
            }
          })
        },
        reject: () => {

        }
      });
    }
  }
  onSave(row: any) {
    const params = {
      'id': 0,
      'username_emailid': row.email_id,
      'password': 'MMA@1234',
      'roleid': 2,
      'flag': true
    }
    this.restApiService.post(Pathconstants.UserMaster_Post, params).subscribe(res => {
      if (res) {
        this.onView();
        // this.messageService.clear();
        // this.messageService.add({
          this.responseMsg = [{ severity: ResponseMessage.SuccessSeverity, detail: ResponseMessage.SuccessMessage }];
          setTimeout(() => this.responseMsg = [], 3000);
      } else {
        // this.messageService.clear();
        // this.messageService.add({
          this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: ResponseMessage.ErrorMessage }];
          setTimeout(() => this.responseMsg = [], 3000);
      }
    }, (err: HttpErrorResponse) => {
      if (err.status === 0 || err.status === 400) {
        // this.messageService.clear();
        // this.messageService.add({
          this.responseMsg = [{ severity: ResponseMessage.ErrorSeverity, detail: ResponseMessage.ContactMessage }];
          setTimeout(() => this.responseMsg = [], 3000);
      }
    })
  }
}
