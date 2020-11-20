import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { UserRoleService } from '../../services/userRole.service';
import { FormControl, FormGroup } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  templateUrl: 'assingRole.component.html',
  styleUrls: ['assingRole.component.scss']
})
export class AssingRoleComponent implements OnInit, OnDestroy {

  users: any[] = [];
  subcategories = [];
  roles: any[];
  rolesSelected = [];
  idUser: any;

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
          console.log(this.users)
        })
      ).subscribe();

      this.roleService.getAll()
        .pipe(
          switchMap( roles => {
            this.roles = roles.roles;
            console.log(this.roles)
            return this.roles;
          })
        ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  GetUser(id: number) {
    console.log("Entre")
    // this.idUser = id;
    // console.log(this.idUser)
  }

  accessSearch() {
    console.log("Entre")
  }

  searchAccessList(user) {
    this.userRole.getRoles(user)
      .pipe(
        tap(resp => {
          this.users = resp;
        })
      ).subscribe();
  }

  send() {

  }

  remove() {

  }

}
