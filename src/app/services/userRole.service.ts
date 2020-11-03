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

    setRole() {
    }

    unsetRole() {
    }

    getRoles(user): Observable<UserRole[]> {
        return this.httpClient.get<UserRole[]>(`${AppSettings.API}/user-role/user/${user}`);
    }
}
