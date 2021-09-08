import {Component, OnInit} from '@angular/core';
import {RoomsService} from '../../services/rooms.service';
import {ROOMS} from '../../services/rooms';
import {Observable, of} from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isOpen = false;
    favorites: any = [];
    preparedFavorites: any = [];
    allItems: any = [];
    favorites$: Observable<any>;

    constructor(private roomsService: RoomsService) {
    }


    ngOnInit(): void {
        this.getRooms();
        this.getFavorites();
        this.favorites$ = this.getDataFromObservable(this.favorites);
    }

    showOrders(): void {
        console.log('order');
    }

    getDataFromObservable(data: any): Observable<any> {
        return of(data);
    }

    getFavorites(): void {
        const favorites = localStorage.getItem('favorites');
        if (!favorites) {
            this.favorites = [];
        } else {
            this.favorites = JSON.parse(favorites);
            this.allItems.map((item) => {
                this.favorites.map((el) => {
                    if (item.id === el.id) {
                        this.preparedFavorites.push(item);
                    }
                });
            });
        }
    }

    getRooms(): void {
        this.roomsService.getRooms(ROOMS)
            .subscribe(res => {
                this.allItems = res;
            });
    }

    showFavorites(): void {
        this.isOpen = !this.isOpen;
    }

    removeFromFavorites(id: number): void {
        this.favorites = this.favorites.filter((item) => {
                return item.id !== id;
            }
        );
        this.favorites$ = new Observable<any>(obs => {
            obs.next(this.favorites);
        });
        this.preparedFavorites = [];
        this.allItems.map((item) => {
            this.favorites.map((el) => {
                if (item.id === el.id) {
                    this.preparedFavorites.push(item);
                }
            });
        });
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
}
