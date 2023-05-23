import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluateComponent } from './evaluate.component';
import {EvaluateRoutingModule} from "./evaluate-routing.module";
import { FormEvaluateComponent } from './form-evaluate/form-evaluate.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { ResultEvaluateComponent } from './result-evaluate/result-evaluate.component';
import {NgxEchartsModule} from "ngx-echarts";

import * as echarts from 'echarts/core';
import { SVGRenderer } from 'echarts/renderers';
import 'echarts/theme/macarons.js';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import { HistoryEvaluateDialogComponent } from './history-evaluate-dialog/history-evaluate-dialog.component';
import {MatLineModule} from "@angular/material/core";
import {MatRadioModule} from "@angular/material/radio";

echarts.use([SVGRenderer]);

@NgModule({
  declarations: [
    EvaluateComponent,
    FormEvaluateComponent,
    ResultEvaluateComponent,
    HistoryEvaluateDialogComponent
  ],
    imports: [
        CommonModule,
        EvaluateRoutingModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatListModule,
        MatToolbarModule,
        MatCardModule,
        MatProgressBarModule,
        NgxEchartsModule.forRoot({echarts}),
        MatExpansionModule,
        MatIconModule,
        MatLineModule,
        MatRadioModule,
        FormsModule
    ]
})
export class EvaluateModule { }
