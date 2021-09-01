import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatCalendarHeader} from '@angular/material/datepicker';
import * as moment from 'moment';
import {MatDatepickerIntl} from '@angular/material/datepicker/datepicker-intl';
import {DateAdapter, MatDateFormats} from '@angular/material/core';
import {MatCalendar} from '@angular/material/datepicker/calendar';

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
  activeMonth: any;
  leftActiveDate: string
  rightActiveDate: string;


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
      this.leftActiveDate = moment(this.activeMonth).format('MMMM');
    } else {
      this.rightActiveDate = moment(this.calendar.activeDate).format('MMMM')
    }
  }


  customPrev(): void {
    this.previousClicked()
  }


  customNext(): void {
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
