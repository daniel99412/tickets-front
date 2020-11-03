import { Component, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  templateUrl: 'roles.component.html',
  styleUrls: ['roles.component.scss']
})

export class RolesComponent {
  @ViewChild('infoModal') public infoModal: ModalDirective;
  role = new FormControl();
}
