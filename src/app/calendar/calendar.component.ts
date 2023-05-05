import { Component, OnInit } from '@angular/core';
import { User } from '../interface/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { RestapiService } from 'src/app/services/restapi.service';
import { Pathconstants } from 'src/app/CONSTANTS-MODULE/pathconstants';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
//import interactionPlugin from '@fullcalendar/interaction';
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
    //initialView: 'dayGridMonth',
    weekends: true,
  };
  ShootingScheduleData: any;
  events: any;
  logged_user!:User;
  
  constructor(private restApiService: RestapiService, private authservice: AuthService, private datePipe: DatePipe) { 
    
  }

  ngOnInit(): void {

     
   this.logged_user = this.authservice.getUserInfo();
    this.loadevents();
  }
  loadevents(){
    var setInitialDate = new Date();
    console.log('dd',setInitialDate)
    const params ={
      'production_id':this.logged_user.production_id,
    }
    this.restApiService.getByParameters(Pathconstants.shootingshedule_GETBYID,params).subscribe(res => {
      var data: any = [];
      res.forEach((e:any) => {
        data.push({
          'id': e.slno,
          'title': e.scene,
          'start': e.schedule_date,
          'color': ((e.slno * 1) === 1) ? '#41cf41' : '#6565cb'
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
