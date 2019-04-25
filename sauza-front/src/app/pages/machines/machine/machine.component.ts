import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ApiService} from '../../../services/api/api.service';
import {LoadingService} from '../../../services/loading/loading.service';
import {takeUntil} from 'rxjs/operators';
import {ModalConfirmComponent} from '../../../modals/modal-confirm/modal-confirm.component';

export interface dataIn {
  machine: any;
  title: string;
  isNew: boolean;
}

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnDestroy, OnInit {
// --------------------------- //
  // Local variables declaration //
  // --------------------------- //
  private onDestroy = new Subject<void>();
  // --------------------- //
  // Component constructor //
  // --------------------- //
  constructor(
    private dialogRef: MatDialogRef<MachineComponent>,
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dataIn: dataIn
  ) { }
  // --------------------------------------//
  // Form inputs & validations declaration //
  // --------------------------------------//
  addForm = this.fb.group({
    name: new FormControl({value: '', disabled: false}, Validators.required),
  });
  // ------------------ //
  // On view init cycle //
  // ------------------ //
  ngOnInit() {
    if (this.dataIn.machine) {
      this.addForm.patchValue({
        name: this.dataIn.machine.machine_name
      });
    }
  }
  // ----------------------------//
  // Add data object to database //
  // ----------------------------//
  performRequest() {
    if (this.addForm.status === 'INVALID') {
      this.presentToast('Error in form', 'yellow-snackbar');
    } else {
      if (this.dataIn.isNew) {
        /* if is new */
        const newProduct = {
          name: this.addForm.get('name').value
        };
        /* perform add request */
        this.apiService.addDataObject(newProduct, 'Products').pipe(takeUntil(this.onDestroy)).subscribe(() => {
          this.presentToast('Product created succesfullly', 'green-snackbar');
          this.loadingService.showLoader.next(false);
          this.onNoClick();
        }, () => {
          this.presentToast('Connection rejected', 'red-snackbar');
          this.loadingService.showLoader.next(false);
        });
      } else {
        /* if is not new */
        const editProduct = {
          name: this.addForm.get('name').value
        };
        /* perform edit request */
        this.apiService.editDataObject(this.dataIn.machine.id, editProduct, 'Products').pipe(takeUntil(this.onDestroy)).subscribe(() => {
          this.presentToast('User edited succesfullly', 'green-snackbar');
          this.loadingService.showLoader.next(false);
          this.onNoClick();
        }, (e) => {
          this.presentToast('Connection rejected', 'red-snackbar');
          this.loadingService.showLoader.next(false);
        });
      }
    }
  }
  // -------------------------------//
  // Delete data object on database //
  // -------------------------------//
  deleteObject() {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        button: 'Delete',
        title: 'Product',
        subtitle: '¿Are you sure about deleting this product?',
        message: [
        ]
      },
      autoFocus: false
    });
    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy)).subscribe(result => {
      if (result !== undefined) {
        if (result.confirmation) {
          this.apiService.deleteDataObject('Products', this.dataIn.machine.id).pipe(takeUntil(this.onDestroy)).subscribe(() => {
            this.presentToast('Product deleted succesfullly', 'green-snackbar');
            this.onNoClick();
          });
        }
      }
    });
  }
  // ----------------------------//
  // Present toast method //
  // ----------------------------//
  presentToast(message: string, style: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: [style],
      horizontalPosition: 'end',
      verticalPosition: document.documentElement.clientWidth >= 1050 ? 'top' : 'bottom'
    });
  }
  // -------------------//
  // Close modal method //
  // -------------------//
  onNoClick(): void {
    this.dialogRef.close();
  }
  // -------------------- //
  // On destroy lifecycle //
  // -------------------- //
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
