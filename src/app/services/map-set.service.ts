import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapSetService {

  passPreparedData: EventEmitter<any> = new EventEmitter();
  eventAndIndex: EventEmitter<any> = new EventEmitter();

  constructor() { }



  setPlacemarks(placemarks) {
     this.passPreparedData.emit(placemarks)
  }

  setActiveBalloon(e, index) {
    this.eventAndIndex.emit({e, index})
  }
}
