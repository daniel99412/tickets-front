import { Component, OnDestroy, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { TicketService } from '../../../services/ticket.service';
import * as io from 'socket.io-client';
import { EvaluationService } from '../../../services/evaluation.service';
import { AppSettings } from '../../../app.settings';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  tickets: any;
  myTickets: any;
  ticketsAssignedToMe: any;
  userLogged: any;
  socket: any;
  socketUrl = AppSettings.SOCKETURL;

  constructor(private ticketService: TicketService) { }

  ngOnDestroy(): void {
    this.socket.emit('leave');
  }

  ngOnInit(): void {
    this.userLogged = JSON.parse(sessionStorage.getItem('user'));
    this.socket = io.connect(this.socketUrl);
    
    this.socket.on('created', (data) => {
      if (data) {
        this.refresh();
      }
    });

    this.socket.on('status-changed', (data) => {
      if (data) {
        this.refresh();
      }
    });


    this.refresh();
  }

  onTicketCreated(event) {
    this.refresh();
  }

  refresh() {
    this.ticketService.getTicketsByUser(this.userLogged._id)
      .pipe(
        switchMap(resp => {
          this.myTickets = resp;
          return this.ticketService.getAssignedTickets(this.userLogged._id);
        }),
        tap(resp => {
          this.ticketsAssignedToMe = resp;
        })
      ).subscribe();
  }
}
