import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CategoriesComponent } from './categories.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { SocketioService } from '../../socketio.service';

@NgModule({
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    ToastrModule.forRoot()
  ],
  declarations: [ CategoriesComponent, CreateComponent, EditComponent ],
  providers: [ SocketioService ]
})
export class CategoriesModule { }
