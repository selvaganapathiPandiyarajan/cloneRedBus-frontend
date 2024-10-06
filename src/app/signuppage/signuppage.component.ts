import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl,Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Signup } from './signup.model';
import { Router } from '@angular/router';
import { ConfigurationOptions, TooltipOptionsEnum } from 'intl-input-phone';


@Component({
  selector: 'app-signuppage',
  templateUrl: './signuppage.component.html',
  styleUrls: ['./signuppage.component.css']
})
export class SignuppageComponent implements OnInit {
  configOption1: ConfigurationOptions;

  public signupForm !: FormGroup;
  public passcon=false;
public today:any;
public invalidage=false;
public time:any;
public invalidage1=false;
public showgstform=false;
public role="customer";
public userage:any;
public phoneerr=false;
public phoneerr1=false;
public otpval:any;
public emailCheck=false;
public dialCode:any;
public phoneCheck=false;
DataAdd :Signup  = new Signup();

  constructor(private form: FormBuilder,private http: HttpClient,private api :ApiService,private router:Router) {
    this.configOption1 = new ConfigurationOptions();
    this.configOption1.SelectorClass = "ToolTipType1";
  
    this.signupForm = this.form.group({
      'email': ['',Validators.compose([Validators.required,Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')])],
      'lastname': ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.pattern('^[A-Za-z]+$')])],
      'firstname': ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(8),Validators.pattern('^[A-Za-z]+$')])],
      'pass': ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(8),Validators.pattern('^[A-Za-z]+$')])],
      'phone':new FormControl(undefined, [Validators.required]),
      'retypepass': ['',Validators.compose([Validators.required])],
      'dob': ['',Validators.compose([Validators.required])],
      // 'dob': new FormControl('', Validators.required),
   'gstno':[''],
   'bussinessname':[''],
      'gender':[''],
    })

   }

  ngOnInit(): void {
    this.today=new Date();
    let date=this.today.getDate();
    let month=this.today.getMonth();
    let year =this.today.getFullYear();
    this.time = date + "."+ month + "." + year;
   console.log("my time",this.time);
this.getotp();
  }
  checkPassword(){
    var pass=this.signupForm.value.pass;
    var conpass=this.signupForm.value.retypepass;
    if(pass != conpass)
    {
      this.passcon=true;
    }
    else{
      this.passcon=false;
    }
  }
  checkdate()
  {

    var dobval=this.signupForm.value.dob;
    // var down = (<HTMLInputElement>document.getElementById('dob')).value;
    console.log(this.signupForm.value);
    console.log(dobval);
    var datadate=new Date(dobval)
    var current=new Date()
    if(datadate > current)
    {
      this.invalidage1=true;

    }
    else{
      this.invalidage1=false;

    }
    let timeDiff = Math.abs(Date.now() - dobval);
    var month_diff = Date.now() - datadate.getTime();
    
    //convert the calculated difference in date format
    var age_dt = new Date(month_diff); 
    
    //extract year from date    
    var year = age_dt.getUTCFullYear();
    
    //now calculate the age of the user
    this.userage = Math.abs(year - 1970);
    
    //display the calculated age

if(this.userage<=5)
{
  this.invalidage=true;

} 
else{
  this.invalidage=false;

}

}
getotp()
{

  var minm = 100000;
  var maxm = 999999;
  this.otpval=Math.floor(Math
  .random() * (maxm - minm + 1)) + minm;
console.log(this.otpval,"otpvalue");
}
checkbox(){
    var checkbox = (<HTMLInputElement>document.getElementById('checkval')).checked;

if(checkbox)
{
  this.showgstform=true;  

}
else{
  this.showgstform=false;  

}
}
phonecheck()
{
this.phonevalid();
  this.api.getPhone(this.signupForm.value.phone)
  .subscribe(res=>{
    var check = res.find((a:any)=>{
      return a.phone === this.signupForm.value.phone 
    });
    if(check){
      this.phoneCheck=true;
     }
     else{
      this.phoneCheck=false;
     }
  },err=>{
    alert('something went wrong');
  })

}
checkEmail(){
    
  this.api.getEmail(this.signupForm.value.email)
  .subscribe(res=>{
    var check = res.find((a:any)=>{
      return a.email === this.signupForm.value.email 
    });
    if(check){
      this.emailCheck=true;
     }
     else{
      this.emailCheck=false;
     }
  },err=>{
    alert('something went wrong');
  })

}

register(){
  this.DataAdd.firstname = this.signupForm.value.firstname;
          this.DataAdd.lastname = this.signupForm.value.lastname;
          this.DataAdd.email = this.signupForm.value.email;
          this.DataAdd.pass = this.signupForm.value.pass;
           this.DataAdd.retypepass=this.signupForm.value.retypepass;
            this.DataAdd.gender=this.signupForm.value.gender;
          this.DataAdd.phone = this.signupForm.value.phone;
          this.DataAdd.dob=this.signupForm.value.dob;
          this.DataAdd.bussinessname=this.signupForm.value.bussinessname;
          this.DataAdd.gstno=this.signupForm.value.gstno;
          this.DataAdd.role=this.role;
          this.DataAdd.userage=this.userage;
          this.DataAdd.otp=this.otpval;
          console.log(this.DataAdd);
          this.api.createData(this.DataAdd)
          .subscribe((res:any)=>{
            this.router.navigate(['/login'])
            console.log(res);
            alert("Register Sucessfully")
  
            let ref = document.getElementById('cancel')
            ref?.click();
            this.signupForm.reset();
  
  
          },
          )} 


          onCountryChange(event:any)
          {
            this.dialCode =event.dialCode;
          }

          phonevalid()
          {
            var len=(<HTMLInputElement>document.getElementById("phone")).value;
            var len1=this.signupForm.value.phone;
            var totallen=len.length;
            console.log(len);
            console.log(len1);

            console.log(totallen);
            if(this.dialCode == "93" || this.dialCode == "358")
            {
              
            if(totallen<9)
            {
              this.phoneerr=true;
            }
            else{
              this.phoneerr=false;
            }
            }
           else 
          {
            if(totallen<10)
            {
              this.phoneerr1=true;
            }
            else{
              this.phoneerr1=false;
            } 
          }
          
          }
          getNumber(event:any)
 {

 }
telInputObject(event:any)
{

}



        }
    



