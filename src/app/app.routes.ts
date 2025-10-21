import { Routes } from '@angular/router';
import { canActivateAuth } from '@guards/auth.guard';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/tasks",
    pathMatch: "full"
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/auth.component').then(c => c.AuthComponent)
  },
  {
    path: 'tasks',
    canActivate: [canActivateAuth],
    loadComponent: () => import('./modules/tasks/tasks.component').then(c => c.TasksComponent)
  },
  {
    path: '**',
    redirectTo: '/tasks',
    pathMatch: 'full'
  }
];
