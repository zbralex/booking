import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DateRange, MatCalendar} from '@angular/material/datepicker';
import {CustomCalendarHeaderComponent} from '../components/custom-calendar-header/custom-calendar-header.component';

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


    constructor(private matDialog: MatDialog,) {

    }


    ngOnInit(): void {
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
    }

    nextMonth() {
        this.disCounter++;
        this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 1);
        this.calendarLeft._goToDateInView(this.startDate, 'month');
        this.calendarRight._goToDateInView(new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1), 'month');
        this.clearDates();
    }

    prevMonth() {
        this.disCounter--;
        this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() - 1, 1);
        this.calendarLeft._goToDateInView(this.startDate, 'month');
        this.calendarRight._goToDateInView(new Date(this.startDate.getFullYear(), this.startDate.getMonth() - 1), 'month');
        this.clearDates();
    }
}


