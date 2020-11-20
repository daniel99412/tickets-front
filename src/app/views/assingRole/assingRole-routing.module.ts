import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssingRoleComponent } from './assingRole.component';

const routes: Routes = [
  {
    path: '',
    component: AssingRoleComponent,
    data: {
      title: 'Asignacion'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssingRoleRoutingModule {}
