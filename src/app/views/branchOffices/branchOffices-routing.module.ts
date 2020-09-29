import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BranchOfficesComponent } from './branchOffices.component';

const routes: Routes = [
  {
    path: '',
    component: BranchOfficesComponent,
    data: {
      title: 'Sucursales'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchOfficesRoutingModule {}
