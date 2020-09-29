import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { RolesComponent } from './roles.component';
import { RolesRoutingModule } from './roles-routing.module';

@NgModule({
  imports: [
    RolesRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [ RolesComponent ]
})
export class RolesModule { }
