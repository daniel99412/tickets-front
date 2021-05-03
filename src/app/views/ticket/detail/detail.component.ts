import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { TicketService } from '../../../services/ticket.service';
import { ToastrService } from 'ngx-toastr';
import { EvaluationService } from '../../../services/evaluation.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  file = new FormControl('');
  ticket: any;
  userLogged;
  evaluations: any;
  socket;
  promiseDate;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private toastrService: ToastrService,
    private evaluationService: EvaluationService
  ) { }

  ngOnInit(): void {
    this.socket = io.connect('http://localhost:3800');

    this.userLogged = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.userLogged);

    this.socket.on('status-changed', (data) => {
      if (data) {
        this.refresh();
      }
    });

    this.refresh();

    this.file.valueChanges.subscribe(value => {
      // console.log(this.file);
    });
  }

  refresh() {
    this.ticketService.getById(this.route.snapshot.paramMap.get('id'))
      .pipe(
        switchMap(ticket => {
          this.ticket = ticket;
          console.log(this.ticket);
          return this.evaluationService.getByTicket(this.route.snapshot.paramMap.get('id'));
        }),
        tap(evaluations => {
          // console.log(evaluations);
          this.evaluations = evaluations;
        })
      ).subscribe();
  }

  public openFileUpload(): void {
    document.getElementById('fileDetail').click();
  }

  return() {
    this.router.navigate(['/tickets/list']);
  }

  onTicketAssigned(event) {
    this.ticketService.getById(this.route.snapshot.paramMap.get('id'))
      .pipe(
        tap(ticket => {
          this.ticket = ticket;
        })
      ).subscribe();
  }

  changeProgress(progress) {
    if(progress === 3) {
      if (this.promiseDate === '' || !this.promiseDate) {
        this.toastrService.error('Ingresa la fecha compromiso', '¡Error!');
      } else {
        console.log(this.promiseDate);
        console.log(this.ticket);
        this.ticketService.assign(this.ticket._id, this.ticket.assignedTo[0]._id, this.promiseDate)
          .pipe(
            tap(ticket => {
              this.ticket = ticket;
              console.log('promiseDate', this.ticket);

              this.ticketService.changeProgress(this.ticket._id, progress)
                .subscribe(resp => {
                  this.ticketService.getById(this.route.snapshot.paramMap.get('id'))
                  .pipe(
                    tap(ticket => {
                        this.socket.emit('status-change');
                        this.toastrService.success(resp.message, '¡Éxito!');
                        this.ticket = ticket;
                      })
                    ).subscribe();
                }, err => {
                  this.toastrService.error(err.error.message, '¡Error!');
                });
            })
          ).subscribe();
      }
    } else {
      this.ticketService.changeProgress(this.ticket._id, progress)
        .subscribe(resp => {
          this.ticketService.getById(this.route.snapshot.paramMap.get('id'))
          .pipe(
            tap(ticket => {
                this.socket.emit('status-change');
                this.toastrService.success(resp.message, '¡Éxito!');
                this.ticket = ticket;
              })
            ).subscribe();
        }, err => {
          this.toastrService.error(err.error.message, '¡Error!');
        });
    }
  }

  onEvaluationCreated(event) {
    this.refresh();
  }
}
