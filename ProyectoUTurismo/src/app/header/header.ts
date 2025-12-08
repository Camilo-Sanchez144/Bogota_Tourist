import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  user = JSON.parse(localStorage.getItem("user") || '{}');
  menuopen: boolean = false;
  private router = inject(Router);

  abrirmenu(){
    this.menuopen = !this.menuopen;
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
