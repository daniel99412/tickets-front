import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormControl } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { switchMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as io from 'socket.io-client';

@Component({
  templateUrl: 'categories.component.html',
  styleUrls: ['categories.component.scss']
})

export class CategoriesComponent implements OnInit, OnDestroy {
  @ViewChild('infoModal') public infoModal: ModalDirective;

  categories: any[];
  socket;

  constructor(
    private toastrService: ToastrService,
    private categoryService: CategoryService
  ) {}

  ngOnDestroy(): void {
    this.socket.emit('leave');
  }

  ngOnInit(): void {
    this.Refresh();
    this.socket = io.connect('http://localhost:3800');

    this.socket.on('created', (data) => {
      console.log(data);
      if(data) {
        this.Refresh();
      }
    })
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
        this.socket.emit('create');
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
