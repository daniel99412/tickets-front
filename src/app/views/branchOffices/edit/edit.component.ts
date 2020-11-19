import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BranchOfficeService } from '../../../services/branchOffice.service';
import { BranchOffice } from '../../../models/branchOffice';

@Component({
  selector: 'app-edit-branch-office',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @ViewChild('edit') public edit: ModalDirective;
  @Output() branchOfficeEdited = new EventEmitter<any>();

  branchOffice: any;
  name: string;
  address: string;

  constructor(
    private toastrService: ToastrService,
    private branchOfficeService: BranchOfficeService
  ) { }

  ngOnInit(): void {
  }

  show(id) {
    this.branchOfficeService.getById(id).subscribe(branchOffice => {
      this.branchOffice = branchOffice.branchOffice
    });
    this.edit.show();
  }

  save() {
    const branchOffice = new BranchOffice(this.branchOffice._id, this.branchOffice.name, this.branchOffice.address)
    this.branchOfficeService.update(this.branchOffice._id, branchOffice)
      .subscribe(branchOfficeUpdate => {
        this.cancel();
        this.toastrService.success('Sucursal editada', '¡Éxito!');
        this.branchOfficeEdited.emit(branchOfficeUpdate);
      },
      err => {
        this.cancel();
        this.toastrService.error(err.error.message, '¡Error!');
      });
    this.edit.hide();
  }

  cancel() {
    this.branchOffice = null;
    this.edit.hide();
  }

}
