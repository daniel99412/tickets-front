import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [ChatComponent, MessageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TooltipModule.forRoot()
  ],
  exports: [
    ChatComponent
  ]
})
export class ChatModule { }
