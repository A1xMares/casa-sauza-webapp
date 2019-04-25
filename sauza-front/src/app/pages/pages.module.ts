import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PAGES_ROUTES} from './pages.routes';
import {MaterialModule} from '../material/material.module';
import {QueryFactory} from '../tableQueries/queryFactory';
import {Menu} from './menu';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MachinesComponent } from './machines/machines.component';
import { UsersComponent } from './users/users.component';
import { ImportsComponent } from './imports/imports.component';
import { MachineComponent } from './machines/machine/machine.component';
import {ModalConfirmComponent} from '../modals/modal-confirm/modal-confirm.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MachinesComponent,
    UsersComponent,
    ImportsComponent,
    MachineComponent,
    ModalConfirmComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PAGES_ROUTES,
    MaterialModule,
    FormsModule,
  ],
  providers: [
    Menu,
    QueryFactory
  ],
  entryComponents: [
    ModalConfirmComponent,
    MachineComponent,
    ModalConfirmComponent
  ]
})
export class PagesModule { }
