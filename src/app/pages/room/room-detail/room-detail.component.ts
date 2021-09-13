import {AfterContentChecked, ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DateRange, MatCalendar} from '@angular/material/datepicker';
import {CustomCalendarHeaderComponent} from '../components/custom-calendar-header/custom-calendar-header.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable, of, Subject} from 'rxjs';
import {FavoritesService} from '../../../services/favorites.service';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-room-detail',
    templateUrl: './room-detail.component.html',
    styleUrls: ['./room-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomDetailComponent implements OnInit, AfterContentChecked {
    images: any;
    selected: DateRange<Date>;


    startDate: Date = new Date();
    endDate: Date = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 1);

    selectedDateRange: DateRange<Date>;
    @ViewChild('calendarLeft', {static: false}) calendarLeft: MatCalendar<Date>;
    @ViewChild('calendarRight', {static: false}) calendarRight: MatCalendar<Date>;
    headerComponent = CustomCalendarHeaderComponent;
    minDateToChoice: Date = new Date();
    disabledMinDate = true;
    setFavoriteSubj: Subject<any> = new Subject<any>();
    favorites$: Observable<any> = new Observable<any>();
    favorites: any = localStorage.getItem('favorites');
    favoritesTest: any = localStorage.getItem('favorites');
    disCounter: number = new Date().getMonth();

    dates: any = {
        start: '',
        end: ''
    };

    subj: Subject<any> = new Subject<any>();
    deleteItem: number;
    addItem: number;
    disableButton$: Subject<any> = new Subject<any>();
    disable: boolean;

    constructor(private matDialog: MatDialog,
                private route: ActivatedRoute,
                private router: Router,
                private snackBar: MatSnackBar,
                private favoritesService: FavoritesService) {

    }

    ngAfterContentChecked(): void {
        this.disableButtonFavorites(this.disable);
    }

    disableButtonFavorites(disable?: boolean): void {
        this.disableButton$.next(disable);
    }

    ngOnInit(): void {
        this.getDatesFromUrl();
        this.subscribeOnFavorites();
        this.getFavorites().subscribe(res => {
            res.forEach((item) => {
                if (item.id === +this.route.snapshot.params.id) {
                    this.disable = true;
                }
            });
        });
    }


    addFavorite(): void {
        if (!this.favorites) {
            localStorage.setItem('favorites', JSON.stringify([{id: +this.route.snapshot.params.id}]));
        } else {
            this.favoritesTest.push({id: +this.route.snapshot.params.id});
            this.subj.next(this.favoritesTest);
            localStorage.setItem('favorites', JSON.stringify(this.favoritesTest));
            this.setFavoriteSubj.subscribe((res) => {
                this.disable = true;
                this.favoritesService.setFavorite(res);
            });
            this.setFavoriteSubj.next({id: +this.route.snapshot.params.id});
        }
    }

    removeFromFavorites(id: number): void {
        this.favoritesTest = this.favoritesTest.filter((item) => {
                return item.id !== id;
            }
        );
        this.subj.next(this.favoritesTest);
        localStorage.setItem('favorites', JSON.stringify(this.favoritesTest));
    }

    getFavorites(): Observable<any> {
        return of(JSON.parse(this.favoritesTest)).pipe(tap(data => {
            this.favoritesTest = data;
            this.subj.next(this.favoritesTest);
        }));
    }


    subscribeOnFavorites(): void {
        const arrayFavorites = JSON.parse(this.favorites);
        // создаем поток из элементов localstorage
        this.favorites$ = new Observable<any>(obs => {
            obs.next(arrayFavorites);
        });
        this.favorites$.subscribe(resp => {
            console.log(resp, 'favorites$');
        });
        // подписываемся на события из сервиса, который передает элементы из room-detail в компонент favorites
        this.favoritesService.unsetEmit.subscribe(res => {
            this.removeFromFavorites(res.id);
            if (res) {
                this.disable = false;
            }

        });

    }


    passRange(): void {

        if (!Object.keys(this.route.snapshot.queryParams).length ||
            !this.route.snapshot.queryParams.start) {
            return;
        }
        this.selectedDateRange = new DateRange((() => {
            const start = this.dates.start;
            start.setDate(start.getDate());
            return start;
        })(), this.dates.end);
        this.selected = this.dates;

        this.startDate = this.dates.start;
        this.endDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 1);
    }

    getDatesFromUrl(): void {
        if (this.route.snapshot.queryParams.start && this.route.snapshot.queryParams.end) {
            this.dates.start = new Date(this.route.snapshot.queryParams.start);
            this.dates.end = new Date(this.route.snapshot.queryParams.end);
        }
        this.passRange();
    }

    disabledButtonPrev(): boolean {
        if (this.minDateToChoice.getMonth() === this.disCounter) {
            return true;
        }
        if (this.disCounter > this.minDateToChoice.getMonth()) {
            return false;
        }
    }

    _onSelectedChange(date: Date): void {
        if (
            this.selectedDateRange &&
            this.selectedDateRange.start &&
            date > this.selectedDateRange.start &&
            !this.selectedDateRange.end
        ) {
            this.selectedDateRange = new DateRange(
                this.selectedDateRange.start,
                date
            );
            this.selected = this.selectedDateRange;

            console.log(this.selectedDateRange, 'all');
        } else {
            this.selectedDateRange = new DateRange(date, null);
            console.log(this.selectedDateRange, 'one');
        }
    }

    openModalReview($event): void {
        console.log($event);
    }

    clearDates(): void {
        this.selected = null;
        this.selectedDateRange = null;
        const queryParams = {...this.route.snapshot.queryParams};
        delete queryParams.start;
        delete queryParams.end;

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams
        });
    }

    nextMonth(): void {
        this.disCounter++;
        this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1);
        this.calendarLeft._goToDateInView(this.startDate, 'month');
        this.calendarRight._goToDateInView(new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1), 'month');
    }

    prevMonth(): void {
        this.disCounter--;
        this.startDate = new Date(this.startDate.getFullYear(), this.disCounter);
        this.endDate = new Date(this.endDate.getFullYear(), this.endDate.getMonth() - 1);


        this.calendarLeft._goToDateInView(new Date(this.endDate.getFullYear(), this.disCounter), 'month');
        this.calendarRight._goToDateInView(new Date(this.startDate.getFullYear(), this.disCounter + 1), 'month');
    }
}


