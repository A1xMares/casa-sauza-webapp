import { Injectable, OnDestroy} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject} from 'rxjs';
import { map, takeUntil} from 'rxjs/operators';
import { Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  // --------------------------- //
  // Local variables declaration //
  // --------------------------- //
  private url = 'http://localhost:3000/api/';
  private currentUserSubject: BehaviorSubject<any>;
  private onDestroy = new Subject<void>();
  public userObservable: Observable<any>;
  public currentUser: Observable<any>;
  // ------------------- //
  // Service constructor //
  // ------------------- //
  constructor(
      private http: HttpClient,
      private router: Router,
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.userObservable = this.currentUserSubject.asObservable();
  }
  // ------------------------ //
  // Get value of logged user //
  // ------------------------ //
  public get currentUserValue(): any {
    return this.currentUserSubject.getValue();
  }
  // --------------------- //
  // Perform login request //
  // --------------------- //
  login(credentials: any) {
    return this.http.post(this.url + 'AppUsers/login?include=user', credentials).pipe(map((user: any) => {
      if (user && user.id) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
      return user;
    }));
  }
  // ---------------------- //
  // Perform logout request //
  // ---------------------- //
  logout(req: boolean) {
    if (req) {
      this.http.post<any>(
          this.url + 'AppUsers/logout',
          '',
      ).pipe(takeUntil(this.onDestroy)).subscribe(() => {
        this.cleanSession();
      }, () => {
        this.cleanSession();
      });
    } else {
      this.cleanSession();
    }
  }
  // ------------------ //
  // Clean localstorage //
  // ------------------ //
  cleanSession() {
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
    }
    this.router.navigate(['/login']);
    this.currentUserSubject.next(false);
  }
  // -------------------- //
  // On destroy lifecycle //
  // -------------------- //
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
