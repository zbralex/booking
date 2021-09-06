import {Component, ContentChild, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {animate, animation, style, transition, trigger, useAnimation} from '@angular/animations';
const scaleIn = animation([
  style({ opacity: 0, transform: 'scale(0.5)' }), // start state
  animate(
    '{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)',
    style({ opacity: 1, transform: 'scale(1)' })
  )
]);

const scaleOut = animation([
  animate(
    '{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)',
    style({ opacity: 0, transform: 'scale(0.5)' })
  )
]);
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('slideAnimation', [
      /* scale */
      transition('void => scale', [
        useAnimation(scaleIn, { params: { time: '500ms' } })
      ]),
      transition('scale => void', [
        useAnimation(scaleOut, { params: { time: '500ms' } })
      ]),
    ])
  ]
})
export class CarouselComponent implements OnInit {
  @Input('images') images: any;
  currentSlide = 0;

  constructor() { }

  ngOnInit(): void {
    this.preloadImages();
  }

  prev($event: MouseEvent): void {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.images.length - 1 : previous;
  }

  next($event: MouseEvent): void {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.images.length ? 0 : next;
  }

  preloadImages(): void {
    for (const slide of this.images) {
      new Image().src = slide.url;
    }
  }

}
