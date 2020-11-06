import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { Subcategory } from '../../../models/subcategory';
import { SubcategoryService } from '../../../services/subcategory.service';

@Component({
  selector: 'app-create-subcategory',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('create') public create: ModalDirective;
  @Input() categories;

  @Output() subcategorySaved = new EventEmitter<any>();

  categorySelected;
  subcategoryName;

  constructor(
    private subcategoryService: SubcategoryService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  show() {
    this.create.show();
  }

  save() {
    const subcategory = new Subcategory(null, this.subcategoryName, this.categorySelected);

    this.subcategoryService.save(subcategory)
      .subscribe(subcategorySaved => {
        this.toastrService.success('Categoria creada', '¡Exito!');
        this.cancel();
        this.subcategorySaved.emit(subcategorySaved);
      },
        err => {
          this.cancel();
          this.toastrService.error(err.error.message, '¡Error!');
        });
  }

  cancel() {
    this.subcategoryName = null;
    this.categorySelected = null;
    this.create.hide();
  }
}
