import { Injectable } from "@angular/core";
import Swal from "sweetalert2";
import { IAlert } from "../interfaces/alert.interface";

@Injectable({
    providedIn: 'root',
})

export class AlertService
{
    /** Permite mostrar un alert para los mensajes de error o de exito **/
    public toast(body: IAlert)
    {
        const timer : number = body.icon === 'success' ? 5000 : 10000;
        Swal.fire({
            title: body.title,
            text: body.text,
            icon: body.icon,
            showConfirmButton: false,
            timer,
            timerProgressBar: true,
            toast: true,           
            position: 'top-end'
        });
    }

    /** Modal de confirmación **/
    async modalConfirm(title: string, text: string,) 
    {
        const result = await Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, continuar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        });

        return result.isConfirmed;
    }

}