import { Component, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { switchMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';

@Component({
  templateUrl: 'roles.component.html',
  styleUrls: ['roles.component.scss']
})

export class RolesComponent {

  @ViewChild('infoModal') public infoModal: ModalDirective;

  roles: any[];

  constructor(
    private toastrService: ToastrService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.Refresh();
  }

  RoleSaved(event) {
    this.Refresh();
  }

  RoleUpdate(event) {
    this.Refresh();
  }

  Refresh() {
    this.roleService.getAll()
      .pipe(
        switchMap( roles => {
          this.roles = roles.roles;
          return this.roles;
        })
      ).subscribe();
  }

}
