import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapSetService {
  onClick: EventEmitter<any> = new EventEmitter();
  passPreparedData: EventEmitter<any> = new EventEmitter();

  constructor() { }

  setCoordinates(coord) {
    this.onClick.emit(coord);
  }

  setPlacemarks(placemarks) {
     this.passPreparedData.emit(placemarks)
    console.log(placemarks, 'ssa')
  }
}
