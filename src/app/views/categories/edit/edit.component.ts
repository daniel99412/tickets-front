import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @ViewChild('edit') public edit: ModalDirective;
  @Output() categoryEdited = new EventEmitter<any>();
  @Input() socket;

  category: any;
  name: string;

  constructor(
    private toastrService: ToastrService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
  }

  show(id) {
    this.categoryService.getById(id).subscribe(category => {
      this.category = category;
    });
    this.edit.show();
  }

  saveChanges() {
    const category = new Category(this.category.category._id, this.category.category.name)
    this.categoryService.update(this.category.category._id, category)
      .subscribe(categoryUpdate => {
        this.cancel();
        this.socket.emit('create');
        this.toastrService.success('Categoria editada', '¡Éxito!');
        this.categoryEdited.emit(categoryUpdate);
      },
      err => {
        this.cancel();
        this.toastrService.error(err.error.message, '¡Error!');
      });
    this.edit.hide();
  }

  cancel() {
    this.category = null;
    this.edit.hide();
  }

}
