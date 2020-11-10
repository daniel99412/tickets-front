import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { BranchOffice } from '../../../models/branchOffice';
import { BranchOfficeService } from '../../../services/branchOffice.service';

@Component({
  selector: 'app-craete-branch-office',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('create') public create: ModalDirective;
  @Output() branchOfficeCreated = new EventEmitter<any>();

  name: string;
  address: string;

  constructor(
    private toastrService: ToastrService,
    private branchOfficeService: BranchOfficeService
  ) { }

  ngOnInit(): void {
  }

  show() {
    this.create.show();
  }

  cancel() {
    this.name = null;
    this.address = null;
    this.create.hide();
  }

  save() {
    const branchOffice = new BranchOffice(null, this.name, this.address);

    this.branchOfficeService.save(branchOffice)
      .subscribe(branchOfficeSaved => {
        this.cancel();
        this.toastrService.success('Sucursal creada', '¡Exito!');
        this.branchOfficeCreated.emit(branchOfficeSaved);
      },
      err => {
        this.cancel();
        this.toastrService.error(err.error.message, '¡Error!');
      });
  }
}
