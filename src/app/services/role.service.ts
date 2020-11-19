import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/role';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor( private httpClient: HttpClient ) { }

  save(role: Role): Observable<any> {
    return this.httpClient.post<any>(`${AppSettings.API}/role/`, role);
  }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(`${AppSettings.API}/role/`);
  }

  getById(id: string): Observable<Role> {
    return this.httpClient.get<Role>(`${AppSettings.API}/role/${id}`);
  }

  update(id: string, role: Role): Observable<Role> {
    return this.httpClient.put<Role>(`${AppSettings.API}/role/${id}`, role);
  }
}
