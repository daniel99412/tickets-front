import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() howSend: string;
  @Input() message: string;
  @Input() hour: string;
  @Input() type: string;
  @Input() person: string;

  constructor() { }

  ngOnInit(): void {
  }

}
