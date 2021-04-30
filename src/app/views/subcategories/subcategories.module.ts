import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SubcategoriesComponent } from './subcategories.component';
import { SubcategoriesRoutingModule } from './subcategories-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { SocketioService } from '../../socketio.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SubcategoriesRoutingModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot()
  ],
  declarations: [ SubcategoriesComponent, CreateComponent, EditComponent ],
  providers: [ SocketioService ]
})
export class SubcategoriesModule { }
