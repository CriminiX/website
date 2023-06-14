import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { HttpClientModule } from '@angular/common/http';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatTooltipModule,
        MatSnackBarModule,
        HttpClientModule,
        MatMenuModule,
        MatIconModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
