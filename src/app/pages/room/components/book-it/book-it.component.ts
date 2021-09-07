import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, takeUntil, tap} from 'rxjs/operators';
import * as moment from 'moment';


@Component({
    selector: 'app-book-it',
    templateUrl: './book-it.component.html',
    styleUrls: ['./book-it.component.scss']
})
export class BookItComponent implements OnInit, OnChanges, OnDestroy {
    @Input() dates: any = {
        start: null,
        end: null
    };
    isOpen: boolean;

    @Output()
    overlayOutsideClick: EventEmitter<MouseEvent>;

    params = {
        adults: 1,
        children: 0,
        babies: 0
    };
    paramsDates: any = {};
    openedDialog = 'openedDialog';
    amountAdults: number = this.params.adults;
    amountChildren: number = this.params.children;
    amountBabies: number = this.params.babies;


    setAdults: Subject<any> = new Subject<any>();
    setChildren: Subject<any> = new Subject<any>();
    setBabies: Subject<any> = new Subject<any>();

    totalAmountGuests: number;
    protected onDestroy = new Subject<void>();


    constructor(private matDialog: MatDialog,
                private route: ActivatedRoute,
                private router: Router
    ) {
    }

    get cannotDecreaseAdults(): boolean {
        return this.amountAdults === 1;
    }

    get cannotIncreaseAdults(): boolean {
        return this.amountAdults >= 3;
    }

    // отрефакторить DRY
    ngOnInit(): void {
        this.subscribeOnChanges();
        this.setQueryParams();
        this.sumTotalAmount();
    }

    sumTotalAmount(): void {
        this.totalAmountGuests = this.amountAdults + this.amountChildren + this.amountBabies;
    }

    subscribeOnChanges(): void {

        this.setAdults
            .pipe(
                debounceTime(100),
                tap((item) => {
                    this.params.adults = item;
                    this.amountAdults = this.params.adults;
                    this.passQueryParams(this.params);
                }),
                takeUntil(this.onDestroy)
            ).subscribe();

        this.setChildren
            .pipe(
                debounceTime(100),
                tap((item) => {
                    console.log(item);
                    this.params.children = item;
                    this.amountChildren = this.params.children;
                    this.passQueryParams(this.params);
                }),
                takeUntil(this.onDestroy)
            ).subscribe();

        this.setBabies
            .pipe(
                debounceTime(100),
                tap((item) => {
                    console.log(item);
                    this.params.babies = item;
                    this.amountBabies = this.params.babies;
                    this.passQueryParams(this.params);
                }),
                takeUntil(this.onDestroy)
            ).subscribe();
    }

    passQueryParams(queryParams): void {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams
        });
    }

    setQueryParams(): void {
        Object.keys(this.route.snapshot.queryParams).forEach((item) => {
            this.params[item] = this.route.snapshot.queryParams[item];
            this.amountAdults = +this.route.snapshot.queryParams.adults;
            this.amountChildren = +this.route.snapshot.queryParams.children;
            this.amountBabies = +this.route.snapshot.queryParams.babies;
        });
        this.passQueryParams(this.params);
    }

    prepareDatesForPassToUrl(dates: any): void {
        // проверяем значение второго ключа для даты
        if (dates.end) {
            Object.assign(this.paramsDates, {start: moment(dates.start).format('YYYY-MM-DD')});
            Object.assign(this.paramsDates, {end: moment(dates.end).format('YYYY-MM-DD')});

            // добавляем параметры для даты в сущ-ий массив параметров
            this.params = {...this.params, ...this.paramsDates};
            this.passQueryParams(this.params);
        }
    }

    openModalGuests(): void {
        this.isOpen = !this.isOpen;
    }

    decreaseCountAdults(): void {
        this.amountAdults--;
        this.setAdults.next(this.amountAdults);
        this.sumTotalAmount();
    }

    increaseCountAdults(): void {
        this.amountAdults++;
        this.setAdults.next(this.amountAdults);
        this.sumTotalAmount();
    }

    decreaseCountChildren(): void {
        this.amountChildren--;
        this.setChildren.next(this.amountChildren);
        this.sumTotalAmount();
    }

    increaseCountChildren(): void {
        this.amountChildren++;
        this.setChildren.next(this.amountChildren);
        this.sumTotalAmount();
    }

    decreaseCountBabies(): void {
        this.amountBabies--;
        this.setBabies.next(this.amountBabies);
        this.sumTotalAmount();
    }

    increaseCountBabies(): void {
        this.amountBabies++;
        this.setBabies.next(this.amountBabies);
        this.sumTotalAmount();
    }


    ngOnChanges(changes: SimpleChanges): void {
        // следим за изменениями дат

        if (this.dates) {
            this.prepareDatesForPassToUrl(this.dates);
        }
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }

    bookIt(): void {
        const order = {roomId: this.route.snapshot.params.id, ...this.params};
        localStorage.setItem('order', JSON.stringify(order));
    }
}
