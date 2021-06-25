import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    url;
    
    constructor( private httpClient: HttpClient ) {
        this.url = AppSettings.API;
    }

    login(email: string, password: string): Observable<any> {
        const body = new HttpParams()
        .set('email', email)
        .set('password', password)
        .set('gettoken', 'true');

        return this.httpClient.post(`${this.url}/auth/login`, body.toString(), {
            headers: new HttpHeaders()
            .set('Content-type', 'application/x-www-form-urlencoded')
        });
    }
}
