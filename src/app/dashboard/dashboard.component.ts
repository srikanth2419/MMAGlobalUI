import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {  
  Highcharts = Highcharts;
  planOptions: any;
  chartLabels: any;
  allocatedOptions: any;
  constructor() { 
  }
  ngOnInit(): void {
    this.chartLabels = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];
    this.planOptions = {
      chart: {
        type: 'bar'
     },
     title: {
        text: 'Movie Plan'
     },
     legend : {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 400,
        y: 0,
        floating: true,
        borderWidth: 1,
       
        backgroundColor: (
           (Highcharts.theme && Highcharts.theme.colorAxis) || 
             '#FFFFFF'), shadow: true
        },
        xAxis:{
           categories: ['Movie1', 'Movie2', 'Movie3', 'Movie4'], title: {
           text: null
        } 
     },
     yAxis : {
        min: 0, title: {
           text: 'Movie Plan(weeks)', align: 'high'
        },
        labels: {
           overflow: 'justify'
        }
     },
     tooltip : {
        valueSuffix: ' millions'
     },
     plotOptions : {
        bar: {
           dataLabels: {
              enabled: true
           }
        }
     },
     credits:{
        enabled: false
     },
     series: [
        {
           name: 'Plan',
           data: [25, 35, 40, 15],
           color: '#3ABFF9'
        }, 
        {
           name: 'Expected',
           data: [20, 40, 25, 35],
           color: '#EDF316'
        }, 
        {
           name: 'Actual',
           data: [15, 25, 25, 25],
           color: '#AFFC1F'     
        }
     ]
  };
  this.allocatedOptions = {
    chart: {
      type: 'bar'
   },
   title: {
      text: 'Movie Plan'
   },
   legend : {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      x: 400,
      y: 0,
      floating: true,
      borderWidth: 1,
     
      backgroundColor: (
         (Highcharts.theme && Highcharts.theme.colorAxis) || 
           '#FFFFFF'), shadow: true
      },
      xAxis:{
         categories: ['Movie1', 'Movie2', 'Movie3'], title: {
         text: null
      } 
   },
   yAxis : {
      min: 0, title: {
         text: 'Movie Plan(weeks)', align: 'high'
      },
      labels: {
         overflow: 'justify'
      }
   },
   tooltip : {
      valueSuffix: ' millions'
   },
   plotOptions : {
      bar: {
         dataLabels: {
            enabled: true
         }
      }
   },
   credits:{
      enabled: false
   },
   series: [
      {
         name: 'Allocated',
         data: [25, 10, 15, ],
         color: '#9A6DF9'
         
      }, 
      {
         name: 'Required',
         data: [20, 25, 5],
         color: '#EA0C8C'
      }, 
      {
         name: 'Spent',
         data: [15, 10, 25],
         color: '#EEFC19' 
      }
   ]
};
   }
    
}
