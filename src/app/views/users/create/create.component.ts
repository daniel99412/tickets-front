import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { User } from '../../../models/user';
import { UserRole } from '../../../models/userRole';
import { BranchOfficeService } from '../../../services/branchOffice.service';
import { CategoryService } from '../../../services/category.service';
import { RoleService } from '../../../services/role.service';
import { SubcategoryService } from '../../../services/subcategory.service';
import { UserService } from '../../../services/user.service';
import { UserRoleService } from '../../../services/userRole.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {
  @ViewChild('create') public create: ModalDirective;
  @Output() usercreated = new EventEmitter<any>();

  private unsubscribe = new Subject<any>();

  userForm: FormGroup;

  categories = [];
  subcategories = [];
  branchOffices = [];
  roles = [];

  subcategoriesSelected = [];
  rolesSelected = [];

  constructor(
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private branchOfficeService: BranchOfficeService,
    private userService: UserService,
    private toastrService: ToastrService,
    private roleService: RoleService,
    private userRoleService: UserRoleService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.categoryService.getAll()
      .pipe(
        switchMap(resp => {
          this.categories = resp.categories;
          return this.branchOfficeService.getAll();
        }),
        tap(resp => {
          this.branchOffices = resp.branchOffices;
        })
      ).subscribe();

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

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
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
    this.subcategoriesSelected = [];
    this.roles = [];
    this.rolesSelected = [];
  }

  show() {
    this.categoryService.getAll()
      .pipe(
        switchMap(resp => {
          this.categories = resp.categories;
          return this.branchOfficeService.getAll();
        }),
        switchMap(resp => {
          this.branchOffices = resp.branchOffice;
          return this.roleService.getAll();
        }),
        tap(resp => {
          this.roles = resp.roles;
        })
      ).subscribe();

    this.create.show();
  }

  send() {
    const subcategoriesToSend = [];
    for (let s of this.subcategoriesSelected) {
      subcategoriesToSend.push(s._id);
    }

    const user = new User(null,
      this.userForm.get('name').value,
      this.userForm.get('lastname').value,
      this.userForm.get('email').value,
      this.userForm.get('password').value,
      this.userForm.get('branchOffice').value,
      null,
      subcategoriesToSend,
      null
    );

    this.userService.save(user)
    .subscribe(resp => {
        this.rolesSelected.forEach(role => {
          var userRole = new UserRole(null, resp._id, role._id);
          this.userRoleService.setRole(userRole).subscribe(resp => {
            this.toastrService.success('Rol asignado', '¡Éxito!');
          }, err => {
            this.toastrService.error(err.error.message, '¡Error!');
          });
        });
        this.cancel();
        this.toastrService.success('Usuario creado', '¡Éxito!');
        this.usercreated.emit(resp);
      },
      err => {
        this.cancel();
        this.toastrService.error(err.error.message, '¡Error!');
      });
  }
}
