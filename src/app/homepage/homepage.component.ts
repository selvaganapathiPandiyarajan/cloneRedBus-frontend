import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FilterPipe } from '../filter.pipe';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  names:any;
  todayDate:any;
  userData:any;
  queryString: string ="";
  keyword = 'name';
  mindate:any;
  fromValue:any;
  toValue:any;
  public countries = [
    {
      id: 1,
      name: '    Madurai',
    

    },
    {
      id: 2,
      name: '   Chennai',
    },
    {
      id: 3,
      name: '   Theni',
    },
    {
      id: 4,
      name: '   Trichy',
    },
    {
      id: 5,
      name: '   CumBum',
    },
    {
      id: 6,
      name: 'Ukraine',
    },
    {
      id: 7,
      name: 'Macedonia',
    },
    {
      id: 8,
      name: 'Slovenia',
    },
    {
      id: 9,
      name: 'Georgia',
    },
    {
      id: 10,
      name: 'India',
    },
    {
      id: 11,
      name: 'Russia',
    },
    {
      id: 12,
      name: 'Switzerland',
    }
  ];
   
  constructor(private api :ApiService,private router: Router) {

   }
 
   
  ngOnInit(): void {
 this.getDate();
 const retrievedUser:any= sessionStorage.getItem('customerpage');
  this.userData = JSON.parse(retrievedUser);

 // Parse the retrieved string back to an object
 // Now 'retrievedUser' contains   }
 console.log(this.userData,"data");
  }
  selectEvent(selectedItemName: string) {
    this.fromValue=selectedItemName.trim();

  }
  selectEventone(selectedItemName: string)
  {
  this.toValue=selectedItemName.trim();
  console.log(this.toValue,"tiooo");
  }
  getBusdata()
  {
let dateEntry=(<HTMLInputElement>document.getElementById("dateValue"))?.value;
console.log(dateEntry,"data");
const searchDetail=
{
  'From':this.fromValue,
  'To':this.toValue,
  'date':dateEntry

}
console.log(searchDetail);
sessionStorage.setItem('searchDetail', JSON.stringify(searchDetail));
this.api.getBusdetails(this.fromValue,this.toValue,dateEntry)
.subscribe((res:any)=>
  {
    const busData=res
    console.log(busData,"busData");
    sessionStorage.setItem('Buspage', JSON.stringify(busData));
    this.router.navigate(['/ticket']);

  })
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
 

onChangeSearch(search: string) {
  // fetch remote data from here
  console.log("my search",search);
  // And reassign the 'data' which is binded to 'data' property.
}

onFocused(e:any) {
  // do something
}
}
