import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluateComponent } from './evaluate.component';
import {EvaluateRoutingModule} from "./evaluate-routing.module";



@NgModule({
  declarations: [
    EvaluateComponent
  ],
  imports: [
    CommonModule,
    EvaluateRoutingModule
  ]
})
export class EvaluateModule { }
