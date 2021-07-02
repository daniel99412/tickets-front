import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'tickets',
        loadChildren: () => import('./views/ticket/ticket.module').then(m => m.TicketModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./views/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'roles',
        loadChildren: () => import('./views/roles/roles.module').then(m => m.RolesModule)
      },
      {
        path: 'branchOffices',
        loadChildren: () => import('./views/branchOffices/branchOffices.module').then(m => m.BranchOfficesModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./views/categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'subcategories',
        loadChildren: () => import('./views/subcategories/subcategories.module').then(m => m.SubcategoriesModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
