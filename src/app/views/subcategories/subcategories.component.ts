import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs/operators';
import { Subcategory } from '../../models/subcategory';
import { CategoryService } from '../../services/category.service';
import { SubcategoryService } from '../../services/subcategory.service';

@Component({
  templateUrl: 'subcategories.component.html',
  styleUrls: ['subcategories.component.scss']
})

export class SubcategoriesComponent implements OnInit {
  @ViewChild('infoModal') public infoModal: ModalDirective;
  categories: any[] = [];
  subcategories: any[];
  subcategoryName;
  categorySelected;

  constructor(
    private toastrService: ToastrService,
    private subcategoryService: SubcategoryService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.subcategoryService.getAll()
      .pipe(
        switchMap(subcategories => {
          this.subcategories = subcategories.subcategories;
          return this.categoryService.getAll();
        }),
        switchMap(categories => {
          this.categories = categories.categories;
          return this.categories;
        })
      ).subscribe();
  }

  save() {
    const subcategory = new Subcategory(null, this.subcategoryName, this.categorySelected);

    this.subcategoryService.save(subcategory)
      .subscribe(subcategorySaved => {
        this.subcategoryService.getAll()
          .pipe(
            tap(subcategories => {
              this.cancel();
              this.subcategories = subcategories.subcategories;
              this.toastrService.success('Categoria creada', '¡Exito!');
            })
          ).subscribe();
      },
        err => {
          this.cancel();
          this.toastrService.error(err.error.message, '¡Error!');
        });
  }

  cancel() {
    this.subcategoryName = null;
    this.categorySelected = null;
    this.infoModal.hide();
  }
}
