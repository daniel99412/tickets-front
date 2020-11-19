import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BranchOfficeService } from '../../../services/branchOffice.service';

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
    this.branchOffice.name
    this.branchOffice.address
    console.log(this.branchOffice.name, "Nuevo Nombre");
    console.log(this.branchOffice.address, "Nuevo Domicilio");
    this.edit.hide();
  }

  cancel() {
    this.branchOffice = null;
    this.edit.hide();
  }

}
