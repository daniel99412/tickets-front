import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';

@Injectable({providedIn: 'root'})
export class FileService {
    
    constructor(private httpClient: HttpClient) { }
    
    save(ticketId, file): Observable<any> {
        let formData: FormData = new FormData();
        formData.append('image', file);

        return this.httpClient.post<any>(`${AppSettings.API}/file/ticket/${ticketId}`, formData);
    }

    getImage(fileName): Observable<any> {
        return this.httpClient.get<any>(`${AppSettings.API}/file/picture/${fileName}`);
    }
}
