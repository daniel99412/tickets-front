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
  usersFuzzy = [
    {id: 1, nombre: 'Carlos', apellido: 'Perez',calidad:100, atencion: 100, velocidad: 100, noTickets: 10},
    {id: 2, nombre: 'Juan', apellido: 'Jimenez',calidad:90, atencion: 100, velocidad: 30, noTickets: 10},
    {id: 3, nombre: 'Gerardo', apellido: 'Sanchez',calidad:50, atencion: 90, velocidad: 20, noTickets: 10},
    {id: 4, nombre: 'Diego', apellido: 'Cornejo',calidad:70, atencion: 100, velocidad: 90, noTickets: 10},
    {id: 5, nombre: 'Pardo', apellido: 'Andrade',calidad:78.8, atencion: 100, velocidad: 100, noTickets: 10},
    {id: 6, nombre: 'Hector', apellido: 'Ludueña',calidad:56.3, atencion: 100, velocidad: 80, noTickets: 10},
    {id: 7, nombre: 'Andres', apellido: 'Rodriguez',calidad:80, atencion: 80, velocidad: 100, noTickets: 10},
    {id: 8, nombre: 'Esteban', apellido: 'Marquez',calidad:10, atencion: 10, velocidad: 10, noTickets: 51}
  ];

  constructor(
    private userService: UserService,
    private ticketService: TicketService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  show() {
    this.usersRecomend = [];
    console.log(this.ticket);
    this.userLogged = JSON.parse(sessionStorage.getItem('user'));

    this.userService.getBySubcategoryAndStatus(this.ticket.subcategory._id, 'true')
      .pipe(
        tap(users => {
          this.users = users;
        })
      ).subscribe();
      for(let x = 0; x < this.usersFuzzy.length; x++){
        let user = {
          id: this.usersFuzzy[x].id,
          name: this.usersFuzzy[x].nombre,
          lastName: this.usersFuzzy[x].apellido,
          recomendacion: (fuzzyLogic(this.usersFuzzy[x].calidad, this.usersFuzzy[x].atencion, this.usersFuzzy[x].velocidad, this.usersFuzzy[x].noTickets))*100
        }
        this.auxUsers.push(user);
      }
      this.usersRecomend = _.orderBy(this.auxUsers, 'recomendacion', ['desc']);
      console.log(this.usersRecomend);
    this.modal.show();
  }

  hide() {
    this.userSelected = null;
    this.modal.hide();
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
