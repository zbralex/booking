import { Component, OnInit} from '@angular/core';
import {MapSetService} from '../../services/map-set.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  center: any = [55.771209, 37.568156];
  placemarks: PlacemarkConstructor[] = [];
  zoom = 10;


  constructor(private mapSetService: MapSetService) {
  }

  ngOnInit(): void {
   this.mapSetService.passPreparedData
       .subscribe(preparedItems => {
      this.placemarks = preparedItems;
    });

    this.mapSetService.eventAndIndex.subscribe((res) => {
      const ind = res.index;
      if(res.e.type === 'mouseenter') {
        this.placemarks[ind].options.preset = 'islands#redStretchyIcon';
        const newEl = this.placemarks[ind];
        this.placemarks.push(newEl);
      } else {
        this.placemarks.pop()
      }
    })

  }

}
interface PlacemarkConstructor {
  geometry: number[];
  properties: ymaps.IPlacemarkProperties;
  options: ymaps.IPlacemarkOptions;
}
