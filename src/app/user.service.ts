import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8082/api/user'; // Adjust based on your API

  constructor(private http: HttpClient) {}

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

  // 6️⃣ Reset Password
  resetPassword(email: string, code: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password/${email}/${code}`, { newPassword }, { headers: this.headers });
  }
}
