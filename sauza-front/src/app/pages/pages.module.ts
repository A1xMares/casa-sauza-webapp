import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PAGES_ROUTES} from "./pages.routes";
import {MaterialModule} from "../material/material.module";
import {QueryFactory} from "../tableQueries/queryFactory";
import {Menu} from "./menu";
import { DashboardComponent } from './dashboard/dashboard.component';
import { MachinesComponent } from './machines/machines.component';
import { UsersComponent } from './users/users.component';
import { ImportsComponent } from './imports/imports.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    MachinesComponent,
    UsersComponent,
    ImportsComponent
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
})
export class PagesModule { }
