import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GalleriaModule } from 'primeng/galleria';
import { SidebarModule } from 'primeng/sidebar';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MenuComponent } from './menu/menu.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { RoleMasterComponent } from './MASTERS-MODULE/role-master/role-master.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ContactsListComponent } from './FORMS-MODULE/contacts-list/contacts-list.component';
import { CountryMasterComponent } from './master/country-master/country-master.component';
import { CityMasterComponent } from './master/city-master/city-master.component';
import { LocationInfoComponent } from './FORMS-MODULE/location-info/location-info.component';
import { DailyExpensesComponent } from './EXPENSES-MODULE/daily-expenses/daily-expenses.component';
import { MenuMasterComponent } from './MASTERS-MODULE/menu-master/menu-master.component';
import { UnionMasterComponent } from './MASTERS-MODULE/union-master/union-master.component';
import { MaincategoryMasterComponent } from './MASTERS-MODULE/maincategory-master/maincategory-master.component';
import { SubcategoryMasterComponent } from './MASTERS-MODULE/subcategory-master/subcategory-master.component';
import { StateMasterComponent } from './MASTERS-MODULE/state-master/state-master.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    MenuComponent,
    RegistrationComponent,
    LoginComponent,
    RoleMasterComponent,
    MenuMasterComponent,
    UnionMasterComponent,
    MaincategoryMasterComponent,
    SubcategoryMasterComponent,
    StateMasterComponent,
    ContactsListComponent,
    CountryMasterComponent,
    CityMasterComponent,
    LocationInfoComponent,
    DailyExpensesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GalleriaModule,
    SidebarModule,
    PanelModule,
    InputTextModule,
    FormsModule,
    CardModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    RadioButtonModule,
    CheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
