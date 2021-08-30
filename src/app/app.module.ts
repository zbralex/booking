import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { SharedModule } from './common/modules/shared/shared.module';
import { MapComponent } from './components/map/map.component';
import { MapSidebarComponent } from './components/map-sidebar/map-sidebar.component';
import { MainComponent } from './components/main/main.component';
import { MatIconRegistry } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ListRoomsComponent } from './components/list-rooms/list-rooms.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import {AngularYandexMapsModule, YaConfig} from 'angular8-yandex-maps';
import {environment} from '../environments/environment';
import { RoomDetailComponent } from './pages/room/room-detail/room-detail.component';
import { GalleryDetailComponent } from './pages/room/components/gallery-detail/gallery-detail.component';
import { BookItComponent } from './pages/room/components/book-it/book-it.component';
import { ReviewComponent } from './pages/room/components/review/review.component';
import { ReviewDetailComponent } from './pages/room/components/review-detail/review-detail.component';
const mapConfig: YaConfig = {
  apikey: environment.apiKey + '-7fb3-4447-83b1-41d386d2131d',
  lang: 'ru_RU',
};

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MainLayoutComponent,
    MapComponent,
    MapSidebarComponent,
    MainComponent,
    ListRoomsComponent,
    CarouselComponent,
    RoomDetailComponent,
    GalleryDetailComponent,
    BookItComponent,
    ReviewComponent,
    ReviewDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AngularYandexMapsModule.forRoot(mapConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'facebook', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook.svg'));
    this.matIconRegistry.addSvgIcon(
      'youtube', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/youtube.svg'));
    this.matIconRegistry.addSvgIcon(
      'twitter', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/twitter.svg'));
    this.matIconRegistry.addSvgIcon(
      'telegram', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/telegram.svg'));

    this.matIconRegistry.addSvgIcon(
        'highlights-home', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/highlights-home.svg'));
    this.matIconRegistry.addSvgIcon(
        'highlights-location', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/highlights-location.svg'));
    this.matIconRegistry.addSvgIcon(
        'highlights-medal', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/highlights-medal.svg'));
    this.matIconRegistry.addSvgIcon(
        'highlights-stars', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/highlights-stars.svg'));
  }
}


