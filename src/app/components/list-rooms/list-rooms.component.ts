import {Component, OnInit} from '@angular/core';
import {RoomsService} from '../../services/rooms.service';
import {ROOMS} from '../../services/rooms';
import {MatDialog} from "@angular/material/dialog";
import {RoomDetailComponent} from "../room-detail/room-detail.component";
import {MapSetService} from "../../services/map-set.service";
import {map} from "rxjs/operators";

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

    this.mapSetService.onClick.subscribe(center => this.coords = center)

  }

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms() {
    this.roomsService.getRooms(ROOMS)
      .subscribe((res: any) => {
        this.rooms.push(res);
      });
    // подготавливаем данные для передачи в placemarks
    this.rooms.forEach((item) => {
      let newItem = {
        geometry: [item.lat, item.long],
        properties: {
          balloonContentHeader: `<div style="max-width: 250px"><strong>${item.name}</strong><br><span>${item.address}</span></div>`,
          balloonContentBody: `<img src="${item.images[0].url}" width="250px"/>`
        },
        options: {
          preset: 'islands#icon',
          iconColor: '#673ab7'
        }
      }
      this.placemarks.push(newItem)
    })
    this.mapSetService.setPlacemarks(this.placemarks)

  }

  openDetail(id) {
    this.matDialog.open(RoomDetailComponent, {
      width: '330px',
      height: '400px',
      data: {
        title: 'Отель id: ' + id
      }
    })
  }

  setCoordinates(lat: any, long: any) {
    let coord = [lat, long]
    this.mapSetService.setCoordinates(coord);
  }
}

interface PlacemarkConstructor {
  geometry: number[];
  properties: ymaps.IPlacemarkProperties;
  options: ymaps.IPlacemarkOptions;
}
