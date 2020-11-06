import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-subcategory',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @ViewChild('edit') public edit: ModalDirective;
  @Input() categories;

  @Output() subcategoryEdited = new EventEmitter<any>();

  subcategory;

  constructor() { }

  ngOnInit(): void {
  }

  show(subcategory) {
    this.subcategory = subcategory;
    this.edit.show();
  }

}
