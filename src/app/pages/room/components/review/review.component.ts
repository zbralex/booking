import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ReviewDetailComponent} from '../review-detail/review-detail.component';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

    openModalReview($event: MouseEvent) {
      this.matDialog.open(ReviewDetailComponent, {
        data: {},
        minHeight: '800px',
        minWidth: '600px'
      })
    }
}
