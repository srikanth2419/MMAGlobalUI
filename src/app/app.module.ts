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
    RadioButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
