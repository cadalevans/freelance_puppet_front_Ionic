import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserHistory } from './home/history';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userEmail: string | null = null;


  private apiUrl = `${environment.apiUrl}/api/user`;

  

  constructor(private http: HttpClient) {

     // Load email from localStorage when service is created
     this.userEmail = localStorage.getItem('userEmail');
    
  }


  setEmail(email: string) {
    this.userEmail = email;
    localStorage.setItem('userEmail', email); // ✅ Store email in localStorage
  }

  getEmail(): string | null {
    return this.userEmail || localStorage.getItem('userEmail'); // ✅ Retrieve from memory or localStorage
  }

  clearEmail() {
    this.userEmail = null;
    localStorage.removeItem('userEmail'); // ✅ Remove from localStorage
  }


  // 🔹 Common Headers
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData, { headers: this.headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'An unknown error occurred!';
          
          if (error.status === 400) {
            errorMessage = error.error.message || 'Email already exists';
          }
  
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  getAllUserHistory(userId: number | null): Observable<UserHistory[]>{
    return this.http.get<UserHistory[]>(`${userId}/histories`);
  }
   

  // 2️⃣ Resend Verification Email
  resendVerificationEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/resend-verification/${email}`, {}, { headers: this.headers });
  }

  // 3️⃣ Verify User Email
  verifyUser(email: string, code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify/${email}/${code}`, {}, { headers: this.headers });
  }

  // 4️⃣ Request Password Reset
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password/${email}`, {}, { headers: this.headers });
  }

  // 5️⃣ Resend Password Reset Email
  resendPasswordResetEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/resend-password-reset/${email}`, {}, { headers: this.headers });
  }

 // if the backend expect a request body 
 /* resetPassword(email: string, code: string, password: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/reset-password/${email}/${code}`, 
      { newPassword: password },  // ✅ Send password in the request body
      { headers: this.headers }
    );
  }
    */

  // if the backend expect a requestParam
  // 6️⃣ Reset Password
  resetPassword(email: string, code: string, password: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/reset-password/${email}/${code}?newPassword=${password}`,  // ✅ Pass password as request param
      {},
      { headers: this.headers }
    );
  }

  // Login

  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }

  getUserIdByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/id-by-email/${email}`)
  }

  // verify if the user account is verified

  isVerified(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/is-verified/${email}`);
  }

  private userIdKey = 'user_id';

  setUserId(userId: number): void {
    localStorage.setItem(this.userIdKey, userId.toString());
  }
  
  getUserId(): number | null {
    const storedUserId = localStorage.getItem(this.userIdKey);
    return storedUserId ? parseInt(storedUserId, 10) : null;
  }
  
}
