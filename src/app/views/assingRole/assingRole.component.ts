import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { UserRoleService } from '../../services/userRole.service';
import { FormControl, FormGroup } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as _ from 'lodash';

@Component({
  templateUrl: 'assingRole.component.html',
  styleUrls: ['assingRole.component.scss']
})
export class AssingRoleComponent implements OnInit, OnDestroy {

  users: any[] = [];
  subcategories = [];
  roles = [];
  rolesByUser = [];
  rolesSelected = [];
  idUser: any = null;
  idRole: any;
  body: any;

  userForm: FormGroup;

  private unsubscribe = new Subject<any>();

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private userRole: UserRoleService
  ) {}

  ngOnInit(): void {
    this.userService.getAll()
      .pipe(
        tap(resp => {
          this.users = resp.users;
        })
      ).subscribe();

      this.roleService.getAll()
        .pipe(
          tap( resp => {
            this.roles = resp.roles;
          })
        ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  accessSearch(user) {
    this.userRole.getRoles(user)
      .pipe(
        tap(resp => {
          this.rolesByUser = resp.roles;
          const _accessSearch = _.groupBy(this.rolesByUser, 'role._id')
          this.rolesByUser = _accessSearch;
        })
      ).subscribe();
  }

  send(value) {
    this.rolesByUser = [];
    this.body = {
      user: this.idUser,
      role: value
    }
    this.userRole.setRole(this.body).subscribe(resp => {
      window.location.reload();
    })
  }

  remove(value) {
    this.userRole.unsetRole(value).subscribe(resp => {
      window.location.reload();
    })
  }

}
