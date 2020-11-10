import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { switchMap, tap } from 'rxjs/operators';
import { BranchOfficeService } from '../../../services/branchOffice.service';
import { CategoryService } from '../../../services/category.service';
import { SubcategoryService } from '../../../services/subcategory.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('create') public create: ModalDirective;

  userForm: FormGroup;

  categories = [];
  subcategories = [];
  branchOffices = [];

  categorySelected: any;
  subcategoriesSelected = [];

  constructor(
    private catgoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private branchOfficeService: BranchOfficeService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.catgoryService.getAll()
      .pipe(
        switchMap(resp => {
          this.categories = resp.categories;
          return this.branchOfficeService.getAll();
        }),
        tap(resp => {
          this.branchOffices = resp.branchOffices;
        })
      ).subscribe();
  }

  initForm() {
    this.userForm = new FormGroup({
      name: new FormControl(null),
      lastname: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
      branchOffice: new FormControl(null),
      category: new FormControl(null)
    });
  }

  cancel() {
    this.create.hide();

    this.userForm.get('name').setValue(null);
    this.userForm.get('name').clearValidators();
    this.userForm.get('name').updateValueAndValidity();

    this.userForm.get('lastname').setValue(null);
    this.userForm.get('lastname').clearValidators();
    this.userForm.get('lastname').updateValueAndValidity();

    this.userForm.get('email').setValue(null);
    this.userForm.get('email').clearValidators();
    this.userForm.get('email').updateValueAndValidity();

    this.userForm.get('password').setValue(null);
    this.userForm.get('password').clearValidators();
    this.userForm.get('password').updateValueAndValidity();

    this.userForm.get('branchOffice').setValue(null);
    this.userForm.get('branchOffice').clearValidators();
    this.userForm.get('branchOffice').updateValueAndValidity();

    this.userForm.get('category').setValue(null);
    this.userForm.get('category').clearValidators();
    this.userForm.get('category').updateValueAndValidity();

    this.userForm.clearValidators();
    this.userForm.updateValueAndValidity();

    this.categories = [];
    this.subcategories = [];
    this.categorySelected = null;
    this.subcategoriesSelected = [];
  }

  show() {
    this.catgoryService.getAll()
      .pipe(
        switchMap(resp => {
          this.categories = resp.categories;
          return this.branchOfficeService.getAll();
        }),
        tap(resp => {
          this.branchOffices = resp.branchOffice;
        })
      ).subscribe();

    this.create.show();
  }

  onCategorySelectedChange(event) {
    this.subcategoryService.getByCategoryAndStatus(event, 'true')
      .subscribe(resp => {
        this.subcategories = resp.subcategories;
      });
  }

  send() {
    console.log(this.subcategoriesSelected);
    console.log(this.userForm);
  }
}
