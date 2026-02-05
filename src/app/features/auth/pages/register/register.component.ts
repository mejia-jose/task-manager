import { Component, signal, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
  
  isLoading = signal(false);

  registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.min(3)]]
  });

  onRegister()
  {
    if (this.registerForm.valid) 
    {
      this.isLoading.set(true);
      
      console.log('Enviando:', this.registerForm.getRawValue());
      
      setTimeout(() => {
        this.isLoading.set(false);
      }, 2000);
    }
  }

}