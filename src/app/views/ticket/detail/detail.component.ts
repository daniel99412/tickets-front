import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { TicketService } from '../../../services/ticket.service';
import { ToastrService } from 'ngx-toastr';
import { EvaluationService } from '../../../services/evaluation.service';
import * as io from 'socket.io-client';
import { FileService } from '../../../services/file.service';
import { AppSettings } from '../../../app.settings';
import * as _ from 'lodash';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  ticket: any;
  userLogged;
  evaluations: any;
  socket;
  promiseDate;
  url;
  socketUrl = AppSettings.SOCKETURL;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private toastrService: ToastrService,
    private evaluationService: EvaluationService,
    private fileService: FileService
  ) {
    this.url = AppSettings.API;
  }

  ngOnInit(): void {
    this.socket = io.connect(this.socketUrl);

    this.userLogged = JSON.parse(sessionStorage.getItem('user'));

    this.socket.on('status-changed', (data) => {
      if (data) {
        this.refresh();
      }
    });

    this.refresh();
  }

  refresh() {
    this.ticketService.getById(this.route.snapshot.paramMap.get('id'))
      .pipe(
        switchMap(ticket => {
          this.ticket = ticket;
          this.promiseDate = ticket.promiseDate;
          return this.evaluationService.getByTicket(this.route.snapshot.paramMap.get('id'));
        }),
        tap(evaluations => {
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
    if (progress === 3) {
      if (this.promiseDate === '' || !this.promiseDate) {
        this.toastrService.error('Ingresa la fecha compromiso', '¡Error!');
      } else {
        this.ticketService.assign(this.ticket._id, this.ticket.assignedTo[0]._id, this.promiseDate)
          .pipe(
            tap(ticket => {
              this.ticket = ticket;
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

  getEvaluation(): number {
    let totalEvaluation = 0;

    if (this.evaluations && this.evaluations.length !== 0) {
      this.evaluations.forEach(evaluation => {
        if (evaluation.evaluated._id === this.userLogged._id) {
          totalEvaluation = (evaluation.attention + evaluation.quality + evaluation.speed) / 3
        }
      });
    }

    return totalEvaluation;
  }

  uploadFile(event) {
    var file = event.target.files[0];
    this.fileService.save(this.ticket._id, file)
      .pipe(
        tap(resp => {
          this.refresh();
          this.toastrService.success('Archivo adjuntado al ticket', '¡Éxito!');
        })
      ).subscribe();
  }

  checkIfAllAreEvaluated(): boolean {
    if (this.evaluations && this.evaluations.length !== 0) {
      const groupedByEvaluated = _.groupBy(this.evaluations, 'evaluated._id');
      if (this.ticket.assignedTo.length < 2) {
        if (groupedByEvaluated[this.ticket.assignedTo[0]._id])
          return false;
        else
          return true;
      } else {
        if (groupedByEvaluated[this.ticket.assignedTo[0]._id] && groupedByEvaluated[this.ticket.assignedTo[1]._id])
          return false;
        else
          return true;
      }
    }
  }

  assigntToMe(ticketId) {
    if (this.promiseDate === '' || !this.promiseDate) {
      this.toastrService.warning('Ingresa la fecha compromiso', '¡Precausión!');
    } else {
      this.ticketService.assign(ticketId, this.userLogged._id, this.promiseDate).subscribe(
        resp => {
          this.socket.emit('status-change');
          this.toastrService.success('Ticket asignado', '¡Éxito!');
          this.onTicketAssigned(null);
        }
      );
    }

  }

}
