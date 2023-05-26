import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from "./home.component";
import {PagesComponent} from "../documentation/pages/pages.component";


const routes: Routes = [
    {
        path: '',
        title: 'CriminiX',
        component: HomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
