import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  @Input() ticket: any;
  public color = 'danger';
  public creationDate;

  constructor() { }

  ngOnInit(): void {
    if (this.ticket) {
      this.creationDate = moment(this.ticket.creationDate).locale('es-mx');
      if (this.ticket.progress === 1) {
        this.color = 'warning';
      } else if (this.ticket.progress === 2) {
        this.color = 'danger';
      } else if (this.ticket.progress === 3) {
        this.color = 'primary';
      } else if (this.ticket.progress === 4) {
        this.color = 'success';
      } else {
        this.color = 'danger';
      }
    }
  }

}
