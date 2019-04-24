import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.authService.currentUserValue;
        const isLogin = request.url.includes('login');
        if (currentUser && currentUser.id && !request.url.includes('login')) {
            request = request.clone({
                setHeaders: {
                    Authorization: currentUser.id
                }
            });
        }
        return next.handle(request);
    }
}
