import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  mode: 'login' | 'signup' = 'login';
  constructor(private router: Router) {}

  mostrarLogin() {
    this.mode = 'login';
  }

  mostrarSignup() {
    this.mode = 'signup';
  }

  login() {
    console.log('Intentar iniciar sesión (aquí validar y llamar API)');
    this.router.navigate(['/home']);
  }

  register() {
    console.log('Intentar crear cuenta (aquí validar y llamar API)');
  }
}
