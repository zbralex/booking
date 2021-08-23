import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private http: HttpClient) { }

  getRooms(rooms: any) {
    return from(rooms)
  }
}
