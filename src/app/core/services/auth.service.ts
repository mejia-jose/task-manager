import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../../environments/environment";
import { API_ENDPOINTS } from "../constants/endpoints";

@Injectable({
    providedIn: 'root'
})

/** Clase que permite manejar las peticiones de usuarios **/
export class AuthService
{
    /** Se inyecta el http cliente, para realizar peticiones http **/
    private http = inject(HttpClient);
    
    private readonly URL_LOGIN = `${environment}/${API_ENDPOINTS.AUTH.LOGIN}`;
    private readonly URL_REGISTER = `${environment}/${API_ENDPOINTS.AUTH.LOGIN}`;

    /** Permite realizar la autenticación del usuario **/
    login(email: string)
    {
        return this.http.post(this.URL_LOGIN,{ email });
    }

    /**Permite realizar el registro de usuarios, consumiendo el endpoint de registrar usuarios **/
    register(name: string, email: string)
    {
        return this.http.post(this.URL_REGISTER, { name, email});
    }
}