import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallSheetComponent } from './FORMS-MODULE/call-sheet/call-sheet.component';
import { ContactsListComponent } from './FORMS-MODULE/contacts-list/contacts-list.component';
import { FundUtilizationComponent } from './FORMS-MODULE/fund-utilization/fund-utilization.component';
import { ShootingScheduleComponent } from './FORMS-MODULE/shooting-schedule/shooting-schedule.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ExpensesCategoryMasterComponent } from './MASTERS-MODULE/expenses-category-master/expenses-category-master.component';
import { MaincategoryMasterComponent } from './MASTERS-MODULE/maincategory-master/maincategory-master.component';
import { MenuMasterComponent } from './MASTERS-MODULE/menu-master/menu-master.component';
import { RoleMasterComponent } from './MASTERS-MODULE/role-master/role-master.component';
import { StateMasterComponent } from './MASTERS-MODULE/state-master/state-master.component';
import { SubcategoryMasterComponent } from './MASTERS-MODULE/subcategory-master/subcategory-master.component';
import { UnionMasterComponent } from './MASTERS-MODULE/union-master/union-master.component';
import { LocationInfoComponent } from './FORMS-MODULE/location-info/location-info.component';
import { DailyExpensesComponent } from './EXPENSES-MODULE/daily-expenses/daily-expenses.component';
import { NewprojectcreationMasterComponent } from './MASTERS-MODULE/newprojectcreation-master/newprojectcreation-master.component';
import { CityMasterComponent } from './MASTERS-MODULE/city-master/city-master.component';
import { CountryMasterComponent } from './MASTERS-MODULE/country-master/country-master.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserMasterComponent } from './MASTERS-MODULE/user-master/user-master.component';
import { ProjectApprovalComponent } from './project-approval/project-approval.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthGuard } from './services/auth.guard';
import { MailtypeMasterComponent } from './mailtype-master/mailtype-master.component';
import { CalendarComponent } from './calendar/calendar.component';




const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent , canActivate:[AuthGuard]},
  { path: 'dashboard', component: DashboardComponent , canActivate:[AuthGuard]},
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contacts-list', component: ContactsListComponent, canActivate:[AuthGuard] },
  { path: 'fund-utilization', component: FundUtilizationComponent , canActivate:[AuthGuard]},
  { path: 'shooting-schedule', component: ShootingScheduleComponent, canActivate:[AuthGuard] },
  { path: 'call-sheet', component: CallSheetComponent, canActivate:[AuthGuard] },
  //Master-Entry
  { path: 'role-master', component: RoleMasterComponent , canActivate:[AuthGuard]},
  { path: 'menu-master', component: MenuMasterComponent, canActivate:[AuthGuard] },
  { path: 'union-master', component: UnionMasterComponent, canActivate:[AuthGuard] },
  { path: 'maincategory-master', component: MaincategoryMasterComponent, canActivate:[AuthGuard] },
  { path: 'subcategory-master', component: SubcategoryMasterComponent, canActivate:[AuthGuard] },
  { path: 'state-master', component: StateMasterComponent, canActivate:[AuthGuard] },
  { path: 'expenses-category', component: ExpensesCategoryMasterComponent, canActivate:[AuthGuard] },
  {path: 'user-master',component:UserMasterComponent, canActivate:[AuthGuard]},

  { path: 'country-master', component: CountryMasterComponent, canActivate:[AuthGuard] },
  { path: 'city-master', component: CityMasterComponent , canActivate:[AuthGuard]},
  //FORMS
  { path: 'contacts-list', component: ContactsListComponent, canActivate:[AuthGuard] },
  { path: 'location-info', component: LocationInfoComponent , canActivate:[AuthGuard]},
  //Expenses
  { path: 'daily-expenses', component: DailyExpensesComponent, canActivate:[AuthGuard] },
  { path: 'newprojectcreation-master', component: NewprojectcreationMasterComponent , canActivate:[AuthGuard]},
  //project-approval
  { path:'project-approval',component:ProjectApprovalComponent, canActivate:[AuthGuard]},
  //change-password
  { path:'change-password',component:ChangePasswordComponent, canActivate:[AuthGuard]},
  { path:'mailtype-master',component:MailtypeMasterComponent, },
  //calender
  { path:'calender' ,component:CalendarComponent,},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
