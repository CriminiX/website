import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EvaluateComponent} from "./evaluate.component";
import {ResultEvaluateComponent} from "./result-evaluate/result-evaluate.component";


const routes: Routes = [
    {
        path: '',
        title: 'CriminiX - Simular',
        component: EvaluateComponent
    },
    {
        path: 'result',
        title: 'CriminiX - Resultado',
        component: ResultEvaluateComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EvaluateRoutingModule { }
