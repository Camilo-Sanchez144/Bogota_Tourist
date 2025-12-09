import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Acceso } from '../services/acceso';
import { appsettings } from '../settings/appsettings';
import { emailValidator, phoneValidator } from '../validators/custom-validators';

@Component({
  selector: 'app-dashboard-user',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './dashboard-user.html',
  styleUrl: './dashboard-user.css',
})
export class DashboardUser {
  private accesoService = inject(Acceso);
  private fb = inject(FormBuilder);
  user = JSON.parse(localStorage.getItem("user") || '{}');
  nombre = [this.user?.first_name, this.user?.last_name].filter(Boolean).join(' ').trim();
  email = this.user.email;
  cellphone = this.user.cellphone;
  bio: string = this.user.bio || '';
  profile_picture: File | null = null;
  previewUrl: string = this.resolvePhoto(this.user.profile_picture) || 'https://i.imgur.com/1X4pYkP.png';
  profileForm: FormGroup = this.fb.group({
    email: [this.email || '', [Validators.required, emailValidator()]],
    cellphone: [this.cellphone || '', [Validators.required, phoneValidator()]],
    bio: [this.bio || ''],
  });

  passwordForm: FormGroup = this.fb.group(
    {
      newPassword: ['', [Validators.required]],
      confirmNewPassword: ['', [Validators.required]],
    },
    { validators: this.passwordsMatchValidator }
  );

  passwordError = ''
  formPasswordVisible = false;

  private passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const newPassword = group.get('newPassword')?.value;
    const confirm = group.get('confirmNewPassword')?.value;
    if (!newPassword || !confirm) return null;
    return newPassword === confirm ? null : { passwordsMismatch: true };
  }
  
  openFormPassword() {
  this.formPasswordVisible = true;
  }
  formVisible = false;

  openForm() {
    console.log('BlogBogota.openForm called');
    this.formVisible = true;
  }

  closeForm() {
    this.formVisible = false;
    this.formPasswordVisible = false;
  }
  changePassword(){
    this.passwordError = '';
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    const newPassword = this.passwordForm.get('newPassword')?.value;
    const userId = this.user?.id;
      if (!userId) {
      console.error('No hay id de usuario para actualizar');
      return;
    }
    const formData = new FormData();
    formData.append('password', (newPassword || '').trim());
    this.accesoService.updateUser(userId, formData).subscribe({
      next: (userActualizado) => {
        localStorage.setItem('user', JSON.stringify(userActualizado));
        this.passwordForm.reset();
        this.formPasswordVisible = false;
        this.passwordError = '';
        console.log('Contraseña actualizada');
      },
      error: (err) => {
        console.error('Error al actualizar contraseña:', err);
        this.passwordError = 'No se pudo actualizar la contraseña';
      }
    });
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.profile_picture = input.files && input.files[0] ? input.files[0] : null;
    if (this.profile_picture) {
      this.previewUrl = URL.createObjectURL(this.profile_picture);
    }
  }

  onSubmitProfile() {
    this.passwordError = '';
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const { email, cellphone, bio } = this.profileForm.value;
    const formData = new FormData();
    formData.append('username', this.user.username || '');
    formData.append('email', email || '');
    formData.append('cellphone', cellphone || '');
    formData.append('bio', bio || '');

    if (this.profile_picture) {
      formData.append('profile_picture', this.profile_picture);
    }

    const userId = this.user?.id;
    if (!userId) {
      console.error('No hay id de usuario para actualizar');
      return;
    }

    this.accesoService.updateUser(userId, formData).subscribe({
      next: (userActualizado) => {
        this.user = userActualizado;
        this.nombre = [userActualizado.first_name, userActualizado.last_name].filter(Boolean).join(' ').trim();
        this.email = userActualizado.email;
        this.cellphone = userActualizado.cellphone;
        this.bio = userActualizado.bio || '';
        this.previewUrl = this.resolvePhoto(userActualizado.profile_picture) || this.previewUrl;
        this.profileForm.patchValue({
          email: userActualizado.email,
          cellphone: userActualizado.cellphone,
          bio: userActualizado.bio || '',
        });
        localStorage.setItem('user', JSON.stringify(userActualizado));

        console.log('Perfil actualizado');
      },
      error: (err) => {
        console.error('Error al actualizar perfil:', err);
      }
    });
  }

  getControlError(form: FormGroup, controlName: string): string {
    const control = form.get(controlName);
    if (!control || !control.touched || !control.errors) return '';
    const errors = control.errors;
    if (errors['required']) return 'Este campo es requerido';
    if (errors['invalidEmail']) return 'Email inválido';
    if (errors['invalidPhone']) return 'Teléfono inválido';
    if (errors['minlength']) return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
    return 'Campo inválido';
  }

  passwordsMismatch(): boolean {
    return this.passwordForm.hasError('passwordsMismatch') && this.passwordForm.get('confirmNewPassword')?.touched === true;
  }

  private resolvePhoto(url?: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    const base = appsettings.apiUrl.replace(/\/api\/?$/,'');
    const normalized = url.startsWith('/') ? url : `/${url}`;
    return `${base}${normalized}`;
  }
}
