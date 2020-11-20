import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(private httpClient: HttpClient) { }

  save(evaluation): Observable<any> {
    return this.httpClient.post<any>(`${AppSettings.API}/evaluation/`, evaluation);
  }

  getByTicket(ticket): Observable<any> {
    return this.httpClient.get<any>(`${AppSettings.API}/evaluation/ticket/${ticket}`);
  }
}
