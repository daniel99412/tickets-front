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

  CategorySaved(event) {
    this.categoryService.getAll()
      .pipe(
        switchMap( categories => {
          this.categories = categories.categories;
          return this.categories;
        })
      ).subscribe();
  }

  CategoryUpdate(event) {
    this.categoryService.getAll()
      .pipe(
        switchMap( categories => {
          this.categories = categories.categories;
          return this.categories;
        })
      ).subscribe();
  }
  
}
