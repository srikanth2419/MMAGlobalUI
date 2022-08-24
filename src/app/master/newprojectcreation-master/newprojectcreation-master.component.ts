import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newprojectcreation-master',
  templateUrl: './newprojectcreation-master.component.html',
  styleUrls: ['./newprojectcreation-master.component.scss']
})
export class NewprojectcreationMasterComponent implements OnInit {
   
  projectName: any;
  durationDay: any;
  budget: any;
  projectstartDate: any;
  prodhouseName: any;
  selectedType: any;

  constructor() { }

  ngOnInit(): void {
  }

}
