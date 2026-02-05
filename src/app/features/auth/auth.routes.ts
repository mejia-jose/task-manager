import { Routes } from "@angular/router";

/** Se definen las rutas del modulo de auth **/
export const AUTH_ROUTES : Routes =
[
    { 
        path: 'login', 
        loadComponent: () => import('./pages/login/login.component').then(l => l.LoginComponent)
    },
    { 
        path: 'register', 
        loadComponent: () => import('./pages/register/register.component').then(r => r.RegisterComponent)
    },
]