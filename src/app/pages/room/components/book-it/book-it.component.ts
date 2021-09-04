import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {debounce, debounceTime, tap} from 'rxjs/operators';

@Component({
  selector: 'app-book-it',
  templateUrl: './book-it.component.html',
  styleUrls: ['./book-it.component.scss']
})
export class BookItComponent implements OnInit {
  @Input('dates') dates: any
  isOpen: boolean;

  @Output()
  overlayOutsideClick: EventEmitter<MouseEvent>

  params = {
    adults: 1,
    children: 0,
    babies: 0
  }
  minWidth: number | string = '900px'
  openedDialog: string = 'openedDialog';
  countAdults: number = this.params.adults;
  countChildren: number = this.params.children;
  countBabies: number = this.params.babies;







  setAdults: Subject<any>= new Subject<any>();
  setChildren: Subject<any>= new Subject<any>();
  setBabies: Subject<any>= new Subject<any>();
  subscription: Subscription;



  totalCountOfGuests: number = 1;




  constructor(private matDialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router
              ) { }



  ngOnInit(): void {
    this.subscribeOnChanges()
    this.setQueryParams()
  }



  subscribeOnChanges() {

      this.subscription = this.setAdults
          .pipe(
              debounceTime(100),
              tap((item)=> {
                this.params.adults = item
                this.passQueryParams(this.params)
                this.countAdults = this.params.adults
              }),
          ).subscribe()

    this.subscription = this.setChildren
        .pipe(
            debounceTime(100),
            tap((item)=> {
              console.log(item);
              this.params.children = item
              this.passQueryParams(this.params)
              this.countChildren = this.params.children
            }),
        ).subscribe();

    this.subscription = this.setBabies
        .pipe(
            debounceTime(100),
            tap((item)=> {
              console.log(item);
              this.params.babies = item
              this.passQueryParams(this.params)
              this.countBabies = this.params.babies
            }),
        ).subscribe()
  }

  passQueryParams(queryParams) {

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams
    })
  }

  setQueryParams() {
    Object.keys(this.route.snapshot.queryParams).forEach((item) => {
      this.params[item] = +this.route.snapshot.queryParams[item];
      this.countChildren = +this.route.snapshot.queryParams['children'];
      this.countAdults = +this.route.snapshot.queryParams['adults'];
      this.countBabies = +this.route.snapshot.queryParams['babies'];
    })
  }


  openModalGuests() {
    this.isOpen = !this.isOpen
  }


  decreaseCountAdults() {
    this.countAdults--
    this.setAdults.next(this.countAdults)
  }

  increaseCountAdults() {
    this.countAdults++
    this.setAdults.next(this.countAdults)
  }

  decreaseCountChildren() {
    this.countChildren--
    this.setChildren.next(this.countChildren)
  }

  increaseCountChildren() {
    this.countChildren++
    this.setChildren.next(this.countChildren)
  }

  decreaseCountBabies() {
    this.countBabies--
    this.setBabies.next(this.countBabies)
  }

  increaseCountBabies() {
    this.countBabies++
    this.setBabies.next(this.countBabies)
  }
}
