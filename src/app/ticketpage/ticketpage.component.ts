import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-ticketpage',
  templateUrl: './ticketpage.component.html',
  styleUrls: ['./ticketpage.component.css']
})
export class TicketpageComponent implements OnInit {

  visible=false;
  mindate:any;
  seatvisble=false;
  thenivis=false;
  mdu2=true;
  mdu1=true;
  hideElement=false;
  stopdetails=false;
  amenitiesvis=false;
  busimagevis=false;
  reststopvis=false;
  reviewvis=false;
  boarddetailArr:any=[];
  rzp1:any;
  lowerseatArr:any=[];
  totaydate:any;
  specialpage=false;
  ticketpage=false;
  searchDetail:any;
  totalBusdetail:any;
  dropdetailArr:any=[];
  amenitiesArr:any=[];
  reviewArr:any=[];
  busstopArr:any=[];
  photoArr:any=[];
  BusName:any;
  lowerArr:any=[];
  upperArr:any=[];
  SeatVal:any;
  userData:any=[];
  BookingArr:any=[];
  saveBusdetails:any=[];
  dropName:any;
  boardName:any;
  seatArr:any=[];
  totalseatArr:any=[];
  bookedSeat:any=[];
  constructor(private auth:AuthService,private api :ApiService) { }

  ngOnInit(): void {
    let busData:any= sessionStorage.getItem('searchDetail');
    this.searchDetail = JSON.parse(busData);
    let totalBus:any=sessionStorage.getItem('Buspage')
    this.totalBusdetail=JSON.parse(totalBus);
    const retrievedUser:any= sessionStorage.getItem('customerpage');
    this.userData = JSON.parse(retrievedUser);
    this.getDate();
  }

