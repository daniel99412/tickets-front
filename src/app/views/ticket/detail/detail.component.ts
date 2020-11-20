import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { TicketService } from '../../../services/ticket.service';
import { ToastrService } from 'ngx-toastr';
import { EvaluationService } from '../../../services/evaluation.service';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private toastrService: ToastrService,
    private evaluationService: EvaluationService
  ) { }

  ngOnInit(): void {
    this.userLogged = JSON.parse(sessionStorage.getItem('user'));

    this.ticketService.getById(this.route.snapshot.paramMap.get('id'))
      .pipe(
        switchMap(ticket => {
          this.ticket = ticket;
          return this.evaluationService.getByTicket(this.route.snapshot.paramMap.get('id'));
        }),
        tap(evaluations => {
          console.log(evaluations);
          this.evaluations = evaluations;
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

  changeProgress(progress) {
    this.ticketService.changeProgress(this.ticket._id, progress)
      .subscribe(resp => {
        this.ticketService.getById(this.route.snapshot.paramMap.get('id'))
        .pipe(
          tap(ticket => {
              this.toastrService.success(resp.message, '¡Éxito!');
              this.ticket = ticket;
            })
          ).subscribe();
      }, err => {
        this.toastrService.error(err.error.message, '¡Error!');
      });
  }

  onEvaluationCreated(event) {
    this.evaluationService.getByTicket(this.route.snapshot.paramMap.get('id'))
      .pipe(
        switchMap(evaluationsResp => {
          console.log(evaluationsResp);
          return this.ticketService.getById(this.route.snapshot.paramMap.get('id'));
        }),
        tap(ticket => {
          this.ticket = ticket;
        })
      ).subscribe();
  }
}
