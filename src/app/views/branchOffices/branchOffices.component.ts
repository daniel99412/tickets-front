import { Component, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  templateUrl: 'branchOffices.component.html',
  styleUrls: ['branchOffices.component.scss']
})

export class BranchOfficesComponent {

  @ViewChild('infoModal') public infoModal: ModalDirective;

}
