import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from "./home-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import { GuidestartComponent } from '../documentation/guidestart/guidestart.component';


@NgModule({
  declarations: [
    HomeComponent,
    GuidestartComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        NgOptimizedImage,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
    ]
})
export class HomeModule { }
