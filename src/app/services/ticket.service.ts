import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

const APIUrl = "http://127.0.0.1:5000";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http:HttpClient) { }

  getTicket(id:any):Observable<any>{
    return this.http.get<any[]>(APIUrl+`/tickets/${id}`);
  }

  getTicketList():Observable<any>{
    return this.http.get<any[]>(APIUrl + '/tickets');
  }

  addTicket(val:any): Observable<any>{
    return this.http.post(APIUrl + '/tickets/add',val);
  }

  updateTicket(val:any): Observable<any>{
    return this.http.put(APIUrl + '/tickets/update',val);
  }

  deleteTicket(val:any): Observable<any>{
    return this.http.delete(APIUrl + '/tickets/delete',val);
  }

  getAgency(val:any):Observable<any>{
    return this.http.get<any[]>(APIUrl + '/agency/',val);
  }
}


export class searchAgency{
  constructor (private httpService: HttpClient) { }  

    search(term:any) {
        var listOfAgency = this.httpService.get(APIUrl+'/agency/'+ term)
        .pipe(
            debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
            map(
                (data: any) => {
                    return (
                        data.length != 0 ? data as any[] : [{"Agency": "No Record Found"} as any]
                    );
                }
        ));

        return listOfAgency;  
    }  
}