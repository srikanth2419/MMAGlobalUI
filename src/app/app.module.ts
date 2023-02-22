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
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { HighchartsChartModule } from 'highcharts-angular';
import { RestapiService } from 'src/app/services/restapi.service';
import {KeyFilterModule} from 'primeng/keyfilter';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MenuComponent } from './menu/menu.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ContactsListComponent } from './FORMS-MODULE/contacts-list/contacts-list.component';
import { FundUtilizationComponent } from './FORMS-MODULE/fund-utilization/fund-utilization.component';
import { CallSheetComponent } from './FORMS-MODULE/call-sheet/call-sheet.component';
import { ShootingScheduleComponent } from './FORMS-MODULE/shooting-schedule/shooting-schedule.component';
import { LocationInfoComponent } from './FORMS-MODULE/location-info/location-info.component';
import { DailyExpensesComponent } from './EXPENSES-MODULE/daily-expenses/daily-expenses.component';
import { ExpensesCategoryMasterComponent } from './MASTERS-MODULE/expenses-category-master/expenses-category-master.component';
import { MaincategoryMasterComponent } from './MASTERS-MODULE/maincategory-master/maincategory-master.component';
import { MenuMasterComponent } from './MASTERS-MODULE/menu-master/menu-master.component';
import { RoleMasterComponent } from './MASTERS-MODULE/role-master/role-master.component';
import { StateMasterComponent } from './MASTERS-MODULE/state-master/state-master.component';
import { SubcategoryMasterComponent } from './MASTERS-MODULE/subcategory-master/subcategory-master.component';
import { UnionMasterComponent } from './MASTERS-MODULE/union-master/union-master.component';
import { CityMasterComponent } from './MASTERS-MODULE/city-master/city-master.component';
import { NewprojectcreationMasterComponent } from './MASTERS-MODULE/newprojectcreation-master/newprojectcreation-master.component';
import { CountryMasterComponent } from './MASTERS-MODULE/country-master/country-master.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { UserMasterComponent } from './MASTERS-MODULE/user-master/user-master.component';
import { ProjectApprovalComponent } from './project-approval/project-approval.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MailtypeMasterComponent } from './mailtype-master/mailtype-master.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    MenuComponent,
    RegistrationComponent,
    LoginComponent,
    ContactsListComponent,
    FundUtilizationComponent,
    CallSheetComponent,
    ShootingScheduleComponent,
    CityMasterComponent,
    LocationInfoComponent,
    DailyExpensesComponent,
    NewprojectcreationMasterComponent,
    ExpensesCategoryMasterComponent,
    MaincategoryMasterComponent,
    MenuMasterComponent,
    RoleMasterComponent,
    StateMasterComponent,
    SubcategoryMasterComponent,
    UnionMasterComponent,
    CountryMasterComponent,
    DashboardComponent,
    UserMasterComponent,
    ProjectApprovalComponent,
    ChangePasswordComponent,
    MailtypeMasterComponent,
    
    
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
    CheckboxModule,
    TableModule,
    TabViewModule,
    RadioButtonModule,
    HighchartsChartModule, 
    HttpClientModule,
    MessageModule,
    MessagesModule,
    KeyFilterModule,
    ConfirmDialogModule,
  ],
  providers: [RestapiService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
