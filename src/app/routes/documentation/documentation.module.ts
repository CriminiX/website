import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationComponent } from './documentation.component';
import {DocumentationRoutingModule} from "./documentation-routing.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { AuthenticationComponent } from './authentication/authentication.component';
import {MatTooltipModule} from "@angular/material/tooltip";



@NgModule({
  declarations: [
    DocumentationComponent,
    AuthenticationComponent
  ],
    imports: [
        CommonModule,
        DocumentationRoutingModule,
        MatSidenavModule,
        MatDividerModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule
    ]
})
export class DocumentationModule { }
