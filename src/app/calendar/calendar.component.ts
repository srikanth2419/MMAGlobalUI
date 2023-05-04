import { Component, OnInit } from '@angular/core';
import { User } from '../interface/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { RestapiService } from 'src/app/services/restapi.service';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
  };
  ShootingScheduleData: any;
  events: any;
  
  constructor(private restApiService: RestapiService, private authservice: AuthService, private datePipe: DatePipe) { 
    
  }

  ngOnInit(): void {
     
   //this.logged_user = this.authservice.UserInfo;
    this.loadevents();
  }
  loadevents(){
    var setInitialDate = new Date();
    console.log('dd',setInitialDate)
    
    this.restApiService.get(Pathconstants.shooting_schedule_Get).subscribe(res => {
      var data: any = [];
      res.forEach((e:any) => {
       // console.log('a',e.schedule_date.setUTCDate(10));
        //console.log('d',this.datePipe.transform (e.schedule_date, 'ddd MMM dd yyyy HH:SS:MM'))
        //var ndate= this.datePipe.transform (e.schedule_date, 'ddd MMM dd yyyy HH:SS:MM')
        data.push({
          'id': e.slno,
          'title': e.scene,
          'start': e.schedule_date,
          'color':  '#41cf41' 
        })
      })
      this.events = data;
      this.calendarOptions = {
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
        // dateClick: this.handleDateClick.bind(this),
      };
     this.calendarOptions = { ...this.calendarOptions, ...{ events: this.events } };
    })
  }
  }
