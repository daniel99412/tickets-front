import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subcategory } from '../../../models/subcategory';
import { SubcategoryService } from '../../../services/subcategory.service';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

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
  category;
  categorySelected = null;
  subcategoryName = null;

  constructor(
    private subcategoryService: SubcategoryService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  show(subcategory) {
    this.subcategory = subcategory;
    this.categorySelected = subcategory.category;
    console.log(this.categorySelected, "Completo");
    this.edit.show();
  }

  update() {
    this.categorySelected;
    const subcategory = new Subcategory(this.subcategory._id, this.subcategory.name, this.categorySelected);
    this.subcategoryService.update(this.subcategory._id, subcategory)
      .subscribe(subcategorySaved => {
        this.toastrService.success('Subcategoria creada', '¡Éxito!');
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
    console.log(obj1);
    console.log(obj2);
    return obj1 === obj2;
  }

  cancel() {
    this.subcategoryName = null;
    this.categorySelected = null;
    this.edit.hide();
  }
}
