import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { TicketService } from '../../../services/ticket.service';
import { UserService } from '../../../services/user.service';

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
  userLogged;
  userSelected: any;
  promiseDate = "";

  constructor(
    private userService: UserService,
    private ticketService: TicketService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  show() {
    console.log(this.ticket);
    this.userLogged = JSON.parse(sessionStorage.getItem('user'));

    this.userService.getBySubcategoryAndStatus(this.ticket.subcategory._id, 'true')
      .pipe(
        tap(users => {
          this.users = users;
        })
      ).subscribe();

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
