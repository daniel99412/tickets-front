import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { switchMap } from 'rxjs/operators';
import { Category } from '../../../models/category';
import { BranchOfficeService } from '../../../services/branchOffice.service';
import { BranchOffice } from '../../../models/branchOffice';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('createModal', {static: false}) modal: ModalDirective;

  creationDate = moment().format('yyyy-MM-DD');
  categories: Category[] = [];
  branchOffices: any[] = [];

  ticketForm = new FormGroup({
    description: new FormControl(),
    category: new FormControl(),
    subcategory: new FormControl(),
    creationDate: new FormControl(),
    reportedFrom: new FormControl(),
    rating: new FormControl()
  });

  constructor(
    private categoryService: CategoryService,
    private branchOfficeService: BranchOfficeService
  ) { }

  ngOnInit(): void {
    this.ticketForm.get('creationDate').setValue(this.creationDate);

    this.categoryService.getAll()
      .pipe(
        switchMap((categories: Category[]) => {
          this.categories = categories;
          return this.branchOfficeService.getAll();
        }),
        switchMap(resp => {
          this.branchOffices = resp.branchOffice;
          return resp.branchOffice;
        })
      ).subscribe();
  }

  show() {
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
    console.log(this.ticketForm.value);
  }
}
