import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartResponse } from './card/cart.models';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  private cartCount = new BehaviorSubject<number>(0);

  private apiUrl = `${environment.apiUrl}/api/card`;

    // 🔹 Common Headers
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  public getCardHistory(id: number | null): Observable<CartResponse>{
    return this.http.get<CartResponse>(`${this.apiUrl}/history-by-userCard/${id}`)
  }

  public addHistoryToCard(userId:number | null, historyId:number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-card/${userId}/${historyId}`,{}, { headers: this.headers })
  }

  public removeHistoryToCard(userId:number | null, historyId:number): Observable<any> {
    return this.http.post(`${this.apiUrl}/delete-card/${userId}/${historyId}`,{}, { headers: this.headers })
  }

  // Method to trigger cart count updates
  updateCartCount(count: number) {
    this.cartCount.next(count);
  }
    
    // Observable to listen for changes
  getCartCount(): Observable<number> {
    return this.cartCount.asObservable();
  }

}


