import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

 constructor(private http: HttpClient) { }
   
     private apiUrl = `${environment.apiUrl}/api/stripe`;
   
     processStripePayment(userId: number | null, clientType: string) {
       return this.http.post(`${this.apiUrl}/transactions/${userId}/${clientType}`, {userId, clientType});
     }
   
     handleSuccessfulPayment(paymentId: string, userId: number | null) {
       return this.http.post(`${this.apiUrl}/payment-success//${paymentId}/${userId}`,{ paymentId, userId });
     }
}
