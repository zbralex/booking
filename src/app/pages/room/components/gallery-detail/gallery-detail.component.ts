import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-gallery-detail',
    templateUrl: './gallery-detail.component.html',
    styleUrls: ['./gallery-detail.component.scss']
})
export class GalleryDetailComponent implements OnInit {
    @Input() images: any = [];
    @Input() minHeight = 400;

    constructor() {
    }

    ngOnInit(): void {
    }

}
