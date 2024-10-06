import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-busticket',
  templateUrl: './busticket.component.html',
  styleUrls: ['./busticket.component.css']
})
export class BusticketComponent implements OnInit {
  visible=false;
  mindate:any;
  seatvisble=false;
  thenivis=false;
  mdu2=true;
  mdu1=true;
  rzp1:any;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.getDate();
  }
  options ={
    "key" :"rzp_test_iXARYdqYTHJtBs",
    "amount":"",
    "currency":"INR",
    "name":"Red Bus",
    "description":"Test Transaction",
    "image":"https://i.postimg.cc/zXFNsGkg/redbus-white.png",
    "order_id":"",
    "callback_url":"https://eneqd3r9xrjok.x.pipedream.net/",
    "prefill":
    {
      "name":"selva",
      "email":"selvapandiyarajan2106@gmail.com",
      "contact":8190086456

    },
    "notes":{
      "address":"Razorpay corporate Office"
    },
    "theme":
    {
"color":"#e6545b"
    }
  };
  verfify()
  {
    this.visible=true;
  }
  getDate()
  {
var date:any= new Date();
console.log(date);
var toDate:any=date.getDate();
if(toDate<10)
{
  toDate="0"+toDate;
}
var toMonth=date.getMonth()+1;
if(toMonth<10)
{
  toMonth="0"+toMonth;

}
var toyear=date.getFullYear();

this.mindate=toyear+ "-" + toMonth + "-" + toDate;

  }

  change()
  {
    var from = <HTMLInputElement>document.getElementById('from');
    var fromval=from.value;
    var to =(<HTMLInputElement>document.getElementById('to'));
    var toval=to.value;

    from.value=toval;
    to.value=fromval;




  }
  seatvis()
  {
    this.seatvisble=true;
    this.  mdu2=false;

  }
  nexttrip()
  {
    this.thenivis=true;
    this.mdu1=false;
    this.mdu2=false;
  }
  pay()
  {
    this.options.amount="80000"
     this.rzp1=new this.auth.nativeWindow.Razorpay(this.options);
     this.rzp1.open();
  }
}
