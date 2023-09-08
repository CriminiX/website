import {NgModule, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './shared/components/header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClientModule} from '@angular/common/http';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";

import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { ClipboardButtonComponent } from './shared/components/clipboard-button/clipboard-button.component';
import {provideEnvironmentNgxMask} from "ngx-mask";
registerLocaleData(localePT);

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ClipboardButtonComponent
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
    providers: [
        {provide: LOCALE_ID, useValue: 'pt-br'},
        provideEnvironmentNgxMask(),
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
