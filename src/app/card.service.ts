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


// BehaviorSubject that stores whether the cart has been updated
private cartUpdated = new BehaviorSubject<boolean>(false);
  
// Expose it as an Observable so other components can subscribe
cartUpdated$ = this.cartUpdated.asObservable();

  // Notify all subscribers that the cart has been updated
  // Method to trigger cart update notification
  notifyCartUpdate(): void {
    this.cartUpdated.next(true); // This sends the signal to other components
    this.refreshCart();
  }

  private cartSubject = new BehaviorSubject<CartResponse | null>(null);

  // Method to refresh cart data

  refreshCart() {
    const userId = localStorage.getItem('userId');// just get the userId 
    if (userId) {
      this.getCardHistory(+userId).subscribe(cartData => {
        const count = cartData?.histories.length || 0;
        this.cartCount.next(count); // update BehaviorSubject
      })
    }
  }

  // Add mutiple history to card 

  addMultipleHistoriesToCard(userId: number | null, historyIds: number[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart/add-multiple`, {
      userId,
      historyIds
    });
  }
  

}


