import { Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs/operators';
import { BranchOfficeService } from '../../services/branchOffice.service';

@Component({
  templateUrl: 'branchOffices.component.html',
  styleUrls: ['branchOffices.component.scss']
})

export class BranchOfficesComponent implements OnInit {
  @ViewChild('infoModal') public infoModal: ModalDirective;

  branchOffices: any[];

  constructor(
    private toastrService: ToastrService,
    private branchOfficeService: BranchOfficeService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  branchOfficeSaved(event) {
    this.refresh();
  }

  branchOfficeUpdate(event) {
    this.refresh();
  }

  chageStatus(branchOffice) {
    let status = 'false';
    if (branchOffice.active === true) {
      status = 'false';
    } else {
      status = 'true';
    }

    this.branchOfficeService.changeStatus(branchOffice._id, status)
      .subscribe(resp => {
        this.toastrService.success(resp.message, '¡Éxito!');

        this.branchOfficeService.getAll()
          .pipe(
            tap(branchOffices => {
              this.branchOffices = branchOffices.branchOffice;
            })
          ).subscribe();
      });
  }

  refresh(){
    this.branchOfficeService.getAll()
      .pipe(
        tap(branchOffices => {
          this.branchOffices = branchOffices.branchOffice;
        })
      ).subscribe();
  }
}
