import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {
    evEmit: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    setFavorite(item): void {
        this.evEmit.emit(item);
    }
}
