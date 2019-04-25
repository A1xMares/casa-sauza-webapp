import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MachinesComponent} from './machines/machines.component';
import {UsersComponent} from './users/users.component';
import {ImportsComponent} from './imports/imports.component';

const pagesRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'maquinaria',
    component: MachinesComponent,
    data: {
      title: 'Maquinaria'
    }
  },
  {
    path: 'usuarios',
    component: UsersComponent,
    data: {
      title: 'Usuarios'
    }
  },
  {
    path: 'importaciones',
    component: ImportsComponent,
    data: {
      title: 'Importaiones'
    }
  }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
