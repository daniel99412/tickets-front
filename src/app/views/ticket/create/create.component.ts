import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { BranchOfficeService } from '../../../services/branchOffice.service';
import { Subject } from 'rxjs';
import { SubcategoryService } from '../../../services/subcategory.service';
import { Ticket } from '../../../models/ticket';
import { User } from '../../../models/user';
import { TicketService } from '../../../services/ticket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {
  @ViewChild('createModal', { static: false }) modal: ModalDirective;
  @Output() ticketCreated = new EventEmitter<any>();

  private unsubscribe = new Subject<any>();

  creationDate: any;
  categories: any[] = [];
  branchOffices: any[] = [];
  subcategories: any[] = [];
  user: User;

  ticketForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private branchOfficeService: BranchOfficeService,
    private subcategoryService: SubcategoryService,
    private ticketService: TicketService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    if (sessionStorage.getItem('user')) {
      this.user = new User(
        JSON.parse(sessionStorage.getItem('user'))._id,
        JSON.parse(sessionStorage.getItem('user')).name,
        JSON.parse(sessionStorage.getItem('user')).lastname,
        JSON.parse(sessionStorage.getItem('user')).email,
        null,
        JSON.parse(sessionStorage.getItem('user')).branchOffice,
        JSON.parse(sessionStorage.getItem('user')).picture,
        JSON.parse(sessionStorage.getItem('user')).subcategories,
        JSON.parse(sessionStorage.getItem('user')).active
      );
    }

    this.categoryService.getAll()
      .pipe(
        switchMap(categories => {
          this.categories = categories.categories;
          return this.branchOfficeService.getAll();
        }),
        switchMap(resp => {
          this.branchOffices = resp.branchOffice;
          return resp.branchOffice;
        })
      ).subscribe();

      this.ticketForm.get('category').valueChanges
        .pipe(takeUntil(this.unsubscribe))
        .subscribe( value => {
          this.subcategoryService.getByCategoryAndStatus(value, 'true').subscribe( subcategories => {
            this.subcategories = subcategories.subcategories;
          });
        });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  initForm() {
    this.ticketForm = new FormGroup({
      description: new FormControl(null),
      category: new FormControl(null),
      subcategory: new FormControl(null),
      creationDate: new FormControl(this.creationDate),
      reportedFrom: new FormControl(null),
      rating: new FormControl(null)
    });
  }

  show() {
    this.creationDate = moment().format('YYYY-MM-DD hh:mm:ss.SSS');
    this.ticketForm.get('creationDate').setValue(this.creationDate);
    this.modal.show();
  }

  hide() {
    this.cancel();
    this.modal.hide();
  }

  cancel() {
    this.ticketForm.get('description').setValue(null);
    this.ticketForm.get('description').clearValidators();
    this.ticketForm.get('description').updateValueAndValidity();

    this.ticketForm.get('category').setValue(null);
    this.ticketForm.get('category').clearValidators();
    this.ticketForm.get('category').updateValueAndValidity();

    this.ticketForm.get('subcategory').setValue(null);
    this.ticketForm.get('subcategory').clearValidators();
    this.ticketForm.get('subcategory').updateValueAndValidity();

    this.ticketForm.get('creationDate').setValue(null);
    this.ticketForm.get('creationDate').clearValidators();
    this.ticketForm.get('creationDate').updateValueAndValidity();

    this.ticketForm.get('rating').setValue(null);
    this.ticketForm.get('rating').clearValidators();
    this.ticketForm.get('rating').updateValueAndValidity();

    this.ticketForm.get('reportedFrom').setValue(null);
    this.ticketForm.get('reportedFrom').clearValidators();
    this.ticketForm.get('reportedFrom').updateValueAndValidity();

    this.ticketForm.clearValidators();
    this.ticketForm.updateValueAndValidity();
  }

  send() {
    const ticket = new Ticket(
      null,
      this.user,
      this.ticketForm.get('reportedFrom').value,
      null,
      this.ticketForm.get('description').value,
      null,
      this.ticketForm.get('category').value,
      this.ticketForm.get('subcategory').value,
      this.ticketForm.get('creationDate').value,
      null,
      null,
      null,
      null,
      null,
      this.ticketForm.get('rating').value
    );

    this.ticketService.save(ticket).subscribe(resp => {
      this.hide();
      this.ticketCreated.emit(resp);
      this.toastrService.success('Ticket creado', '¡Éxito!');
    });
  }
}
