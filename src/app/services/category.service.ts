import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private httpClient: HttpClient ) {}

  save(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(`${AppSettings.API}/category/`, category);
  }

  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${AppSettings.API}/category/`);
  }

  getById(id): Observable<Category> {
    return this.httpClient.get<Category>(`${AppSettings.API}/category/${id}`);
  }

  delete(id): Observable<any> {
    return this.httpClient.delete<any>(`${AppSettings.API}/category/${id}`);
  }
}
