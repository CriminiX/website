import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DocumentationComponent} from "./documentation.component";
import {GuidestartComponent} from "./guidestart/guidestart.component";
import {AuthenticationComponent} from "./authentication/authentication.component";


const routes: Routes = [
    {
        path: '',
        title: 'CriminiX - Docs',
        component: DocumentationComponent,
        children: [
            {
                path: '',
                component: GuidestartComponent
            },
            {
                path: 'auth',
                component: AuthenticationComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocumentationRoutingModule { }
