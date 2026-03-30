import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  user = JSON.parse(localStorage.getItem("user") || '{}');
  menuopen: boolean = false;
  mobileMenuOpen: boolean = false;
  private router = inject(Router);

  abrirmenu(){
    this.menuopen = !this.menuopen;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  cerrarsesion(){
    console.log("🔴 Cerrando sesión...");
    // Limpiar el token del localStorage
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    console.log("✅ Token eliminado");
    // Redirigir al login
    this.router.navigate(['/login']);
  }
}
