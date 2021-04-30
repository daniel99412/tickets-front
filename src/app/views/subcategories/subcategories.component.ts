import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs/operators';
import { Subcategory } from '../../models/subcategory';
import { CategoryService } from '../../services/category.service';
import { SubcategoryService } from '../../services/subcategory.service';
import * as _ from 'lodash';
import * as io from 'socket.io-client';

@Component({
  templateUrl: 'subcategories.component.html',
  styleUrls: ['subcategories.component.scss']
})

export class SubcategoriesComponent implements OnInit {
  categories: any[] = [];
  subcategories: any[];
  subcategoryName;
  subcategory;
  socket;

  constructor(
    private toastrService: ToastrService,
    private subcategoryService: SubcategoryService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.refresh();
    this.socket = io.connect('http://localhost:3800');

    this.socket.on('created', (data) => {
      if(data) {
        this.refresh();
      }
    })
  }

  changeStatus(subcategory) {
    let status = 'false';
    if (subcategory.active === true) {
      status = 'false';
    } else {
      status = 'true';
    }

    this.subcategoryService.changeStatus(subcategory._id, status)
      .subscribe(resp => {
        this.toastrService.success(resp.message, '¡Éxito!');
        this.socket.emit('create');
        this.subcategoryService.getAll()
          .pipe(
            tap(subcategories => {
              this.subcategories = _.orderBy(subcategories.subcategories, 'category.name');
            })
          ).subscribe();
      });
  }

  SubCategorySaved(event) {
    this.refresh();
  }

  SubCategoryUpdate(event) {
    this.refresh();
  }

  refresh() {
    this.subcategoryService.getAll()
      .pipe(
        switchMap(subcategories => {
          this.subcategories = _.orderBy(subcategories.subcategories, 'category.name');
          return this.categoryService.getAll();
        }),
        switchMap(categories => {
          this.categories = _.orderBy(categories.categories, 'name');
          return this.categories;
        })
      ).subscribe();
  }
}
