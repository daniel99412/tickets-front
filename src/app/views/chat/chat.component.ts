import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

const MESSAGES = [
  {
    howSend: "receiver",
    message: "algo",
    hour: moment().format("LT"),
    type: "message",
    person: "Elver Galarga",
  },
  {
    howSend: "sender",
    message: "algo",
    hour: moment().format("LT"),
    type: "message",
    person: "Elver Galarga",
  },
  {
    howSend: "receiver",
    message: "algo",
    hour: moment().format("LT"),
    type: "message",
    person: "Elver Galarga",
  },
  {
    howSend: "sender",
    message: "algo",
    hour: moment().format("LT"),
    type: "message",
    person: "Elver Galarga",
  },
  {
    howSend: "sender",
    message: "algo",
    hour: moment().format("LT"),
    type: "message",
    person: "Elver Galarga",
  },
  {
    howSend: "sender",
    message: "algo",
    hour: moment().format("LT"),
    type: "file",
    person: "Elver Galarga",
  },
  {
    howSend: "sender",
    message: "algo",
    hour: moment().format("LT"),
    type: "message",
    person: "Elver Galarga",
  },
  {
    howSend: "receiver",
    message: "algo",
    hour: moment().format("LT"),
    type: "message",
    person: "Elver Galarga",
  },
];


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages = MESSAGES;
  file = new FormControl('');
  message = new FormControl('');

  constructor(public element: ElementRef) {}

  ngOnInit(): void {
    this.file.valueChanges.subscribe( filePath => {
      this.message.setValue(filePath);
      this.message.disable();
    });
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
}
