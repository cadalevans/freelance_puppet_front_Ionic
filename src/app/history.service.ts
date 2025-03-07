import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserHistory  } from './home/history';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  private apiUrl = `${environment.apiUrl}/api/history`;


  public getAllHistory(id: number | null): Observable<UserHistory[]> {
    return this.http.get<UserHistory[]>(`${this.apiUrl}/get-all-non-pay-history/${id}`);
  }

  public getHistoryById(id: number): Observable<UserHistory> {
    return this.http.get<UserHistory>(`${this.apiUrl}/history-by-id/${id}`)
  }

}
