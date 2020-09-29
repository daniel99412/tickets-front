import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SubcategoriesComponent } from './subcategories.component';
import { SubcategoriesRoutingModule } from './subcategories-routing.module';

@NgModule({
  imports: [
    SubcategoriesRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [ SubcategoriesComponent ]
})
export class SubcategoriesModule { }
