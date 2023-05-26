import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from "./home-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import { PagesComponent } from '../documentation/pages/pages.component';
import {MarkdownModule} from "ngx-markdown";


@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        NgOptimizedImage,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        MarkdownModule,
    ]
})
export class HomeModule { }
