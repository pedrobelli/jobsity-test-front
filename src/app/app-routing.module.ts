import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BaseLayoutComponent } from './core/components/base-layout/base-layout.component';
import { authGuard } from './core/guards/auth.guard';

type PathMatch = "full" | "prefix" | undefined;

const routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' as PathMatch},
  {
    path: '',
    loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: 'tasks',
        loadChildren: () => import('./views/tasks/tasks.module').then(m => m.TasksModule),
        canActivate: [authGuard]
      }
    ]
  },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' as PathMatch },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
