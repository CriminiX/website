import {NgModule, SecurityContext} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationComponent } from './documentation.component';
import {DocumentationRoutingModule} from "./documentation-routing.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MarkdownModule} from "ngx-markdown";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatTreeModule} from "@angular/material/tree";



@NgModule({
  declarations: [
    DocumentationComponent
  ],
    imports: [
        CommonModule,
        DocumentationRoutingModule,
        MatSidenavModule,
        MatDividerModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        HttpClientModule,
        MarkdownModule.forRoot({loader: HttpClient, sanitize: SecurityContext.NONE}),
        MatTreeModule
    ]
})
export class DocumentationModule { }
