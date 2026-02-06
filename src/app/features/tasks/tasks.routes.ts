import { Routes } from "@angular/router";

/** Se definen las rutas del modulo de tasks **/
export const TASKS_ROUTES : Routes =
[
    { 
        path: '', 
        loadComponent: () => import('./pages/manage-tasks/manage-tasks.component').then(m => m.ManageTaskComponent)
    },
]