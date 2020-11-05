import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    ToastrModule.forRoot()
  ],
  declarations: [ CategoriesComponent ]
})
export class CategoriesModule { }
