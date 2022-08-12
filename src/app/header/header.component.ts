import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  display: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.display = !this.display;
    console.log('disp', this.display)
  }

}
