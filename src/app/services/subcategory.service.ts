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

  getByCategoryAndStatus(category, status): Observable<any> {
    return this.httpClient.get<any>(`${AppSettings.API}/subcategory/category/${category}/status/${status}`);
  }

  getById(id): Observable<any> {
    return this.httpClient.get<any>(`${AppSettings.API}/subcategory/${id}`);
  }

  save(subcategory: Subcategory): Observable<any> {
    return this.httpClient.post<any>(`${AppSettings.API}/subcategory/`, subcategory);
  }

  update(id, subcategory): Observable<any> {
      return this.httpClient.put<any>(`${AppSettings.API}/subcategory/${id}`, subcategory);
  }

  changeStatus(subcategory, status): Observable<any> {
    return this.httpClient.delete<any>(`${AppSettings.API}/subcategory/${subcategory}/status/${status}`);
  }
}
