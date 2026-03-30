import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador personalizado para email
 * Valida formato de correo electrónico
 */
export function emailValidator(): ValidatorFn {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // No validar si está vacío (usa Validators.required para eso)
    }
    return emailPattern.test(control.value) ? null : { invalidEmail: true };
  };
}

/**
 * Validador personalizado para contraseña fuerte
 * Requiere: mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número, 1 carácter especial
 */
export function strongPasswordValidator(): ValidatorFn {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    return passwordPattern.test(control.value) 
      ? null 
      : { weakPassword: true };
  };
}

/**
 * Validador personalizado para contraseña simple
 * Requiere: mínimo 6 caracteres, 1 letra y 1 número
 */
export function simplePasswordValidator(): ValidatorFn {
  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    return passwordPattern.test(control.value)
      ? null
      : { invalidPassword: true };
  };
}

/**
 * Validador personalizado para nombre de usuario
 * Solo letras, números, guiones y guiones bajos. Mínimo 3 caracteres.
 */
export function usernameValidator(): ValidatorFn {
  const usernamePattern = /^[a-zA-Z0-9_-]{3,}$/;
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    return usernamePattern.test(control.value)
      ? null
      : { invalidUsername: true };
  };
}

/**
 * Validador personalizado para teléfono
 * Formato: 10 dígitos (colombiano: 300 123 4567 o 3001234567)
 */
export function phoneValidator(): ValidatorFn {
  const phonePattern = /^(?:\d{3}\s?)?\d{3}\s?\d{4}$|^\d{10}$/;
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    return phonePattern.test(control.value)
      ? null
      : { invalidPhone: true };
  };
}

/**
 * Validador personalizado para nombre (solo letras y espacios)
 */
export function nameValidator(): ValidatorFn {
  const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/;
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    return namePattern.test(control.value)
      ? null
      : { invalidName: true };
  };
}

/**
 * Validador para longitud mínima de contraseña
 */
export function minPasswordLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    return control.value.length >= minLength
      ? null
      : { minPasswordLength: { requiredLength: minLength, actualLength: control.value.length } };
  };
}
