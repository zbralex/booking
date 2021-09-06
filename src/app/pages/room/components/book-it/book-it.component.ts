import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {debounce, debounceTime, tap} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    selector: 'app-book-it',
    templateUrl: './book-it.component.html',
    styleUrls: ['./book-it.component.scss']
})
export class BookItComponent implements OnInit, OnChanges {
    @Input('dates') dates: any = {
        start: Date,
        end: Date
    };
    isOpen: boolean;
    datesParams = {
        start:  new Date(),
        end: new Date()
    }

    @Output()
    overlayOutsideClick: EventEmitter<MouseEvent>;

    params = {
        adults: 1,
        children: 0,
        babies: 0
    };
    paramsDates: any = {}
    openedDialog: string = 'openedDialog';
    amountAdults: number =  this.params.adults;
    amountChildren: number = this.params.children;
    amountBabies: number = this.params.babies;


    setAdults: Subject<any> = new Subject<any>();
    setChildren: Subject<any> = new Subject<any>();
    setBabies: Subject<any> = new Subject<any>();
    subscription: Subscription;
    totalAmountGuests: number;



    constructor(private matDialog: MatDialog,
                private route: ActivatedRoute,
                private router: Router
    ) {
    }


    ngOnInit(): void {
        this.subscribeOnChanges();
        this.setQueryParams();
        this.sumTotalAmount();
    }

    sumTotalAmount() {
        this.totalAmountGuests = this.amountAdults + this.amountChildren + this.amountBabies;
    }
    subscribeOnChanges() {

        this.subscription = this.setAdults
            .pipe(
                debounceTime(100),
                tap((item) => {
                    this.params.adults = item;
                    this.amountAdults = this.params.adults;
                    this.passQueryParams(this.params);
                }),
            ).subscribe();

        this.subscription = this.setChildren
            .pipe(
                debounceTime(100),
                tap((item) => {
                    console.log(item);
                    this.params.children = item;
                    this.amountChildren = this.params.children;
                    this.passQueryParams(this.params);
                }),
            ).subscribe();

        this.subscription = this.setBabies
            .pipe(
                debounceTime(100),
                tap((item) => {
                    console.log(item);
                    this.params.babies = item;
                    this.amountBabies = this.params.babies;
                    this.passQueryParams(this.params);
                }),
            ).subscribe();
    }

    passQueryParams(queryParams) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams
        });
    }

    setQueryParams() {
        Object.keys(this.route.snapshot.queryParams).forEach((item) => {
            this.params[item] = this.route.snapshot.queryParams[item];
            this.amountAdults = +this.route.snapshot.queryParams['adults'];
            this.amountChildren = +this.route.snapshot.queryParams['children'];
            this.amountBabies = +this.route.snapshot.queryParams['babies'];
        });
        this.passQueryParams(this.params)
    }
    prepareDatesForPassToUrl(dates: any) {
        // проверяем значение второго ключа для даты
        if (dates['end']) {
            Object.assign(this.paramsDates, {start: moment(dates.start).format('YYYY-MM-DD')})
            Object.assign(this.paramsDates, {end: moment(dates.end).format('YYYY-MM-DD')});

            // добавляем параметры для даты в сущ-ий массив параметров
            this.params = {...this.params, ...this.paramsDates}
            this.passQueryParams(this.params)
        }
    }


    openModalGuests() {
        this.isOpen = !this.isOpen;
    }

    // отрефакторить DRY
    decreaseCountAdults() {
        this.amountAdults--;
        this.setAdults.next(this.amountAdults);
        this.sumTotalAmount()
    }

    increaseCountAdults() {
        this.amountAdults++;
        this.setAdults.next(this.amountAdults);
        this.sumTotalAmount()
    }

    decreaseCountChildren() {
        this.amountChildren--;
        this.setChildren.next(this.amountChildren);
        this.sumTotalAmount()
    }

    increaseCountChildren() {
        this.amountChildren++;
        this.setChildren.next(this.amountChildren);
        this.sumTotalAmount()
    }

    decreaseCountBabies() {
        this.amountBabies--;
        this.setBabies.next(this.amountBabies);
        this.sumTotalAmount()
    }

    increaseCountBabies() {
        this.amountBabies++;
        this.setBabies.next(this.amountBabies);
        this.sumTotalAmount()
    }


    ngOnChanges(changes: SimpleChanges): void {
        // следим за изменениями дат

        if (this.dates) {
            this.prepareDatesForPassToUrl(this.dates)
        }
    }

}
