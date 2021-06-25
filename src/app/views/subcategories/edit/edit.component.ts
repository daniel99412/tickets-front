import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subcategory } from '../../../models/subcategory';
import { SubcategoryService } from '../../../services/subcategory.service';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-subcategory',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @ViewChild('edit') public edit: ModalDirective;
  @Input() categories;
  @Input() socket;

  @Output() subcategoryEdited = new EventEmitter<any>();

  subcategoryForm: FormGroup;

  constructor(
    private subcategoryService: SubcategoryService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.subcategoryForm = new FormGroup({
      id: new FormControl(null),
      category: new FormControl(null),
      subcategory: new FormControl(null)
    });
  }

  show(subcategory) {
    this.setInfoInForm(subcategory);
    this.edit.show();
  }

  setInfoInForm(subcategory) {
    this.subcategoryForm.get('id').setValue(subcategory._id);
    this.subcategoryForm.get('category').setValue(subcategory.category);
    this.subcategoryForm.get('subcategory').setValue(subcategory.name);
  }

  update() {
    const subcategory = new Subcategory(this.subcategoryForm.get('id').value, this.subcategoryForm.get('subcategory').value, this.subcategoryForm.get('category').value._id);
    this.subcategoryService.update(this.subcategoryForm.value._id, subcategory)
      .subscribe(subcategorySaved => {
        this.toastrService.success('Subcategoria creada', '¡Éxito!');
        this.socket.emit('create');
        this.cancel();
        this.subcategoryEdited.emit(subcategorySaved);
      },
        err => {
          this.cancel();
          this.toastrService.error(err.error.message, '¡Error!');
        });

    this.edit.hide();
  }

  compareFn(obj1, obj2): boolean {
    return obj1 === obj2;
  }

  cancel() {
    this.subcategoryForm.reset();
    this.edit.hide();
  }
}
