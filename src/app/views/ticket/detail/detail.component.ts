import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { TicketService } from '../../../services/ticket.service';
import * as moment from 'moment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  file = new FormControl('');
  ticket: any;
  userLogged;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) { }

  ngOnInit(): void {
    this.userLogged = JSON.parse(sessionStorage.getItem('user'));

    this.ticketService.getById(this.route.snapshot.paramMap.get('id'))
      .pipe(
        tap(ticket => {
          this.ticket = ticket;
          console.log(this.ticket);
        })
      ).subscribe();

    this.file.valueChanges.subscribe(value => {
      console.log(this.file);
    });
  }

  public openFileUpload(): void {
    document.getElementById('fileDetail').click();
  }

  return() {
    this.router.navigate(['/tickets/list']);
  }

  onTicketASsigned(event) {
    this.ticketService.getById(this.route.snapshot.paramMap.get('id'))
      .pipe(
        tap(ticket => {
          this.ticket = ticket;
        })
      ).subscribe();
  }
}
