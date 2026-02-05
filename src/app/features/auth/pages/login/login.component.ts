import { Component, signal, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent 
{
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private route = inject(Router);
  
  isLoading = signal(false);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit()
  {
    if (this.loginForm.valid) 
    {
      this.isLoading.set(true);
      const email = this.loginForm.value.email!;
      
      this.authService.login(email).subscribe(
      {
        next: (response) => 
        {
          this.isLoading.set(false);
          Swal.fire({
            title: 'Bienvenido',
            text: response.messages,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            toast: true,           
            position: 'top-end'
          });
          this.route.navigate(['/tasks']);
        },
        error: (err) =>
        {
          const { error } = err;
          const messages = error.messages ?? 'Ha ocurrido un error inesperado.';
          this.isLoading.set(false);
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Vaya...',
            text: messages,
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: true,
            toast: true,           
            position: 'top-end'
          });
        }
      });    
    }
  }
}