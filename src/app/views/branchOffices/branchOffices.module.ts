import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { BranchOfficesComponent } from './branchOffices.component';
import { BranchOfficesRoutingModule } from './branchOffices-routing.module';

@NgModule({
  imports: [
    BranchOfficesRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [ BranchOfficesComponent ]
})
export class BranchOfficesModule { }
