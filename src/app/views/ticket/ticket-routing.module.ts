import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Tickets',
    },
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: ListComponent,
        data: {
          title: 'List'
        }
      },
      {
        path: 'view/:id',
        component: DetailComponent,
        data: {
          title: 'Detail',
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
