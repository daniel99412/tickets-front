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