  options ={
    "key" :"rzp_test_iXARYdqYTHJtBs",
    "amount":"",
    "currency":"INR",
    "name":"",
    "description":"Test Transaction",
    "image":"https://i.postimg.cc/zXFNsGkg/redbus-white.png",
    "order_id":"",
    "callback_url":"https://eneqd3r9xrjok.x.pipedream.net/",
    "prefill":
    {
      "name":"",
      "email":"",
      "contact":""

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
var toDate:any=date.getDate()+1;
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
var months = ["January", "February", "March", "April", "May", "June", "July", "Aug", "September", "October", "November", "December"];
 var month=months[date.getMonth()]
this.totaydate=toDate + "-" + month
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
  stop(seat:any)
  {
   
    this.SeatVal=seat;
    this.stopdetails=true;
    
  }
  seatvis()
  {
    this.seatvisble=true;
    this.  mdu2=false;

  }
  nexttrip()
  {
    const fromData=(<HTMLInputElement>document.getElementById("from")).value;
    const toData=(<HTMLInputElement>document.getElementById("to")).value;
    const dateData=(<HTMLInputElement>document.getElementById("date")).value;
     const searchValue={
     'From':fromData,
     'To':toData,
     'date':dateData
     }
     sessionStorage.removeItem('searchDetail');
     sessionStorage.setItem('searchDetail', JSON.stringify(searchValue));
    this.api.getBusdetails(fromData,toData,dateData)
.subscribe((res:any)=>
  {
    const busData=res
if(busData)
{
  sessionStorage.removeItem('Buspage');
  sessionStorage.setItem('Buspage', JSON.stringify(busData));
  location.reload();
  }

  })
    this.thenivis=true;
    this.mdu1=false;
    this.mdu2=false;
  }
  pay(name:any,fare:any)
  {
    this.options.amount=fare+"00"
    this.options.name=name
     this.rzp1=new this.auth.nativeWindow.Razorpay(this.options);
     this.rzp1.open();
  }
  amenities(data:any)
  {
    this.amenitiesArr.push(data);
    this.amenitiesvis=true;
    this.specialpage=true;
    this.busimagevis=false;
    this.reststopvis=false;
    this.reviewvis=false;
  }
  busphoto(data:any)
  {
    this.BusName=data.BusName;
    this.photoArr.push(data.Photo
      .split(",")
      .map((item:any)=> ({ photo: item })
    ));
    this.busimagevis=true;
    this.amenitiesvis=false;
    this.reststopvis=false;
    this.reviewvis=false;
    this.specialpage=true;
  }
  reviewpage(data:any)
  {
    this.reviewArr.push(data);
    this.reststopvis=false;
    this.busimagevis=false;
    this.amenitiesvis=false;
    this.reviewvis=true;
    this.specialpage=true;
  }
  reststop(data:any)
  {
    this.busstopArr.push(data);
  this.reststopvis=true;
  this.busimagevis=false;
  this.amenitiesvis=false;
  this.reviewvis=false;
  this.specialpage=true;
  }
  seatpage(data:any)
  {
 let seatdata:any={};
    this.api.getBookedseat(data.BusName).subscribe((res:any)=>
    {
      this.bookedSeat=res;
          for (let i = 0; i < this.bookedSeat.length; i++) {
    
      const passenger = this.bookedSeat[i].seatno;
      // Extract the seat number for each passenger and push it to the 'seatNumbers' array
      this.seatArr.push(passenger);
      let seatdata:any={
        'seat':this.seatArr
      };

      this.totalseatArr.push(seatdata)
     console.log(this.seatArr,"sssssssss");
  }
    

    })

    let seatData:any=[];
    this.ticketpage=true;
    this.savedata(data);
this.api.getbusSeatArrangement(data.BusName)
.subscribe((res:any)=>{
    seatData=res;
  this.lowerArr.push(seatData[0].lowerseat.split(',')
  .map((item:any)=>  ({ drop: item }),)
   );
   this.upperArr.push(seatData[0].upperseat.split(',')
   .map((item:any)=> ({ drop: item }))
    );
 
});
   this.dropdetailArr.push(data.Dropping
   .trim()
  // Replace all occurrences of newline characters and commas with a space
  .replace(/[\r\n,]/g, '')
  // Split the string into an array using space as the delimiter
  .split(' ')
  .map((item:any)=> ({ drop: item })
  ))
  this.boarddetailArr.push(data.Boarding
    .trim()
   // Replace all occurrences of newline characters and commas with a space
   .replace(/[\r\n,]/g, '')
   // Split the string into an array using space as the delimiter
   .split(' ')
   .map((item:any)=> ({ board: item })
   ))
  }
  savedata(data:any)
  {
    this.saveBusdetails.push(data);
  }
  getdrop(name:any)
  {
    this.dropName=name;
  }
  getBoard(name:any)
  {
    this.boardName=name;
  }
  bookDetails()
  {
    let bookingObj={
      "name":this.userData[0].firstname,
      "email":this.userData[0].email,
      "phone":this.userData[0].phone,
      "seatno":this.SeatVal,
      "busname":this.saveBusdetails[0].BusName,
      "fare":this.saveBusdetails[0].SleeperFare,
      "from":this.saveBusdetails[0].From,
      "To":this.saveBusdetails[0].To,
      "Desc":this.saveBusdetails[0].Description,
      "DeptDate":this.saveBusdetails[0].DepartureTime,
      "ArrTime":this.saveBusdetails[0].ArrivalTime,
      "gender":this.userData[0].gender,
      "payment":"Done"
    }
   this.BookingArr.push(bookingObj);
   this.api.postBookingdetails(bookingObj)
   .subscribe((res:any)=>
   {
    
   })
  }
  // Inside your component class

// Inside your component class
isMatching: boolean = false;

getSleeper(from:any,to:any)
{
  const type='Sleeper'
  this.api.getFIlter(type,from,to).subscribe((res)=>
  {
    console.log(res,"res");
    if(res)
    {
      sessionStorage.removeItem('Buspage');
  sessionStorage.setItem('Buspage', JSON.stringify(res));
  location.reload();
    }
  })
}
getAcfilter(from:any,to:any)
{
  const type='Yes'
  this.api.getACFIlter(type,from,to).subscribe((res)=>
  {
    console.log(res,"res");
    if(res)
    {
      sessionStorage.removeItem('Buspage');
  sessionStorage.setItem('Buspage', JSON.stringify(res));
  location.reload();
    }
  })
  
}
getNonAcfilter(from:any,to:any)
  {
    const type='NO'
    this.api.getNonACFIlter(type,from,to).subscribe((res)=>
    {
      console.log(res,"res");
      if(res)
      {
        sessionStorage.removeItem('Buspage');
    sessionStorage.setItem('Buspage', JSON.stringify(res));
    location.reload();
      }
    })
  }

}
