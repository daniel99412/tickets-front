import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

  @ViewChild('edit') public edit: ModalDirective;
  @Output() categoryEdited = new EventEmitter<any>();

  category: any;
  name: string;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
  }

  show(id) {
    this.categoryService.getById(id).subscribe(category => {
      this.category = category;
      console.log(this.category);
    });
    this.edit.show();
  }

  saveChanges() {
    this.category.category.name
    console.log(this.category.category.name, "Nuevo Nombre");
    this.edit.hide();
  }

  cancel() {
    this.category = null;
    this.edit.hide();
  }

}
