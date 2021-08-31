import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatCalendarHeader} from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-custom-calendar-header',
  templateUrl: './custom-calendar-header.component.html',
  styleUrls: ['./custom-calendar-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomCalendarHeaderComponent extends MatCalendarHeader<any> implements OnInit{
  currentDate: Date = new Date();
  showPrev: boolean;
  showNext: boolean;
  activeMonth: string;

  ngOnInit(): void {
    this.showPrevAndNextButton(this.calendar.activeDate)
    this.transformCurrentMonth()
  }


  currentPeriodClicked(): void {
    this.calendar.currentView = this.calendar.currentView == 'month' ? 'multi-year' : 'month';
  }
  transformCurrentMonth() {
    moment.locale('ru')
    if (this.showPrev) {
      this.activeMonth = moment(this.activeMonth).format('MMMM');
    } else {
      this.activeMonth = moment(this.calendar.activeDate).format('MMMM')
    }
  }


  customPrev(): void {
    console.log(this.calendar.activeDate)
    this.previousClicked()
  }

  /** Handles user clicks on the next button. */
  customNext(): void {
    console.log(this.calendar.activeDate)
    this.nextClicked()
  }


  // делаем активными кнопки вперед/назад
  showPrevAndNextButton(act) {
    if (this.currentDate.getMonth() === act.getMonth()) {
      this.showPrev = true
    } else {
      this.showNext = true
    }
  }


}
