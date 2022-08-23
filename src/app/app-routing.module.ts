import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { MaincategoryMasterComponent } from './master/maincategory-master/maincategory-master.component';
import { MenuMasterComponent } from './master/menu-master/menu-master.component';
import { RoleMasterComponent } from './master/role-master/role-master.component';
import { StateMasterComponent } from './master/state-master/state-master.component';
import { SubcategoryMasterComponent } from './master/subcategory-master/subcategory-master.component';
import { UnionMasterComponent } from './master/union-master/union-master.component';
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
  { path: 'state-master', component: StateMasterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
