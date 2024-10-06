import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BusticketComponent } from './busticket/busticket.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { SignuppageComponent } from './signuppage/signuppage.component';
import { TicketpageComponent } from './ticketpage/ticketpage.component';

const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch:'full'},
  {path:"login",component:LoginpageComponent},
  {path:"signup",component:SignuppageComponent},
  {path:"home",component:HomepageComponent},
  {path:"admin",component:AdminComponent},
  {path:"forgetpwd",component:ForgetpasswordComponent},
  {path:"busticket",component:BusticketComponent},
  {path:"ticket",component:TicketpageComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
