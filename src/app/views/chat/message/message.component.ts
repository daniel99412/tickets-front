import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() ticket: any;
  @Input() from: any;
  @Input() to: any;
  @Input() message: any;
  @Input() type: any;
  @Input() date;
  user;
  messageColor;
  moment = moment;

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));

    moment(this.date).format('LT');
  }

  setMessageColor(): string {
    if (this.user._id === this.from._id) {
      return 'sender'
    } else {
      return 'receiver';
    }
  }
}
