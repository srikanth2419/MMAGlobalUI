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
            {label: 'Contact List', icon: 'pi pi-fw pi-user', id: '1', routerLink: '/contacts-list'},
            {label: 'Location Info', icon: 'pi pi-fw pi-map-marker', id: '1', routerLink: '/location-info'},
            {label: 'Fund Utilization', icon: 'pi pi-fw pi-briefcase', id: '2', routerLink: '/fund-utilization'},
            {label: 'Daily Expenses', icon: 'pi pi-fw pi-chart-bar', id: '2', routerLink: '/daily-expenses'},
            //master
            {label: 'Menu Master', icon: 'pi pi-fw pi-pencil', id: '3', routerLink: '/menu-master'},
            {label: 'Role Master', icon: 'pi pi-fw pi-pencil', id: '3', routerLink: '/role-master'},
            {label: 'Expenses Category Master', icon: 'pi pi-fw pi-pencil', id: '3', routerLink: '/expenses-category'},
            {label: 'Main Category Master', icon: 'pi pi-fw pi-pencil', id: '3', routerLink: '/maincategory-master'},
            {label: 'Sub Category Master', icon: 'pi pi-fw pi-pencil', id: '3', routerLink: '/subcategory-master'},
            {label: 'Union Master', icon: 'pi pi-fw pi-pencil', id: '3', routerLink: '/union-master'},
            {label: 'State Master', icon: 'pi pi-fw pi-pencil', id: '3', routerLink: '/state-master'},
            {label: 'City Master', icon: 'pi pi-fw pi-pencil', id: '3', routerLink: '/city-master'},
            {label: 'Country Master', icon: 'pi pi-fw pi-pencil', id: '3', routerLink: '/country-master'},
            {label:'User Master',icon: 'pi pi-fw pi-pencil', id: '3', routerLink: '/user-master'},
            {label: 'New Project Creation Master', icon: 'pi pi-fw pi-pencil', id: '3', routerLink: '/newprojectcreation-master'},

            // {label: 'Media Broadcast', icon: 'pi pi-fw pi-globe', id: '3'},
            // {label: 'Staffing & Funds', icon: 'pi pi-fw pi-inbox', id: '3'},
            // {label: 'Marketing', icon: 'pi pi-fw pi-chart-line', id: '3'},
            // {label: 'Insight Solutions', icon: 'pi pi-fw pi-search', id: '3'},
            // {label: 'News & Events', icon: 'pi pi-fw pi-telegram', id: '3'},
            // {label: 'Payroll & Labor Insights', icon: 'pi pi-fw pi-money-bill', id: '3'},
            // {label: 'Production Incentives', icon: 'pi pi-fw pi-envelope', id: '4'},
            // {label: 'Payroll', icon: 'pi pi-fw pi-wallet', id: '4'},
    ];
    this.titles = [
      { title: 'Shooting', id: '1' },
      { title: 'Expenses', id: '2' },
      { title: 'Masters', id: '3' },
      // { title: 'Insights', id: '3' },
     // { title: 'Finance', id: '4' },
      // { title: 'Contact', id: '5' },
    ]
  }

}
