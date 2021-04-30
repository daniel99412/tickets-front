import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { EvaluationService } from '../../../services/evaluation.service';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-evaluate-ticket',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent implements OnInit {
  @ViewChild('evaluateModal') modal: ModalDirective;
  @Input() ticket: any;
  @Input() userLogged: any;
  @Input() socket;
  @Output() evaluationSaved = new EventEmitter<any>();

  evaluationForm: FormGroup;

  constructor(
    private evaluationService: EvaluationService,
    private ticketService: TicketService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.evaluationForm = new FormGroup({
      ticket: new FormControl(null),
      evaluated: new FormControl(null),
      evaluator: new FormControl(null),
      quality: new FormControl(null),
      speed: new FormControl(null),
      attention: new FormControl(null),
      comments: new FormControl(null)
    });
  }

  show() {
    this.modal.show();
  }

  hide() {
    this.modal.hide();
    this.initForm();
  }

  send() {
    this.evaluationForm.get('ticket').setValue(this.ticket._id);

    if (this.userLogged._id !== this.ticket.createBy._id) {
      this.evaluationForm.get('evaluator').setValue(this.userLogged._id);
      this.evaluationForm.get('evaluated').setValue(this.ticket.createBy._id);
    }

    if (this.userLogged._id === this.ticket.createBy._id) {
      this.evaluationForm.get('evaluator').setValue(this.userLogged._id);
      this.evaluationForm.get('evaluated').setValue(this.ticket.assignedTo[0]._id);
    }

    const evaluation = {
      ticket: this.evaluationForm.get('ticket').value,
      evaluator: this.evaluationForm.get('evaluator').value,
      evaluated: this.evaluationForm.get('evaluated').value,
      quality: this.evaluationForm.get('quality').value,
      speed: this.evaluationForm.get('speed').value,
      attention: this.evaluationForm.get('attention').value,
      comments: this.evaluationForm.get('comments').value
    };

    if (this.userLogged._id === this.ticket.createBy._id) {
      this.evaluationService.save(evaluation)
        .subscribe(resp => {
          this.hide();
          this.toastrService.success('Evaluado', '¡Éxito!');
          this.socket.emit('status-change');
          this.evaluationSaved.emit(resp);
        });
    } else {
      this.ticketService.changeProgress(this.ticket._id, 4)
        .subscribe(resp => {
          this.evaluationService.save(evaluation)
            .subscribe(evaluationResp => {
              this.hide();
              this.toastrService.success(resp.message, '¡Éxito!');
              this.socket.emit('status-change');
              this.evaluationSaved.emit(evaluationResp);
            });
        });
    }
  }
}
