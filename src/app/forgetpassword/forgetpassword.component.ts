import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,FormBuilder, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  public forgetform !: FormGroup;
  public phoneform !: FormGroup;
public phonecheck=false;
public incorrectotp=false;
public incorrectotp1=false;
public emailcheck=false;
public smsform=false;
public emailform=false;
public forget=true;
public otpformvisible=false;
otpformvisible1=false;
public otpform!:FormGroup;
public otpform1!:FormGroup
public user:any;
public user2:any;
public user3:any;
  constructor(private form: FormBuilder,private http: HttpClient,private phone:FormBuilder,private otp:FormBuilder,private otp1:FormBuilder) { 
    this.forgetform = this.form.group({
      'email': ['',Validators.compose([Validators.required])],
    })
    this.phoneform = this.phone.group({
      'phone': ['',Validators.compose([Validators.required])],
    })
    this.otpform=this.otp.group({
      'otpval': ['',Validators.compose([Validators.required,])],
      
      
      })
      this.otpform1=this.otp1.group({
        'otpval1': ['',Validators.compose([Validators.required,])],
        
        
        })
  }

  ngOnInit(): void {

  }
  email(){
    this.forget=false;
    this.emailform=true;
    this.smsform=false;
    this.otpformvisible=false;
    this.otpformvisible1=false;

  }
  sms(){
    this.forget=false;
    this.otpformvisible=false;
    this.emailform=false;
    this.smsform=true;
    this.otpformvisible1=false;


  }
  checkEmail(){
    
    this.http.get<any>('http://localhost:3000/signuser?email='+this.forgetform.value.email)
    .subscribe(res=>{
      var check = res.find((a:any)=>{
        return a.email === this.forgetform.value.email 
      });
      if(!check){
        this.emailcheck=true;
       }
       else{
        this.emailcheck=false;
       }
    },err=>{
      alert('something went wrong');
    })

}

checkphone()
{
  this.http.get<any>('http://localhost:3000/signuser?phone='+this.phoneform.value.phone)
  .subscribe(res=>{
    var check = res.find((a:any)=>{
      return a.phone === this.phoneform.value.phone 
    });
    if(!check){
      this.phonecheck=true;
     }
     else{
      this.phonecheck=false;
     }
  },err=>{
    alert('something went wrong');
  })
}
correctotp()
  {
if(this.otpform.value.otpval != this.user2.otp)
{

  this.incorrectotp=true;
}
else{
  this.incorrectotp=false;

}
  }
  correctotp1()
  {
if(this.otpform1.value.otpval1 != this.user3.otp)
{

  this.incorrectotp1=true;
}
else{
  this.incorrectotp1=false;

}
  }
  getotp()
  {
    this.forget=false;
    this.otpformvisible=false;
    this.emailform=false;
    this.smsform=false;   
    this.otpformvisible=true;
    this.otpformvisible1=false;
    this.http.get<any>('http://localhost:3000/signuser?email=' +this.forgetform.value.email)
  .subscribe(res=>{
    var check = res.find((b:any)=>{
      return b.email === this.forgetform.value.email
    });
    if(check){
      sessionStorage.setItem('userpage',JSON.stringify(check));
      this.user2 = check;
      this.sendmail(this.user2);

    }else{
      alert('user not found');
    }
  })

  }
  getotp1()
  {
    this.forget=false;
    this.otpformvisible=false;
    this.emailform=false;
    this.smsform=false;   
    this.otpformvisible=false;
    this.otpformvisible1=true;
    this.http.get<any>('http://localhost:3000/signuser?phone=' +this.phoneform.value.phone)
  .subscribe(res=>{
    var check = res.find((b:any)=>{
      return b.phone === this.phoneform.value.phone
    });
    if(check){
      sessionStorage.setItem('userpage1',JSON.stringify(check));
      this.user3 = check;
      console.log("my check",check);
    }else{
      alert('user not found');
    }
  })
  }
  sendmail(data:any){
    console.log("the value is ", data);
    var params ={
      from_name:this.user2.email,
      to_name:this.user2.otp,
    }
    console.log(params);
  emailjs.send("service_8is22vj","template_mv6ky91",params,'whhBfmu0GsgMM1n9O').then(function (res)
  {
  alert("We have sent OTP to Your Register Email Id ");
  })
  
  }
}