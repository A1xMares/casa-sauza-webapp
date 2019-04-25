import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {LoadingService} from '../../services/loading/loading.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  // --------------------------- //
  // Local variables declaration //
  // --------------------------- //
  private onDestroy = new Subject<void>();
  // --------------------- //
  // Component constructor //
  // --------------------- //
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService
  ) {
    console.log(new Date().toISOString());
  }
  // --------------------- //
  // FormGroup declaration //
  // --------------------- //
  public loginForm = this.fb.group({
    username: new FormControl({value: '', disabled: false}, Validators.required),
    password: new FormControl({value: '', disabled: false}, Validators.required)
  });
  // ---------------------- //
  // Perform login function //
  // ---------------------- //
  performLogin() {
    if (this.loginForm.status === 'INVALID') {
      this.presentToast('Campos inválidos');
    } else {
      this.loadingService.showLoader.next(true);
      this.authService.login(
        {
          username: this.loginForm.get('username').value,
          password: this.loginForm.get('password').value
        }
      ).pipe(takeUntil(this.onDestroy)).subscribe((user: any) => {
        if (user) {
          localStorage.setItem('username', this.loginForm.get('username').value);
          this.router.navigate(['/dashboard']).then(() => {
            this.loadingService.showLoader.next(false);
          });
        }
      }, (err) => {
        this.loadingService.showLoader.next(false);
        this.presentToast('Error de conexión');
      });
    }
  }
  // --------------------------- //
  // Show toast on invalid login //
  // --------------------------- //
  presentToast(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['yellow-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: document.documentElement.clientWidth >= 1050 ? 'top' : 'bottom'
    });
  }
  // -------------------- //
  // On destroy lifecycle //
  // -------------------- //
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
