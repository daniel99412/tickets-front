import { Component, ElementRef, Input, OnInit, SecurityContext } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { MessageService } from '../../services/message.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() socket;
  @Input() ticket;
  user;
  messages = [];
  file = new FormControl('');
  message = new FormControl('');
  html: string = ``;
  isEmojiPickerVisible: boolean;
  
  constructor(
    public element: ElementRef,
    public messageService: MessageService,
    private toastrService: ToastrService,
    sanitizer: DomSanitizer
  ) {
    this.html = sanitizer.sanitize(SecurityContext.HTML, this.html);
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.refreshMessages();
    
    let roomJoined = {
      'room': this.ticket._id,
      'user': this.user
    };

    this.socket.emit('join-room', roomJoined);
    this.file.valueChanges.subscribe( filePath => {
      this.message.setValue(filePath);
      this.message.disable();
    });
    
    this.socket.on('joined-room', (data) => {
      if (data) {
        this.toastrService.info(data);
        this.refreshMessages();
      }
    })

    this.socket.on('new-message', (data) => {
      if (data) {
        this.refreshMessages();
      }
    })
  }

  refreshMessages() {
    this.messageService.getByTicket(this.ticket._id)
      .pipe(
        tap(messages => {
          this.messages = _.orderBy(messages, ['date'], ['desc']);
        })
      ).subscribe();
  }

  public openFileUpload(): void {
    document.getElementById('file').click();
  }

  public deleteFile(): void {
    this.file.setValue(null);
    this.message.enable();
    this.message.setValue(null);
  }

  public autoscroll(event): void {
    const textarea = this.element.nativeElement.getElementsByTagName('textarea')[0];
    textarea.style.height = 'auto';
    textarea.style.height = (event.target.scrollHeight) + 'px';
  }

  send() {
    let to = [];
    let type;

    this.ticket.assignedTo.forEach(element => {
      to.push({
        'person': element,
        'seen': false
      })
    });

    let messageToSend = {
      ticket: this.ticket,
      from: this.user,
      to: to,
      message: this.message.value,
      type: 'message'
    }

    this.message.reset();

    this.messageService.save(messageToSend)
      .pipe(
        tap(ticket => {
          this.socket.emit('message-send', this.ticket._id);
          this.refreshMessages();
        })
      ).subscribe();
  }

  emojiSelected(event) {
    this.message.setValue(this.message.value + ' ' + event.emoji.native + ' ');
  }
}
