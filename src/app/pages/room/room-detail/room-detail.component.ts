import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DateRange} from '@angular/material/datepicker';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {
  images: any;
  selected: Date | null;

  startDate: Date = new Date();
  endDate: Date = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 1);



  constructor(private matDialog: MatDialog) {
  }

  ngOnInit(): void {

  }

  openModalReview($event) {
    console.log($event);
  }

    showModalFavorites() {

    }

  clearDates() {
    this.selected = null
  }
}
