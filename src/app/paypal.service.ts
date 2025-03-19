import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

   constructor(private http: HttpClient) { }
  
    private apiUrl = `${environment.apiUrl}/api/paypal`;
  
    createPayment(userId: number | null) {
      return this.http.post(`${this.apiUrl}/create-payment/${userId}`, {userId});
    }
  
    executePayment(paymentId: string, payerId: string, token: string, userId: number | null) {
      return this.http.post(`${this.apiUrl}/success`,{ paymentId, payerId, token, userId });
    }
  
}
