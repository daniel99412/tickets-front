import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-branch-office',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @ViewChild('edit') public edit: ModalDirective;
  @Output() branchOfficeEdited = new EventEmitter<any>();
  branchOffice: any;

  constructor() { }

  ngOnInit(): void {
  }

  show(branchOffice) {
    this.branchOffice = branchOffice;
    this.edit.show();
  }

  cancel() {
    this.branchOffice = null;
    this.edit.hide();
  }

}
