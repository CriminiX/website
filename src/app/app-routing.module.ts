import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: () => import('./routes/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'docs',
    loadChildren: () => import('./routes/documentation/documentation.module').then(m => m.DocumentationModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./routes/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'evaluate',
    loadChildren: () => import('./routes/evaluate/evaluate.module').then(m => m.EvaluateModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
