import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SubcategoriesComponent } from './subcategories.component';
import { SubcategoriesRoutingModule } from './subcategories-routing.module';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SubcategoriesRoutingModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot()
  ],
  declarations: [ SubcategoriesComponent ]
})
export class SubcategoriesModule { }
