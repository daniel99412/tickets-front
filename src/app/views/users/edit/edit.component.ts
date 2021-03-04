import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { BranchOfficeService } from '../../../services/branchOffice.service';
import { CategoryService } from '../../../services/category.service';
import { SubcategoryService } from '../../../services/subcategory.service';
import { UserService } from '../../../services/user.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  @ViewChild('edit') public edit: ModalDirective;
  
  private unsubscribe = new Subject<any>();

  userForm: FormGroup;
  user;

  categories = [];
  subcategories = [];
  branchOffices = [];

  subcategoriesSelected = [];

  constructor(
    private toastrService: ToastrService,
    private userService: UserService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private branchOfficeService: BranchOfficeService
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit(): void {
    this.initForm();

    this.userForm.get('category').valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe( value => {
        if (value === '---') {
          this.subcategories = [];
        } else if (value) {
          this.subcategoryService.getByCategoryAndStatus(value, 'true')
            .subscribe(resp => {
               this.subcategories = resp.subcategories;
            });
        }
      });
  }

  initForm() {
    this.userForm = new FormGroup({
      name: new FormControl(null),
      lastname: new FormControl(null),
      email: new FormControl(null),
      branchOffice: new FormControl(null),
      category: new FormControl(null)
    });
  }

  show(id) {
    this.userService.getById(id)
      .pipe(
        switchMap(resp => {
          this.user = resp.user;
          this.setInfoInForm(this.user);
          return this.categoryService.getAll();
        }),
        switchMap(resp => {
          this.categories = resp.categories;
          return this.branchOfficeService.getAll();
        }),
        tap(resp => {
          this.branchOffices = resp.branchOffice;
        })
      ).subscribe();

    this.edit.show();
  }

  setInfoInForm(user) {
    this.subcategoriesSelected = [];
    this.userForm.get('name').setValue(user.name);
    this.userForm.get('lastname').setValue(user.lastname);
    this.userForm.get('email').setValue(user.email);
    this.userForm.get('branchOffice').setValue(user.branchOffice);

    for (let i = 0; i < user.subcategories.length; i++) {
      this.subcategoryService.getById(user.subcategories[i]._id)
        .subscribe(resp => {
          this.subcategoriesSelected.push(resp.subcategory);
        })
    }
  }
}
