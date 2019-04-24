import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MachinesComponent} from "./machines/machines.component";
import {UsersComponent} from "./users/users.component";
import {ImportsComponent} from "./imports/imports.component";

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
    path: 'machines',
    component: MachinesComponent,
    data: {
      title: 'Machine'
    }
  },
  {
    path: 'users',
    component: UsersComponent,
    data: {
      title: 'Users'
    }
  },
  {
    path: 'imports',
    component: ImportsComponent,
    data: {
      title: 'Imports'
    }
  }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
