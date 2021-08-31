import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DateRange} from '@angular/material/datepicker';
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
    calendar = CustomCalendarHeaderComponent;


    constructor(private matDialog: MatDialog) {

    }


    ngOnInit(): void {
        console.log(this.calendar);
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
            console.log(this.selectedDateRange, 'if');
        } else {
            this.selectedDateRange = new DateRange(date, null);
            console.log(this.selectedDateRange, 'else');
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
}


