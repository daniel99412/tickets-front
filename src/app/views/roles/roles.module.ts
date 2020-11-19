import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { RolesComponent } from './roles.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { RolesRoutingModule } from './roles-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RolesRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    ToastrModule.forRoot()
  ],
  declarations: [ RolesComponent, CreateComponent, EditComponent ]
})
export class RolesModule { }
