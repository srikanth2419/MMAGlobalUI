import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];
  titles: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.items = [
            {label: 'Enterprise Hub', icon: 'pi pi-fw pi-database', id: '1'},
            {label: 'Academy', icon: 'pi pi-fw pi-building', id: '1'},
            {label: 'Support', icon: 'pi pi-fw pi-users', id: '1'},
            {label: 'Production Management', icon: 'pi pi-fw pi-chart-bar', id: '2'},
            {label: 'Media Broadcast', icon: 'pi pi-fw pi-globe', id: '2'},
            {label: 'Staffing & Funds', icon: 'pi pi-fw pi-inbox', id: '2'},
            {label: 'Marketing', icon: 'pi pi-fw pi-chart-line', id: '2'},
            {label: 'Insight Solutions', icon: 'pi pi-fw pi-search', id: '3'},
            {label: 'News & Events', icon: 'pi pi-fw pi-telegram', id: '3'},
            {label: 'Payroll & Labor Insights', icon: 'pi pi-fw pi-money-bill', id: '3'},
            {label: 'Production Incentives', icon: 'pi pi-fw pi-envelope', id: '4'},
            {label: 'Payroll', icon: 'pi pi-fw pi-wallet', id: '4'},
            {label: 'Production Finance', icon: 'pi pi-fw pi-briefcase', id: '4'},
    ];
    this.titles = [
      { title: 'Industry', id: '1' },
      { title: 'Production', id: '2' },
      { title: 'Insights', id: '3' },
      { title: 'Finance', id: '4' },
      { title: 'Contact', id: '5' },
    ]
  }

}
