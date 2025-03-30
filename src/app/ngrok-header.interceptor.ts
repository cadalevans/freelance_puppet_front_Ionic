import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class NgrokHeaderInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request and add the ngrok-skip-browser-warning header
    const modifiedRequest = req.clone({
      setHeaders: {
        'ngrok-skip-browser-warning': 'true'
      }
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedRequest);
  }
}
