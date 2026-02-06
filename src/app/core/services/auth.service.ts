import { computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../../environments/environment";
import { API_ENDPOINTS } from "../constants/endpoints";
import { ApiResponse, UserSession } from "../interfaces/user.interface";
import { tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

/** Clase que permite manejar las peticiones de usuarios **/
export class AuthService
{
    /** Se inyecta el http cliente, para realizar peticiones http **/
    private http = inject(HttpClient);

    private readonly URL_LOGIN = `${environment.apiUrl}/${API_ENDPOINTS.AUTH.LOGIN}`;
    private readonly URL_REGISTER = `${environment.apiUrl}/${API_ENDPOINTS.AUTH.REGISTER}`;
    private readonly URL_LOGOUT = `${environment.apiUrl}/${API_ENDPOINTS.AUTH.LOGOUT}`;
    private readonly KEY_SESSION_USER = 'user_data_auth';

    /** Se guarda el objeto en signal, para mantener la sesión del usuario **/
    private _dataUser = signal<UserSession | null>(this.getUserSession());

    /** permite validar el usuario logueado y obtener la información del mismo **/
    public currentUser = computed(() => this._dataUser());
    public thisIsAuthenticated = computed(() => !!this._dataUser());

    /** Permite realizar la autenticación del usuario **/
    login(email: string)
    {
        return this.http.post<ApiResponse>(this.URL_LOGIN,{ email }).pipe(
            tap(response => {
                
                if(!response.success || !response.detail.data)
                {
                    throw new Error(response.messages);
                }

                const { id, email, name } = response.detail.data;
                this.saveSessionUser({ userId: id,email, name});
            })
        );
    }

    /**Permite realizar el registro de usuarios, consumiendo el endpoint de registrar usuarios **/
    register(name: string, email: string)
    {
        return this.http.post<ApiResponse>(this.URL_REGISTER, {email, name}).pipe(
            tap(response => {
                if(!response.success || !response.detail.data)
                {
                    throw new Error(response.messages);
                }

                const { id, email, name } = response.detail.data;
                this.saveSessionUser({ userId: id,email, name});
            })
        );
    }

    /** Permite obtener la sesión del usuario **/
    private getUserSession(): UserSession | null
    {
        const data = localStorage.getItem(this.KEY_SESSION_USER);
        return data ? JSON.parse(data) : null;
    }

    /** Permite guardar la sesión del usuario **/
    private saveSessionUser(user:UserSession)
    {
        localStorage.setItem(this.KEY_SESSION_USER, JSON.stringify(user));
        this._dataUser.set(user);
    }

    /** Permite destruir la sesión del usuario **/
    logout()
    {
        const user = this.getInfoUser();

        const headers = {
            'x-user-email': user.email,
            'x-user-id': user.userId
        };

        /** Consume el endpoint y destruye la sesión del usuario **/
        return this.http.post(this.URL_LOGOUT, {}, { headers }).pipe(
            tap(() => {
                localStorage.removeItem(this.KEY_SESSION_USER);
                this._dataUser.set(null);
            })
        );
    }
    
    /** Obtiene y retorna la información del usaurio */
    getInfoUser()
    {
        const user = this.currentUser();

        if(!user || !user.userId || !user.email)
        {
            throw new Error('No se ha podido obtener la información del usuario.');
        }

        return { 
            userId: user.userId, 
            email: user.email,
            name: user.name
        }
    }

    getKeySession()
    {
        return this.KEY_SESSION_USER;
    }
}