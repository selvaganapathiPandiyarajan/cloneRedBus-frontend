import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ Observable } from 'rxjs'



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}
  apiUrl = 'http://localhost:2000/user';

  createData(data:any):Observable<any>{

    return this.http.post(`${this.apiUrl}`,data);
  }
  getEmail(email:any):Observable<any>
{
  let emailId =email;
return this.http.get(`${this.apiUrl}/${emailId}`);
}
getPhone(phone:any):Observable<any>{
  const phoneId=phone;
  const phoneApiUrl = 'http://localhost:2000/user/phone';
  return this.http.get(`${phoneApiUrl}/${phoneId}`);
}
getLogin(email:any,pass:any)
{
  const loginUrl='http://localhost:2000/login';
  const emailId=email;
  const passId=pass;
  return this.http.get(`${loginUrl}/${emailId}/${passId}`);
}
getbusSeatArrangement(busname:any)
{
  const busUrl='http://localhost:2000/seat';
  const BusName=busname;
  return this.http.get(`${busUrl}/${BusName}`);
}
getBusdetails(From:any,To:any,Date:any)
{
  const busUrl='http://localhost:2000/busdetails';
  const Fromdate=From;
  const Todate=To;
  const Datebus=Date;
  return this.http.get(`${busUrl}/${Fromdate}/${Todate}/${Datebus}`);
}
postBookingdetails(data:any):Observable<any>{
const bookUrl='http://localhost:2000/bookDetails';
  return this.http.post(`${bookUrl}`,data);
}
getBookedseat(busname:any)
{
  const seatUrl='http://localhost:2000/bookseat';
  const busName=busname;
  return this.http.get(`${seatUrl}/${busName}`);
}
getFIlter(type:any,from:any,to:any)
{
  const filterUrl='http://localhost:2000/busfilter';
  const From=from;
  const Type=type;
  const To=to;
  return this.http.get(`${filterUrl}/${Type}/${from}/${To}`);
}
getACFIlter(type:any,from:any,to:any)
{
  const filterAcUrl='http://localhost:2000/busAcfilter';
  const From=from;
  const Type=type;
  const To=to;
  return this.http.get(`${filterAcUrl}/${Type}/${from}/${To}`);
}
getNonACFIlter(type:any,from:any,to:any)
{
  const filterNonAcUrl='http://localhost:2000/busNonAcfilter';
  const From=from;
  const Type=type;
  const To=to;
  return this.http.get(`${filterNonAcUrl}/${Type}/${from}/${To}`);
}
}