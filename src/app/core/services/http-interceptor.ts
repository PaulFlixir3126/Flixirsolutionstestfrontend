import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, BehaviorSubject, of } from "rxjs";
import { catchError, filter, take, switchMap } from "rxjs/operators";



@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  private AUTH_HEADER = "token";
  private token = "secrettoken";


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
      });
    }

    if (localStorage["token"]) {
      const modified = req.clone({
        setHeaders: { "token": localStorage["token"] }
      });
      return next.handle(modified);
    }
    else {
      return next.handle(req);
    }



   
  }



}
