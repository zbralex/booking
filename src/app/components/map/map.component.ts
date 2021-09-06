import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapSetService} from '../../services/map-set.service';
import {Subscription} from 'rxjs';


@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit, OnDestroy {
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
    subscription: Subscription;


    constructor(private mapSetService: MapSetService) {
    }

    ngOnInit(): void {
        // получаем список меток из компонента list-rooms
        this.subscription = this.mapSetService.passPreparedData
            .subscribe(preparedItems => {
                this.placemarks = preparedItems;
            });

        // меняем цвет метки при наведении
        this.subscription = this.mapSetService.eventAndIndex.subscribe((res) => {
            this.placemarks[res.index].options = res.e.type === 'mouseenter' ? this.options : this.unsetOptions;
        });

    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
}

interface PlacemarkConstructor {
    geometry: number[];
    properties: ymaps.IPlacemarkProperties;
    options: ymaps.IPlacemarkOptions;
}
