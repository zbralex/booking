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
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ListRoomsComponent } from './components/list-rooms/list-rooms.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import {AngularYandexMapsModule, YaConfig} from "angular8-yandex-maps";
import {environment} from "../environments/environment";
// import { AgmCoreModule } from "@agm/core";
const mapConfig: YaConfig = {
  apikey: environment.apiKey,
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
    RoomDetailComponent,
    CarouselComponent
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
  }
}


