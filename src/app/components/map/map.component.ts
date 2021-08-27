import {Component, OnInit} from '@angular/core';
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
    options: ymaps.IPlacemarkOptions = {
        preset: 'islands#redStretchyIcon'
    };
    // создается второй объект настроек свойства preset по умолчанию и задается, когда мышь уходит
    unsetOptions: ymaps.IPlacemarkOptions = {
        preset: 'islands#darkBlueStretchyIcon'
    };


    constructor(private mapSetService: MapSetService) {
    }

    ngOnInit(): void {
        this.mapSetService.passPreparedData
            .subscribe(preparedItems => {
                this.placemarks = preparedItems;
            });

        this.mapSetService.eventAndIndex.subscribe((res) => {
            const ind = res.index;
            this.setColorElement(ind, res.e.type);
        });

    }

    setColorElement(index, type) {
        this.placemarks.forEach((item, i) => {
            if (index === i) {
                item.options = type === 'mouseenter' ? this.options : this.unsetOptions;
            }
        });
    }
}

interface PlacemarkConstructor {
    geometry: number[];
    properties: ymaps.IPlacemarkProperties;
    options: ymaps.IPlacemarkOptions;
}
