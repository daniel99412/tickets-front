import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { TicketRoutingModule } from './ticket-routing.module';
import { ChatModule } from '../chat/chat.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TicketRoutingModule,
    ChatModule,
    NgbRatingModule,
    ReactiveFormsModule
  ],
  declarations: [
    ListComponent,
    DetailComponent,
    CreateComponent
  ]
})
export class TicketModule { }
