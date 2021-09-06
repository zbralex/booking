import {ChangeDetectionStrategy, Component, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DateRange, MatCalendar} from '@angular/material/datepicker';
import {CustomCalendarHeaderComponent} from '../components/custom-calendar-header/custom-calendar-header.component';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'app-room-detail',
    templateUrl: './room-detail.component.html',
    styleUrls: ['./room-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomDetailComponent implements OnInit {
    images: any;
    selected: DateRange<Date>;


    startDate: Date = new Date();
    endDate: Date = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 1);

    selectedDateRange: DateRange<Date>;
    @ViewChild('calendarLeft', {static: false}) calendarLeft: MatCalendar<Date>;
    @ViewChild('calendarRight', {static: false}) calendarRight: MatCalendar<Date>;
    headerComponent = CustomCalendarHeaderComponent;
    minDateToChoice: Date = new Date();
    disabledMinDate: boolean = true;

    disCounter: number = new Date().getMonth();

    dates: any = {
        start: '',
        end: ''
    };

    constructor(private matDialog: MatDialog, private route: ActivatedRoute, private router: Router) {

    }


    ngOnInit(): void {
        this.getDatesFromUrl();
    }


    passRange() {

        if (!Object.keys(this.route.snapshot.queryParams).length ||
            !this.route.snapshot.queryParams['start']) {
            return;
        }
        this.selectedDateRange = new DateRange((() => {
            let start = this.dates.start;
            start.setDate(start.getDate());
            return start;
        })(), this.dates.end);
        this.selected = this.dates;

        this.startDate = this.dates.start;
        this.endDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 1);
    }

    getDatesFromUrl() {
        if (this.route.snapshot.queryParams['start'] && this.route.snapshot.queryParams['end']) {
            this.dates.start = new Date(this.route.snapshot.queryParams['start']);
            this.dates.end = new Date(this.route.snapshot.queryParams['end']);
        }
        this.passRange();
    }

    disabledButtonPrev() {
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

    openModalReview($event) {
        console.log($event);
    }


    showModalFavorites() {

    }


    clearDates() {
        this.selected = null;
        this.selectedDateRange = null;
        let queryParams = {...this.route.snapshot.queryParams};
        delete queryParams['start'];
        delete queryParams['end'];

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams
        });
    }

    nextMonth() {
        this.disCounter++;
        this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1);
        this.calendarLeft._goToDateInView(this.startDate, 'month');
        this.calendarRight._goToDateInView(new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1), 'month');
    }

    prevMonth() {
        this.disCounter--;
        this.startDate = new Date(this.startDate.getFullYear(), this.disCounter);
        this.endDate = new Date(this.endDate.getFullYear(), this.endDate.getMonth() - 1);


        this.calendarLeft._goToDateInView(new Date(this.endDate.getFullYear(), this.disCounter), 'month');
        this.calendarRight._goToDateInView(new Date(this.startDate.getFullYear(), this.disCounter + 1), 'month');
    }
}


