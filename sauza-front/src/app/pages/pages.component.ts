import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ApiService} from '../services/api/api.service';
import {Router} from '@angular/router';
import {Menu} from './menu';
import {AuthService} from '../services/auth/auth.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();
  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  @ViewChild('drawer') drawer;
  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    public apiService: ApiService,
    public router: Router,
    private menu: Menu,
    private authService: AuthService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 1050px)');
    this.mobileQueryListener = () => {
      changeDetectorRef.detectChanges();
      if (this.mobileQuery.matches) {
        if (this.drawer._opened) {
          this.drawer.toggle();
        }
      } else {
        const toggleState = localStorage.getItem('sideNav') === 'true' ? 'true' : 'false';
        toggleState === 'true' ? this.drawer.toggle() : this.drawer.close();
      }
    };
    this.mobileQuery.addListener(this.mobileQueryListener);
  }
  ngOnInit() {
    const toggleState = localStorage.getItem('sideNav') === 'true' ? 'true' : 'false';
    if (!this.mobileQuery.matches) {
      toggleState === 'true' ? this.drawer.toggle()  : this.drawer.close();
    }
  }
  toggle() {
    if (this.mobileQuery.matches) {
      this.drawer.toggle();
    }
  }
  toggleSide() {
    this.drawer.toggle();
    if (!this.mobileQuery.matches) {
      const toggle = this.drawer._opened;
      localStorage.setItem('sideNav', toggle);
    }
  }
  logout() {
    this.authService.logout(true);
  }
  // -------------------- //
  // On destroy lifecycle //
  // -------------------- //
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
