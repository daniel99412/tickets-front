import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { User } from '../models/user';

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private httpClient: HttpClient) { }

    public save(user: User): Observable<any> {
        return this.httpClient.post(`${AppSettings.API}/user/`, user);
    }

    public changePassword(id, password): Observable<any> {
        const passwordBody = {
            'password': password
        };

        return this.httpClient.put(`${AppSettings.API}/user/reset/${id}`, passwordBody);
    }

    public update(id, user): Observable<any> {
      return this.httpClient.put(`${AppSettings.API}/user/${id}`, user);
    }

    public getAll(): Observable<any> {
        return this.httpClient.get(`${AppSettings.API}/user/`);
    }

    public getById(id): Observable<any> {
        return this.httpClient.get(`${AppSettings.API}/user/${id}`);
    }

    public getBySubcategoryAndStatus(subcategory, status): Observable<any> {
        return this.httpClient.get(`${AppSettings.API}/user/subcategory/${subcategory}/active/${status}`);
    }

    public changeStatus(userId, status): Observable<any> {
        return this.httpClient.delete(`${AppSettings.API}/user/${userId}/status/${status}`);
    }
}
