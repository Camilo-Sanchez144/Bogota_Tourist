import { Component, inject, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Acceso } from '../services/acceso';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { Usuario } from '../interfaces/Usuario';
import { emailValidator, usernameValidator, phoneValidator, nameValidator, simplePasswordValidator } from '../validators/custom-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [ɵInternalFormsSharedModule]
})
export class Login {
validar() {

}
  @ViewChild('correo') correo!: ElementRef;
  @ViewChild('inputcorreo') inputcorreo!: ElementRef;
  @ViewChild('contrasena') contrasena!: ElementRef;
  @ViewChild('inputcontrasena') inputcontrasena!: ElementRef;

  private cdr = inject(ChangeDetectorRef);

mensajeError: string = "";
mostrarError: boolean = false;
mostrarSuccess: boolean = false;
mensajeSucccess:string = "";
user=localStorage.getItem("user");

private accesoService = inject(Acceso);
private router = inject(Router);
public formBuild = inject(FormBuilder);

public formLogin: FormGroup = this.formBuild.group({
  username: ['', Validators.required],
  password: ['', Validators.required]
});
iniciarSesion() {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      this.mostrarErrorMensaje("Debe llenar todos los campos");
      return;
    }

    const objeto = this.formLogin.value;

    this.accesoService.login(objeto).subscribe({
      next: (data) => {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        const payload = this.parseJwt(data.access);
        console.log('📦 Payload completo del token:', payload);
        const userId = payload?.user_id ?? payload?.id;
        console.log('🆔 user id extraído:', userId, payload);

        if (userId) {
          this.accesoService.getUserById(userId).subscribe({
            next: (user) => {
              localStorage.setItem('user', JSON.stringify(user));
              console.log('👤 Usuario guardado en storage:', user);
            },
            error: (errUser) => {
              console.warn('No se pudo obtener el usuario por id, navegando igual:', errUser);
            },
            complete: () => this.router.navigate(['home'])
          });
        } else {
          console.warn('No se encontró user_id en el token, navegando sin guardar user');
          this.router.navigate(['home']);
        }
      },
      error: (err) => {
        this.mostrarErrorMensaje("Credenciales Incorrectas. Intente de nuevo");
        this.cdr.detectChanges();
      }
    });
  }

  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('No se pudo decodificar el token:', e);
      return null;
    }
  }

  mostrarErrorMensaje(msj: string) {
    this.mensajeError = msj;
    this.mostrarError = true;

    setTimeout(() => {
      this.mostrarError = false;
      this.cdr.detectChanges();
    }, 3000);
  }

  /**
   * Obtiene el mensaje de error específico para un campo del formulario
   * @param formGroup - El FormGroup a validar
   * @param fieldName - El nombre del campo
   * @returns El mensaje de error o vacío si no hay error
   */
  getErrorMensaje(formGroup: FormGroup, fieldName: string): string {
    const control = formGroup.get(fieldName);
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    const errors = control.errors;

    if (errors['required']) return `${fieldName} es requerido`;
    if (errors['invalidEmail']) return 'Email inválido';
    if (errors['invalidUsername']) return 'Usuario: solo letras, números, guiones y _ (mín. 3)';
    if (errors['invalidPassword']) return 'Contraseña: min 6 chars, 1 letra y 1 número';
    if (errors['weakPassword']) return 'Contraseña débil: requiere mayúscula, minúscula, número y símbolo';
    if (errors['invalidName']) return 'Solo letras y espacios permitidos';
    if (errors['invalidPhone']) return 'Teléfono: 10 dígitos (ej: 300 123 4567)';
    if (errors['minlength']) return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
    if (errors['minPasswordLength']) return `Mínimo ${errors['minPasswordLength'].requiredLength} caracteres`;
    if (errors['email']) return 'Email inválido';

    return 'Campo inválido';
  } 
  mode: 'login' | 'signup' = 'login';
  mostrarLogin() {
    this.mode = 'login';
  }

  mostrarSignup() {
    this.mode = 'signup';
  }

  login() {
    this.router.navigate(['/home']);
  }
  public formRegistro: FormGroup = this.formBuild.group({
    id:[''],
    username: ['', [Validators.required, usernameValidator()]],
    firstname: ['', [Validators.required, nameValidator()]],
    lastname: ['', [Validators.required, nameValidator()]],
    email: ['', [Validators.required, emailValidator()]],
    password: ['', [Validators.required, simplePasswordValidator()]],
    cellphone: ['', [Validators.required, phoneValidator()]],
    is_active:[''],
    last_login:[''],
    is_superuser:['']
  });
  private capitalizeWords(text: string): string {
    return text
      .trim()
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
registrarse(){
  this.formRegistro.markAllAsTouched();
  if(this.formRegistro.invalid) {
    this.mostrarErrorMensaje('Complete los campos requeridos');
    return;
  }

  const objeto:any ={
    username: this.formRegistro.value.username,
    first_name: this.capitalizeWords(this.formRegistro.value.firstname),
    last_name: this.capitalizeWords(this.formRegistro.value.lastname),
    email: this.formRegistro.value.email,
    password: this.formRegistro.value.password,
    cellphone: this.formRegistro.value.cellphone,
  }
  console.log('Payload registro:', objeto);

  this.accesoService.registrarse(objeto).subscribe({
    next:() => {
      this.mostrarSuccesMensaje('Registro exitoso. Inicia sesión.');
      this.formRegistro.reset();
      this.mostrarLogin();
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Error registrarse:', err);
      let detalle = 'Error al registrarse. Intente de nuevo.';
      /*if (err && err.error) {
        if (typeof err.error === 'string') {
          detalle = err.error;
        } else if (err.error.detail) {
          detalle = err.error.detail;
        } else if (typeof err.error === 'object') {
          try {
            const parts = Object.entries(err.error).map(([key, val]) => {
              if (Array.isArray(val)) return `${key}: ${val.join(', ')}`;
              return `${key}: ${String(val)}`;
            });
            detalle = parts.join(' | ');
          } catch (e) {
            detalle = JSON.stringify(err.error);
          }
        }
      }
      */
      this.mostrarErrorMensaje(detalle);
      this.cdr.detectChanges();
    }
  })
}
  mostrarSuccesMensaje(msj: string) {
    this.mensajeSucccess = msj;
    this.mostrarSuccess = true;

    setTimeout(() => {
      this.mostrarSuccess = false;
      this.cdr.detectChanges();
    }, 3000);
  }
}

