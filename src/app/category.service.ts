import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartResponse } from './card/cart.models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 constructor(private http: HttpClient) { }
 
   private cartCount = new BehaviorSubject<number>(0);
 
   private apiUrl = `${environment.apiUrl}/api/category`;
 
     // 🔹 Common Headers
     private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
 
   public getCardHistory(id: number | null): Observable<CartResponse>{
     return this.http.get<CartResponse>(`${this.apiUrl}/history-by-userCard/${id}`)
   }

   getAllCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAllCategory`);
  }
  
  getHistoriesByCategory(categoryName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/categoryName/${categoryName}/histories`);
  }


  getHistoriesByCategoryNamePeruser(categoryName: string, userId: number|null): Observable<any> {
    return this.http.get(`${this.apiUrl}/histories/by-categoryName/${userId}/${categoryName}`);
  }
}
