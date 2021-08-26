import {Component, OnInit} from '@angular/core';
import {RoomsService} from '../../services/rooms.service';
import {ROOMS} from '../../services/rooms';
import {MatDialog} from '@angular/material/dialog';
import {RoomDetailComponent} from '../room-detail/room-detail.component';
import {MapSetService} from '../../services/map-set.service';

@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.scss']
})
export class ListRoomsComponent implements OnInit {
  rooms: any = [];
  coords = {};

  placemarks: PlacemarkConstructor[] = [];

  constructor(private roomsService: RoomsService,
              private matDialog: MatDialog,
              private mapSetService: MapSetService) {



  }

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    this.roomsService.getRooms(ROOMS)
      .subscribe((res: any) => {
        this.rooms.push(res);
      });
    // подготавливаем данные для передачи в placemarks
    this.rooms.forEach((item) => {
      const newItem = {
        geometry: [item.lat, item.long],
        properties: {
          balloonContentHeader: `<div style="max-width: 250px"><strong>${item.name}</strong><br><span>${item.address}</span></div>`,
          balloonContentBody: `<img src="${item.images[0].url}" width="250px" alt="${item.name}"/>`,
          iconContent: item.price + '₽',
        },
        options: {
          preset: 'islands#darkBlueStretchyIcon',
        }
      };
      this.placemarks.push(newItem);
    });
    this.mapSetService.setPlacemarks(this.placemarks);
  }

  openDetail(id): void {
    this.matDialog.open(RoomDetailComponent, {
      width: '330px',
      height: '400px',
      data: {
        title: 'Отель id: ' + id
      }
    });
  }



  setActiveBalloon($event, i): void {
   this.mapSetService.setActiveBalloon($event, i)
  }
}

interface PlacemarkConstructor {
  geometry: number[];
  properties: ymaps.IPlacemarkProperties;
  options: ymaps.IPlacemarkOptions;
}
