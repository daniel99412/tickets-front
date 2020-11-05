import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { BranchOfficeService } from '../../../services/branchOffice.service';
import { Subject } from 'rxjs';
import { SubcategoryService } from '../../../services/subcategory.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {
  @ViewChild('createModal', {static: false}) modal: ModalDirective;
  private unsubscribe = new Subject<any>();

  creationDate = moment().format('yyyy-MM-DD');
  categories: any[] = [];
  branchOffices: any[] = [];
  subcategories: any[] = [];

  ticketForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private branchOfficeService: BranchOfficeService,
    private subcategoryService: SubcategoryService
  ) { }

  ngOnInit(): void {
    this.initForm();

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
          this.subcategoryService.getByCategory(value).subscribe( subcategories => {
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
