import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];
  titles: any[] = [];
  @Input() hide: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.items = [
            {label: 'Call Sheet', icon: 'pi pi-fw pi-book', id: '1', routerLink: '/call-sheet'},
            {label: 'Shooting Schedule', icon: 'pi pi-fw pi-clock', id: '1', routerLink: '/shooting-schedule'},
            {label: 'Production Management', icon: 'pi pi-fw pi-chart-bar', id: '2'},
            {label: 'Media Broadcast', icon: 'pi pi-fw pi-globe', id: '2'},
            {label: 'Staffing & Funds', icon: 'pi pi-fw pi-inbox', id: '2'},
            {label: 'Marketing', icon: 'pi pi-fw pi-chart-line', id: '2'},
            {label: 'Insight Solutions', icon: 'pi pi-fw pi-search', id: '3'},
            {label: 'News & Events', icon: 'pi pi-fw pi-telegram', id: '3'},
            {label: 'Payroll & Labor Insights', icon: 'pi pi-fw pi-money-bill', id: '3'},
            {label: 'Fund Utilization', icon: 'pi pi-fw pi-briefcase', id: '4', routerLink: '/fund-utilization'},
            {label: 'Production Incentives', icon: 'pi pi-fw pi-envelope', id: '4'},
            {label: 'Payroll', icon: 'pi pi-fw pi-wallet', id: '4'},
    ];
    this.titles = [
      { title: 'Shooting', id: '1' },
      { title: 'Production', id: '2' },
      { title: 'Insights', id: '3' },
      { title: 'Finance', id: '4' },
      { title: 'Contact', id: '5' },
    ]
  }

}
