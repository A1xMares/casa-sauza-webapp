import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {MatDialog, MatSort} from '@angular/material';
import {ApiService} from '../../services/api/api.service';
import {Router} from '@angular/router';
import {QueryFactory} from '../../tableQueries/queryFactory';
import {FormControl} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {MachineComponent} from './machine/machine.component';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnDestroy, AfterViewInit, OnInit {
  // --------------------------- //
  // Local variables declaration //
  // --------------------------- //
  /* manage component */
  @ViewChildren('displayData') displayElem: QueryList<any>;
  @ViewChildren('noData') noDisplayElem: QueryList<any>;
  private onDestroy = new Subject<void>();
  public firstLoad = true;
  /* manage table */
  public displayData = new BehaviorSubject<boolean>(false);
  public totalCount = 0;
  /* manage searchbar */
  public timer;
  /* manage content */
  public areas: any[] = [];
  public machineTypes: any[] = [];
  public machines: any[] = [];
  // --------------------- //
  // Component constructor //
  // --------------------- //
  constructor(
    private apiService: ApiService,
    public router: Router,
    public queryFactory: QueryFactory,
    public dialog: MatDialog
  ) { }
  // -------------------------------------- //
  // Form inputs & validations declaration  //
  // -------------------------------------- //
  public searchbar = new FormControl({value: '', disabled: false});
  public area = new FormControl({value: '', disabled: false});
  public type = new FormControl({value: '', disabled: false});
  // --------------------- //
  // On view init cycle //
  // --------------------- //
  ngOnInit(): void {
     this.apiService.getDataObjects('areas').pipe(takeUntil(this.onDestroy)).subscribe((areas: any) => {
       this.areas = areas;
     });
     this.apiService.getDataObjects('machine_types').pipe(takeUntil(this.onDestroy)).subscribe((types: any) => {
      this.machineTypes = types;
     });
  }
  // --------------------- //
  // After view init cycle //
  // --------------------- //
  ngAfterViewInit() {
    /* on search change (managing 250 ms) */
    this.searchbar.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe( (dataSearch) => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.loadMachines(dataSearch, this.area.value, this.type.value);
      }, 250);
    });
    /* listener when data load finish */
    this.displayData.asObservable().pipe(takeUntil(this.onDestroy)).subscribe(isData => this.showData(isData));
    /* first table load */
    this.loadMachines('', '', '');
  }
  // --------------------------------------------------//
  // Method to show  data depending on request results //
  // --------------------------------------------------//
  showData(isData: boolean) {
    this.displayElem.forEach((elem: ElementRef) => {
      if (isData) {
        if (elem.nativeElement.classList.contains('hidden')) {
          elem.nativeElement.classList.remove('hidden');
        }
      } else {
        if (!elem.nativeElement.classList.contains('hidden')) {
          elem.nativeElement.classList.add('hidden');
        }
      }
    });
    this.noDisplayElem.forEach((noElem: ElementRef) => {
      if (isData) {
        if (!noElem.nativeElement.classList.contains('hidden')) {
          noElem.nativeElement.classList.add('hidden');
        }
      } else {
        if (noElem.nativeElement.classList.contains('hidden')) {
          noElem.nativeElement.classList.remove('hidden');
        }
      }
    });
  }
  // ------------------------------------------------------//
  // Method to load table data (paginate, filter and sort) //
  // ------------------------------------------------------//
  private loadMachines(dataSearch: string, area: string, type: string) {
    /* set search query */
    const searchObject = this.queryFactory.setSearchQuery(dataSearch, ['machine_name']);
    const typeQuery = type !== '' ? { machine_typeId: type } : {};
    const areaQuery = area !== '' ? { areaId: area } : {};
    /* set query properties */
    const query = 'machines?filter=' + JSON.stringify({
      where: {
        and: [
          searchObject,
          typeQuery,
          areaQuery
        ]
      },
      include: [
        {
          relation: 'machine_type'
        },
        {
          relation: 'area'
        }
      ]
    });
    console.log(query);
    /* preform count request */
    this.apiService.getDataObjects(query).pipe(takeUntil(this.onDestroy)).subscribe((machines: any) => {
      console.log(machines);
      this.totalCount = machines.length;
      if (this.totalCount > 0) {
        this.machines = machines;
          this.firstLoad ? this.firstLoad = false : null;
          /* notify result */
          this.displayData.next(true);
      } else {
        this.machines = [];
        this.firstLoad ? this.firstLoad = false : null;
        /* notify result */
        this.displayData.next(false);
      }
    });
  }
  // ----------------- //
  // Open user function //
  // ----------------- //
  public openMachine(data: any) {
    const dialogRef = this.dialog.open(MachineComponent, {
      data: {
        machine: data,
        title: 'Maquinaria',
        isNew: false
      },
      autoFocus: false,
      width: '800px'
    });
    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy)).subscribe(() => {
      this.loadMachines(this.searchbar.value, this.area.value, this.type.value);
    });
  }
  // ----------------- //
  // New machine function //
  // ----------------- //
  public newMachine() {
    const dialogRef = this.dialog.open(MachineComponent, {
      data: {
        machine: {},
        title: 'Nueva maquinaria',
        isNew: true
      },
      autoFocus: false,
      width: '800px'
    });
    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy)).subscribe(() => {
      this.loadMachines(this.searchbar.value, this.area.value, this.type.value);
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
