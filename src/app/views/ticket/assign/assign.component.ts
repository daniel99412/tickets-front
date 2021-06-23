import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { TicketService } from '../../../services/ticket.service';
import { UserService } from '../../../services/user.service';
import { fuzzyLogic } from '../../../containers/fuzzyLogic';
import * as _ from 'lodash';

@Component({
  selector: 'app-assign-ticket',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit {
  @ViewChild('assignModal', { static: false }) modal: ModalDirective;
  @Input() ticket: any;
  @Input() socket;
  @Output() ticketAssigned = new EventEmitter<any>();

  users: any[];
  auxUsers: any[] = [];
  usersRecomend: any;
  userLogged;
  userSelected: any;
  promiseDate = "";
  porcentaje: any;
  usersFuzzy: any[] = [];

  constructor(
    private userService: UserService,
    private ticketService: TicketService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  show() {
    this.usersRecomend = [];
    this.userLogged = JSON.parse(sessionStorage.getItem('user'));
    this.auxUsers = [];

    this.userService.getBySubcategoryAndStatus(this.ticket.subcategory._id, 'true')
      .pipe(
        tap(users => {
          this.users = users;
          this.users.forEach(user => {
            this.ticketService.getAverage(user._id, this.ticket.subcategory._id)
              .subscribe(resp => {
                this.usersRecomend = [];
                let userFuzzy = {
                  id: user._id,
                  name: user.name,
                  lastName: user.lastname,
                  recomendacion: (fuzzyLogic(resp.quality, resp.attention, resp.speed, resp.totalTickets)) * 100
                }
                if (user._id !== this.userLogged._id) {
                  this.auxUsers.push(userFuzzy);
                }
                this.usersRecomend = _.orderBy(this.auxUsers, 'recomendacion', ['desc']);
              });
          });
        })
      ).subscribe();
    this.modal.show();
  }

  hide() {
    this.userSelected = null;
    this.modal.hide();
  }

  cardAssign(value) {
    if (this.ticket.promiseDate !== '') {
      this.promiseDate = this.ticket.promiseDate;
    }

    this.userSelected = value;

    this.ticketService.assign(this.ticket._id, this.userSelected, this.promiseDate)
      .subscribe(
        resp => {
          this.hide();
          this.ticketAssigned.emit();
          this.socket.emit('status-change');
          this.toastrService.success('Ticket asignado', '¡Éxito!');
        },
        err => {
          this.toastrService.error(err.error.message, '¡Error!');
        }
      );
  }

  autoAssign() {
    if (this.ticket.promiseDate !== '') {
      this.promiseDate = this.ticket.promiseDate;
    }

    this.userSelected = this.usersRecomend[0].id

    this.ticketService.assign(this.ticket._id, this.userSelected, this.promiseDate)
      .subscribe(
        resp => {
          this.hide();
          this.ticketAssigned.emit();
          this.socket.emit('status-change');
          this.toastrService.success('Ticket asignado', '¡Éxito!');
        },
        err => {
          this.toastrService.error(err.error.message, '¡Error!');
        }
      );
  }

  assign() {
    if (this.ticket.promiseDate !== '') {
      this.promiseDate = this.ticket.promiseDate;
    }

    this.ticketService.assign(this.ticket._id, this.userSelected, this.promiseDate)
      .subscribe(
        resp => {
          this.hide();
          this.ticketAssigned.emit();
          this.socket.emit('status-change');
          this.toastrService.success('Ticket asignado', '¡Éxito!');
        },
        err => {
          this.toastrService.error(err.error.message, '¡Error!');
        }
      );
  }
}
