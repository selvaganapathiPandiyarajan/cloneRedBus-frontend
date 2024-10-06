import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { SignuppageComponent } from './signuppage/signuppage.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { FilterPipe } from './filter.pipe';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { BusticketComponent } from './busticket/busticket.component';
import { TicketpageComponent } from './ticketpage/ticketpage.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginpageComponent,
    SignuppageComponent,
  
    AdminComponent,
         ForgetpasswordComponent,
         FilterPipe,
         BusticketComponent,
         TicketpageComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Ng2TelInputModule,
    BrowserAnimationsModule,
    AutocompleteLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
