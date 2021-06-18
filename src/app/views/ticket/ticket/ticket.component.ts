import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';
import { EvaluationService } from '../../../services/evaluation.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  @Input() ticket: any;
  public color = 'danger';
  public creationDate;
  evaluations = [];
  userLogged;

  constructor(
    private evaluationService: EvaluationService
  ) { }

  ngOnInit(): void {
    this.userLogged = JSON.parse(sessionStorage.getItem('user'));

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
        this.evaluationService.getByTicket(this.ticket._id)
          .pipe(
            tap(resp => {
              this.evaluations = resp;
            })
          ).subscribe()
      } else {
        this.color = 'danger';
      }
    }
  }

  getEvaluation(): number {
    let totalEvaluation = 0;

    if (this.evaluations.length !== 0) {
      this.evaluations.forEach(evaluation => {
        if (evaluation.evaluated._id === this.userLogged._id) {
          totalEvaluation = (evaluation.attention + evaluation.quality + evaluation.speed) / 3
        }
      });
    }

    return totalEvaluation;
  }
}
