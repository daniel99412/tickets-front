import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SubcategoriesComponent } from './subcategories.component';
import { SubcategoriesRoutingModule } from './subcategories-routing.module';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SubcategoriesRoutingModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot()
  ],
  declarations: [ SubcategoriesComponent, CreateComponent, EditComponent ]
})
export class SubcategoriesModule { }
