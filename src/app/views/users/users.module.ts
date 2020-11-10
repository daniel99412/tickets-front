import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DragulaModule } from 'ng2-dragula';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TabsModule,
    UsersRoutingModule,
    DragulaModule.forRoot(),
  ],
  declarations: [ UsersComponent, CreateComponent, EditComponent ]
})
export class UsersModule { }
