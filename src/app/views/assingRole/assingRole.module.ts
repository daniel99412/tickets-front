import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { AssingRoleComponent } from './assingRole.component';
import { AssingRoleRoutingModule } from './assingRole-routing.module';
import { DragulaModule } from 'ng2-dragula';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AssingRoleRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    DragulaModule.forRoot(),
  ],
  declarations: [ AssingRoleComponent ]
})
export class AssingRoleModule { }
