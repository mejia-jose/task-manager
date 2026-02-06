import { Component, signal, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: '../login/login.component.scss'
})

export class RegisterComponent
{
  private fb = inject(FormBuilder);
  private route = inject(Router);
  private authService = inject(AuthService);
  
  isLoading = signal(false);

  /** Se inicializa el formulario reactivo **/
  registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.min(3)]]
  });

  /** Permite obtener la información del formulario y enviarla al servicio **/
  onRegister()
  {
    if (this.registerForm.valid) 
    {
      this.isLoading.set(true);
      const name = this.registerForm.value.name!;
      const email = this.registerForm.value.email!;
      
      this.authService.register(name,email).subscribe({
        next: (res) => 
        {
          this.isLoading.set(false);
          Swal.fire({
            title: 'Bienvenido',
            text: res.messages,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            toast: true,           
            position: 'top-end'
          });
          this.route.navigate(['/tasks']);
        },
        error: (err) => {
          const { error } = err;
          const messages = error.messages ?? 'Ha ocurrido un error inesperado.';
          this.isLoading.set(false);
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Vaya...',
            text: messages,
            showConfirmButton: false,
            timer: 5500,
            timerProgressBar: true,
            toast: true,           
            position: 'top-end'
          });
        }
      });
      
    }
  }
}