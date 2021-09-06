import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from 'src/app/components/main/main.component';
import {RoomDetailComponent} from '../../pages/room/room-detail/room-detail.component';

const routes: Routes = [
  {
    path: '', component: MainComponent
  },
  {
    path: 'detail/:id', component: RoomDetailComponent
  },

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MapModule { }
