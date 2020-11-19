import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../../../models/role';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

  @ViewChild('edit') public edit: ModalDirective;
  @Output() roleEdited = new EventEmitter<any>();

  role: any;
  name: string;

  constructor(
    private toastrService: ToastrService,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
  }

  show(id) {
    this.roleService.getById(id).subscribe(role => {
      this.role = role;
    });
    this.edit.show();
  }

  saveChanges() {
    const role = new Role(this.role.role._id, this.role.role.name)
    this.roleService.update(this.role.role._id, role)
      .subscribe(roleUpdate => {
        this.cancel();
        this.toastrService.success('Rol editado', '¡Éxito!');
        this.roleEdited.emit(roleUpdate);
      },
      err => {
        this.cancel();
        this.toastrService.error(err.error.message, '¡Error!');
      });
    this.edit.hide();
  }

  cancel() {
    this.role = null;
    this.edit.hide();
  }

}
