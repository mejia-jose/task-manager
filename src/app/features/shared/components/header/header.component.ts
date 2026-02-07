import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit 
{
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  userEmail: string | null = '';
  public nameUser : string | null = '';

  constructor(private router: Router) {}

  ngOnInit(): void
  {
    const { email, name } = this.authService.getInfoUser()
    this.userEmail = email;
    this.nameUser = name;
  }

  destroyUserSession()
  {
    localStorage.removeItem(this.authService.getKeySession());
    this.router.navigate(['/login']);    
  }

  /** Permite cerrar la sesión del usuario en el front y en el back **/
  onLogout(): void
  {
    this.authService.logout().subscribe({
      next: ( res =>
      {
        this.destroyUserSession();

        this.alertService.toast({
          title: 'Cierre de sessión',
          text: 'Sesión cerrada correctamente.',
          icon: 'success'
        });

      }),
      error: (err => {
        this.destroyUserSession();
      })
    });
  }
}