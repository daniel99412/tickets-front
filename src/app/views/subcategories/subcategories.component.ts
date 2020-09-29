import { Component, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  templateUrl: 'subcategories.component.html',
  styleUrls: ['subcategories.component.scss']
})

export class SubcategoriesComponent {

  @ViewChild('infoModal') public infoModal: ModalDirective;

}
