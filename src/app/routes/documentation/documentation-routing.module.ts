import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DocumentationComponent} from "./documentation.component";
import {PagesComponent} from "./pages/pages.component";


const routes: Routes = [
    {
        path: '',
        title: 'CriminiX - Docs',
        component: DocumentationComponent,
        children: [
            {
                path: ':page',
                pathMatch: 'full',
                component: PagesComponent
            },
            {
                path: '**',
                redirectTo: 'guide-start',
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocumentationRoutingModule { }
