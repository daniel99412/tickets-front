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

  constructor(
    private toastrService: ToastrService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.Refresh();
  }

  CategorySaved(event) {
    this.Refresh();
  }

  CategoryUpdate(event) {
    this.Refresh();
  }

  chageStatus(category) {
    let status = 'false';
    if (category.active === true) {
      status = 'false';
    } else {
      status = 'true';
    }

    this.categoryService.changeStatus(category._id, status)
      .subscribe(resp => {
        this.toastrService.success(resp.message, '¡Éxito!');

        this.categoryService.getAll()
          .pipe(
            tap(categories => {
              this.categories = categories.categories;
            })
          ).subscribe();
      });
  }

  Refresh() {
    this.categoryService.getAll()
      .pipe(
        switchMap( categories => {
          this.categories = categories.categories;
          return this.categories;
        })
      ).subscribe();
  }

}
