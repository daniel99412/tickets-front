import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { Role } from '../../../models/role';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-craete-role',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @ViewChild('create') public create: ModalDirective;
  @Output() roleCreated = new EventEmitter<any>();

  roleName: string;
  roles: any[];

  constructor(
    private toastrService: ToastrService,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
  }

  show() {
    this.create.show();
  }

  cancel() {
    this.roleName = null;
    this.create.hide();
  }

  save() {
    const role = new Role(null, this.roleName, null);
    this.roleService.save(role)
      .subscribe(roleSaved => {
          this.roleService.getAll()
            .pipe(
              tap(roles => {
                this.cancel();
                this.roles = roles;
                this.toastrService.success('Rol creada', '¡Éxito!');
                this.roleCreated.emit(roleSaved);
              })
            ).subscribe();
      },
      err => {
        this.cancel();
        this.toastrService.error(err.error.message + '.', '¡Error!');
      });
  }
}
