import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {RoomsService} from '../../../../services/rooms.service';
import {FavoritesService} from '../../../../services/favorites.service';
import {ROOMS} from '../../../../services/rooms';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
    isOpen = false;
    preparedFavorites: any = []; // массив подготовленных данных
    allItems: any = []; // список из всех предложений (отели и дома)
    favorites: any = []; // список избранного из Localstorage
    favorites$: Observable<any>; // поток для элементов избранного, который отслеживает изменения удаленных элем-ов

    constructor(private roomsService: RoomsService, private favoritesService: FavoritesService) {
    }


    ngOnInit(): void {
        this.getRooms();
        this.getFavorites();
        this.favorites$ = this.getDataFromObservable(this.favorites);
        this.subscribeOnChangesFavorites();
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

    subscribeOnChangesFavorites(): void {
        this.favoritesService.evEmit.subscribe((res) => {
            this.favorites.push(res);
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
        });
    }

}
