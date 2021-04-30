import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';

@Injectable({providedIn: 'root'})
export class MessageService {
    constructor(private httpClient: HttpClient) { }
    
    getByTicket(ticket): Observable<any[]> {
        return this.httpClient.get<any[]>(`${AppSettings.API}/message/${ticket}`);
    }

    save(message): Observable<any> {
        return this.httpClient.post<any>(`${AppSettings.API}/message/`, message);
    }
}