import {Component, OnInit} from '@angular/core';
import {RoomsService} from '../../services/rooms.service';
import {ROOMS} from '../../services/rooms';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isOpen = false;
    favorites: any = [{id: 1}];
    allItems: any = [];

    constructor(private roomsService: RoomsService) {
    }

    ngOnInit(): void {
        this.getRooms();
        this.getFavorites();
    }

    showOrders(): void {
        console.log('order');
    }

    getFavorites(): void {
        const favorites = localStorage.getItem('favorites');
        if (!favorites) {
            this.favorites = [];
        } else {
            const arrayFavorites = JSON.parse(favorites);
        }
    }

    getRooms(): void {
        this.roomsService.getRooms(ROOMS)
            .subscribe(res => {
                this.allItems = res;
                console.log(this.allItems);
                // this.favorites.map((el: any) => {
                //     console.log(el);
                // });

            });
    }

    showFavorites(): void {
        this.isOpen = !this.isOpen;
        console.log('favorits');
    }
}
