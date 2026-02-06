import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit 
{
  private authService = inject(AuthService);
  userEmail: string | null = '';
  public nameUser : string | null = '';

  constructor(private router: Router) {}

  ngOnInit(): void
  {
    const { email, name } = this.authService.getInfoUser()
    this.userEmail = email;
    this.nameUser = name;
  }

  onLogout(): void
  {
    this.authService.logout();
    localStorage.clear();
    
    this.router.navigate(['/login']);    
    window.location.reload(); 
  }
}