import { Component, OnInit } from '@angular/core';
import {MapSetService} from "../../services/map-set.service";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  center: any = [55.771209, 37.568156];
  placemarks: PlacemarkConstructor[] = [];
  zoom: number = 10;

  constructor(private mapSetService: MapSetService) {

  }

  ngOnInit(): void {
    this.mapSetService.onClick.subscribe(center => {
      this.center = center
      this.zoom = 15;
    })

    this.mapSetService.passPreparedData.subscribe(preparedItems => {
      this.placemarks = preparedItems
    })

  }

}
interface PlacemarkConstructor {
  geometry: number[];
  properties: ymaps.IPlacemarkProperties;
  options: ymaps.IPlacemarkOptions;
}
