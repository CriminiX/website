import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluateComponent } from './evaluate.component';
import {EvaluateRoutingModule} from "./evaluate-routing.module";
import { FormEvaluateComponent } from './form-evaluate/form-evaluate.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { ResultEvaluateComponent } from './result-evaluate/result-evaluate.component';



@NgModule({
  declarations: [
    EvaluateComponent,
    FormEvaluateComponent,
    ResultEvaluateComponent
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
        MatProgressBarModule
    ]
})
export class EvaluateModule { }
