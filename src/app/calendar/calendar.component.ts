import { Component, OnInit } from '@angular/core';
import { User } from '../interface/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { RestapiService } from 'src/app/services/restapi.service';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  events: any[] = [];
  options: any;
  header: any;
  logged_user: User | undefined;
  
  constructor(private restApiService: RestapiService, private authservice: AuthService) { 
    
  }

  ngOnInit(): void {
    this.logged_user = this.authservice.UserInfo;
    this.loadEvents();
  }
  loadEvents() {
    this.restApiService.getByParameters('', { 'slno': this.logged_user?.id }).subscribe((events: any) => {
      if (events !== undefined && events !== null && events.length !== 0) {
        var setInitialDate = new Date().getFullYear()  + '-01-01';
        var data: any = [];
        events.forEach((e:any) => {
          data.push({
            'id': e.slno,
            'title': e.scene,
            'start':e.scheduledate,
            'color': '#41cf41' 
          })
        })
        this.events = data;
        this.options = {
          initialDate : setInitialDate,
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                editable: true,
                selectable:true,
                selectMirror: true,
                dayMaxEvents: true,
                showNonCurrentDates: false,
          dateClick: this.handleDateClick.bind(this),
        };
       this.options = { ...this.options, ...{ events: this.events } };
      }
    })
  }

  handleDateClick(arg:any) { 
    // handle date click here
  }


}
