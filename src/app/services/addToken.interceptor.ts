import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = sessionStorage.getItem('token');

        if (!token) {
            return next.handle(req);
        }

        const headers = req.clone({
            headers: req.headers.set('Authorization', token)
        });

        return next.handle(headers);
    }

    isAccessDeniedHttpError(err: HttpErrorResponse): boolean {
        return err.status === 403 && err.error.message === 'Acceso denegado';
    }
}
