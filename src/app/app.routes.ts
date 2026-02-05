import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(auth => auth.AUTH_ROUTES)
    },
    {
        path: 'tasks',
        canActivate: [authGuard],
        loadChildren: () => import('./features/tasks/tasks.routes').then(tasks => tasks.TASKS_ROUTES)
    },
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'auth/login'
    }
];
