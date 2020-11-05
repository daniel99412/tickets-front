import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Subcategory } from '../models/subcategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor( private httpClient: HttpClient ) { }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(`${AppSettings.API}/subcategory/`);
  }

  getByCategory(category): Observable<any> {
    return this.httpClient.get<any>(`${AppSettings.API}/subcategory/category/${category}`);
  }

  save(subcategory: Subcategory): Observable<any> {
    return this.httpClient.post<any>(`${AppSettings.API}/subcategory/`, subcategory);
  }
}
