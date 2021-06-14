import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRole } from '../models/userRole';
import { AppSettings } from '../app.settings';

@Injectable({ providedIn: 'root' })
export class UserRoleService {
    token;

    constructor( private httpClient: HttpClient ) {
    }

    setRole(user): Observable<any> {
      return this.httpClient.post<any>(`${AppSettings.API}/user-role/`, user);
    }

    unsetRole(id) {
      return this.httpClient.delete<any>(`${AppSettings.API}/user-role/${id}`);
    }

    getRoles(user): Observable<any> {
        return this.httpClient.get<any>(`${AppSettings.API}/user-role/user/${user}`);
    }
}
