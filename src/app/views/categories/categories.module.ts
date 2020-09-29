import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';

@NgModule({
  imports: [
    CategoriesRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [ CategoriesComponent ]
})
export class CategoriesModule { }
