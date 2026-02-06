import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap } from "rxjs";

import { AuthService } from "./auth.service";
import { environment } from "../../../environments/environment";
import { API_ENDPOINTS } from "../constants/endpoints";
import { ApiTaskResponse } from "../interfaces/task.interface";

@Injectable({
    providedIn: 'root'
})

/** Clase que permite manejar las peticiones de usuarios **/
export class TaskService
{
    /** Se inyecta el http cliente, para realizar peticiones http **/
    private http = inject(HttpClient);
    private authService = inject(AuthService);

    private readonly URL_ADD_TASK = `${environment.apiUrl}/${API_ENDPOINTS.TASKS.CREATE}`;

   private getHeader(): HttpHeaders 
   {
        const user = this.authService.currentUser();
        
        return new HttpHeaders({
            'x-user-id': user?.userId || '',
            'x-user-email': user?.email || ''
        });
    }
    /**Permite realizar el registro de nuevas tareas, consumiendo el endpoint de registrar tareas **/
    addTask(title: string, description: string) 
    {
        const userId = this.authService.currentUser()?.userId;

        if (!userId) {
            throw new Error('No se encontró un usuario autenticado para crear la tarea.');
        }

        const taskPayload = { title, description, userId };
        const headers = this.getHeader();

        return this.http.post<ApiTaskResponse>(this.URL_ADD_TASK, taskPayload, {headers}).pipe(
            tap(response =>
            {
                if (!response.success) {
                    throw new Error(response.messages);
                }
                return response.detail.data;
            })
        );
  }
}