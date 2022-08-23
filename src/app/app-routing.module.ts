import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyExpensesComponent } from './EXPENSES-MODULE/daily-expenses/daily-expenses.component';
import { ContactsListComponent } from './FORMS-MODULE/contacts-list/contacts-list.component';
import { LocationInfoComponent } from './FORMS-MODULE/location-info/location-info.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { CityMasterComponent } from './master/city-master/city-master.component';
import { CountryMasterComponent } from './master/country-master/country-master.component';
import { MaincategoryMasterComponent } from './MASTERS-MODULE/maincategory-master/maincategory-master.component';
import { MenuMasterComponent } from './MASTERS-MODULE/menu-master/menu-master.component';
import { RoleMasterComponent } from './MASTERS-MODULE/role-master/role-master.component';
import { StateMasterComponent } from './MASTERS-MODULE/state-master/state-master.component';
import { SubcategoryMasterComponent } from './MASTERS-MODULE/subcategory-master/subcategory-master.component';
import { UnionMasterComponent } from './MASTERS-MODULE/union-master/union-master.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'role-master', component: RoleMasterComponent },
  { path: 'menu-master', component: MenuMasterComponent},
  { path: 'union-master', component:UnionMasterComponent},
  { path: 'maincategory-master', component: MaincategoryMasterComponent},
  { path: 'subcategory-master', component: SubcategoryMasterComponent},
  { path: 'state-master', component: StateMasterComponent},
  { path: 'contacts-list', component: ContactsListComponent },
  { path: 'country-master', component: CountryMasterComponent},
  { path: 'city-master', component: CityMasterComponent},
  //FORMS
  { path: 'contacts-list', component: ContactsListComponent },
  { path: 'location-info', component: LocationInfoComponent },
  //Expenses
  { path: 'daily-expenses', component: DailyExpensesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
