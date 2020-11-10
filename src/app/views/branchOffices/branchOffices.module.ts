import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { BranchOfficesComponent } from './branchOffices.component';
import { BranchOfficesRoutingModule } from './branchOffices-routing.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BranchOfficesRoutingModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  declarations: [ BranchOfficesComponent, CreateComponent, EditComponent ]
})
export class BranchOfficesModule { }
