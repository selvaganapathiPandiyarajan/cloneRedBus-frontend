import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  public loginForm !: FormGroup;

  constructor(private form: FormBuilder, private router: Router, private http: HttpClient,private api :ApiService){ 
    this.loginForm = this.form.group({
      'email': ['',Validators.compose([Validators.required])],
      'password': ['',Validators.compose([Validators.required])]
    })
  }

  ngOnInit(): void {
  }
  login() {
    console.log("inside data");
    
    if (this.loginForm.invalid) {
      alert('Please enter details');
      return;
    }
  
    this.api.getLogin(this.loginForm.value.email,this.loginForm.value.password)
      .subscribe((res: any) => {
        // Assuming the response is an object containing user data
        const user = res;
        console.log(user,"user")
        if(user.length ==0) {
          alert('Invalid email or password');
        }
        else if (user && user[0]?.email === this.loginForm.value.email && user[0]?.pass === this.loginForm.value.password) {
            sessionStorage.setItem('customerpage', JSON.stringify(user));
            alert('Login success');
            this.router.navigate(['/home']);
          this.loginForm.reset();
        } 
      }, error => {
        console.error('Login failed:', error);
        alert('Login failed. Please try again.');
      });
  }
  
}
