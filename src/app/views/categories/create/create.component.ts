import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-craete-category',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @ViewChild('create') public create: ModalDirective;
  @Output() categoryCreated = new EventEmitter<any>();

  categoryName: string;
  categories: any[];

  constructor(
    private toastrService: ToastrService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
  }

  show() {
    this.create.show();
  }

  cancel() {
    this.categoryName = null;
    this.create.hide();
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
                this.categoryCreated.emit(categorySaved);
              })
            ).subscribe();
      },
      err => {
        this.cancel();
        this.toastrService.error(err.error.message + '.', '¡Error!');
      });
  }
}
