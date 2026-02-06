import { inject, Injectable, signal } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { tap } from "rxjs";

import { AuthService } from "./auth.service";
import { environment } from "../../../environments/environment";
import { API_ENDPOINTS } from "../constants/endpoints";
import { ApiTaskResponse, IGetTaskResponse } from "../interfaces/task.interface";

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
    private readonly URL_GET_ALL_TASK = `${environment.apiUrl}/${API_ENDPOINTS.TASKS.LIST}`;

    private getHeader(): HttpHeaders 
    {        
        const { userId, email } = this.authService.getInfoUser();
        return new HttpHeaders({
            'x-user-id': userId || '',
            'x-user-email': email || ''
        });
    }

    /** Permite obtener el listado de tareas del usuario logueado **/
    getAllTask() 
    {
        try {
            const { userId } = this.authService.getInfoUser();

            const queryParams = new HttpParams().set('userId', userId);
            
            return this.http.get<IGetTaskResponse>(this.URL_GET_ALL_TASK, { 
                headers: this.getHeader(),
                params: queryParams
            });

        } catch (error: any) 
        {
            console.error(error.message);
            throw error; 
        }
    }
    
    /**Permite realizar el registro de nuevas tareas, consumiendo el endpoint de registrar tareas **/
    addTask(title: string, description: string) 
    {
        const { userId } = this.authService.getInfoUser();

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