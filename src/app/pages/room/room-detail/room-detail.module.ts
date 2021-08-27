import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RoomDetailComponent} from './room-detail.component';


const routes: Routes = [
  {
    path: '', component: RoomDetailComponent
  },

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RoomDetailModule { }
