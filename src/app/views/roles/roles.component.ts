import { Component, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  templateUrl: 'roles.component.html',
  styleUrls: ['roles.component.scss']
})

export class RolesComponent {

  @ViewChild('infoModal') public infoModal: ModalDirective;

}
