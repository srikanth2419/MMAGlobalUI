import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-union-master',
  templateUrl: './union-master.component.html',
  styleUrls: ['./union-master.component.scss']
})
export class UnionMasterComponent implements OnInit {

  unionName: any;
  regNumber: any;
  selectedType: any;

  constructor() { }

  ngOnInit(): void {
  }

}
