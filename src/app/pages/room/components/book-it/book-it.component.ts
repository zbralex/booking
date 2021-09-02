import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

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

  minWidth: number | string = '900px'
  openedDialog: string = 'openedDialog';
  countAdults: number = 1
  countChildren: number = 0;
  countBabies: number = 0;


  constructor(private matDialog: MatDialog) { }



  ngOnInit(): void {
  }


  openModalGuests() {

    this.isOpen = !this.isOpen
  }

  increaseCountAdults() {
    this.countAdults++
  }

  decreaseCountAdults() {
    this.countAdults--
  }

  decreaseCountChildren() {
    this.countChildren--
  }

  increaseCountChildren() {
    this.countChildren++
  }

  decreaseCountBabies() {
    this.countBabies--
  }

  increaseCountBabies() {
    this.countBabies++
  }
}
