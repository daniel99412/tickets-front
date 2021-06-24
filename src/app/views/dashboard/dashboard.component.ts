import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AppSettings } from '../../app.settings';
import { EvaluationService } from '../../services/evaluation.service';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public room;
  userLogged;  
  url;
  average;

  constructor(
    private evaluationService: EvaluationService
  ) {
    this.url = AppSettings.API;
  }

  ngOnInit(): void {
    this.userLogged = JSON.parse(sessionStorage.getItem('user'));

    this.evaluationService.getAverageByUser(this.userLogged._id)
      .pipe(
        tap(resp => {
          this.average = resp;
        })
      ).subscribe();
  }
}
