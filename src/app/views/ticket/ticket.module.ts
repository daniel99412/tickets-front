import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { TicketRoutingModule } from './ticket-routing.module';
import { ChatModule } from '../chat/chat.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TicketComponent } from './ticket/ticket.component';
import { AssignComponent } from './assign/assign.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CategoryService } from '../../services/category.service';

@NgModule({
  imports: [
    CommonModule,
    TicketRoutingModule,
    NgbRatingModule,
    TabsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ChatModule,
  ],
  declarations: [
    ListComponent,
    DetailComponent,
    CreateComponent,
    TicketComponent,
    AssignComponent
  ],
  exports: [
    TicketComponent
  ],
  providers: [
    CategoryService,
    // BranchOfficeService
  ]
})
export class TicketModule { }
