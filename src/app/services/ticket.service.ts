import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor( private httpClient: HttpClient ) { }

  save(ticket: Ticket): Observable<any> {
    const ticketToSend = {
      createdBy: ticket.createdBy.id,
      reportedFrom: ticket.reportedFrom,
      description: ticket.description,
      category: ticket.category,
      subcategory: ticket.subcategory,
      creationDate: ticket.creationDate,
      priority: ticket.priority
    };

    return this.httpClient.post<any>(`${AppSettings.API}/ticket/`, ticketToSend);
  }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(`${AppSettings.API}/ticket/`);
  }

  getTicketsByUser(userId): Observable<any> {
    return this.httpClient.get<any>(`${AppSettings.API}/ticket/user/${userId}`);
  }

  getById(id): Observable<any> {
    return this.httpClient.get<any>(`${AppSettings.API}/ticket/${id}`);
  }

  assign(ticket, user, promiseDate): Observable<any> {
    const body = {
      promiseDate: promiseDate
    };

    return this.httpClient.put(`${AppSettings.API}/ticket/${ticket}/user/${user}`, body);
  }

  getAssignedTickets(userId): Observable<any> {
    return this.httpClient.get<any>(`${AppSettings.API}/ticket/assigned-to/${userId}`);
  }
}
