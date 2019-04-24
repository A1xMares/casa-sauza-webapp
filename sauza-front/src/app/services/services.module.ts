import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {SessionGuard} from "./guards/session.guard";
import {AuthService} from "./auth/auth.service";
import {ApiService} from "./api/api.service";
import {LoadingService} from "./loading/loading.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    AuthService,
    SessionGuard,
    LoadingService
  ]
})
export class ServicesModule { }
