import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MessageComponent } from './message/message.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
  declarations: [ChatComponent, MessageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    PickerModule
  ],
  exports: [
    ChatComponent
  ]
})
export class ChatModule { }
