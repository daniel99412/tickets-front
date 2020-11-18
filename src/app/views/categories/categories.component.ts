import { Component, OnInit, ViewChild} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormControl } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { switchMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: 'categories.component.html',
  styleUrls: ['categories.component.scss']
})

export class CategoriesComponent implements OnInit {
  @ViewChild('infoModal') public infoModal: ModalDirective;
  categories: any[];
  categoryName;

  constructor(
    private toastrService: ToastrService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll()
      .pipe(
        switchMap( categories => {
          this.categories = categories.categories;
          return this.categories;
        })
      ).subscribe();
  }

  save() {
    const category = new Category(null, this.categoryName, null);

    this.categoryService.save(category)
      .subscribe(categorySaved => {
          this.categoryService.getAll()
            .pipe(
              tap(categories => {
                this.cancel();
                this.categories = categories.categories;
                this.toastrService.success('Categoria creada', '¡Éxito!');
              })
            ).subscribe();
      },
      err => {
        this.cancel();
        this.toastrService.error(err.error.message + '.', '¡Error!');
      });
  }

  cancel() {
    this.categoryName = null;
    this.infoModal.hide();
  }
}
