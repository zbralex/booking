import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatCalendarHeader} from '@angular/material/datepicker';


@Component({
    selector: 'app-custom-calendar-header',
    templateUrl: './custom-calendar-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomCalendarHeaderComponent extends MatCalendarHeader<any> {}
