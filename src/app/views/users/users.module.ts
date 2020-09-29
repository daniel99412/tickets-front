import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [
    UsersRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [ UsersComponent ]
})
export class UsersModule { }
