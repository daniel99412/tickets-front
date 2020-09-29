import { Component, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.scss']
})

export class UsersComponent {

  @ViewChild('infoModal') public infoModal: ModalDirective;

}
