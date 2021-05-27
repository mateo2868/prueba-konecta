import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  token = '';
  constructor(public router: Router,) { }



    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        //handle your auth error or rethrow
        if (err.status === 401 || err.status === 403) {
            this.router.navigateByUrl(`/`);
            return of(err.message);
        }
        return throwError(err);
    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        this.token = localStorage.getItem('access_token');
        if (this.token) {
            request = request.clone({
              setHeaders: {
                Authorization: `bearer ${this.token}`
              }
            });
        }

        const authReq = request.clone({
            headers: request.headers.set('Accept', 'application/json')
        });
      
        return next.handle(authReq).pipe(catchError(x=> this.handleAuthError(x)));

    }

}