import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    endpoint = 'http://localhost:3800/api/v1/auth/login';

    constructor( private httpClient: HttpClient ) {}

    login(email: string, password: string): Observable<any> {
        const body = new HttpParams()
        .set('email', email)
        .set('password', password)
        .set('gettoken', 'true');

        return this.httpClient.post(this.endpoint, body.toString(), {
            headers: new HttpHeaders()
            .set('Content-type', 'application/x-www-form-urlencoded')
        });
    }
}
