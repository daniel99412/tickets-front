import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { BranchOffice } from '../models/branchOffice';

@Injectable({
    providedIn: 'root'
})
export class BranchOfficeService {

    constructor( private httpClient: HttpClient ) {}

    save(branchOffice: BranchOffice): Observable<any> {
        return this.httpClient.post<any>(`${AppSettings.API}/branch-office/`, branchOffice);
    }

    getAll(): Observable<any> {
        return this.httpClient.get<any>(`${AppSettings.API}/branch-office/`);
    }

    getById(id): Observable<any> {
        return this.httpClient.get<any>(`${AppSettings.API}/branch-office/${id}`);
    }

    changeStatus(id, status): Observable<any> {
        return this.httpClient.delete<any>(`${AppSettings.API}/branch-office/${id}/status/${status}`);
    }
}
