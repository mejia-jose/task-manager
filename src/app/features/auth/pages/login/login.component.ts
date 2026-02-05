import { Component, signal, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
  
  isLoading = signal(false);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit()
  {
    if (this.loginForm.valid) 
    {
      this.isLoading.set(true);
      
      console.log('Enviando:', this.loginForm.getRawValue());
      
      setTimeout(() => {
        this.isLoading.set(false);
      }, 2000);
    }
  }
}