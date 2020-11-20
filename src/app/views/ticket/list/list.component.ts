import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  tickets: any;
  myTickets: any;
  ticketsAssignedToMe: any;
  userLogged: any;

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.userLogged = JSON.parse(sessionStorage.getItem('user'));

    this.ticketService.getTicketsByUser(this.userLogged._id)
      .pipe(
        switchMap(resp => {
          this.myTickets = resp;
          return this.ticketService.getTicketsByUser(this.userLogged._id);
        }),
        tap(resp => {
          console.log('aqui toy loco');
          this.ticketsAssignedToMe = resp;
        })
      ).subscribe();
  }

  onTicketCreated(event) {
    this.ticketService.getTicketsByUser(this.userLogged._id)
      .pipe(
        switchMap(resp => {
          this.myTickets = resp;
          return this.ticketService.getTicketsByUser(this.userLogged._id);
        }),
        tap(resp => {
          this.ticketsAssignedToMe = resp;
        })
      ).subscribe();
  }
}
