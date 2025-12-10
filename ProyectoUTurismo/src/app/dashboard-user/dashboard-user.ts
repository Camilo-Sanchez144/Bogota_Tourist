import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Acceso } from '../services/acceso';
import { TripsService } from '../services/trips.service';
import { ExperiencesService } from '../services/experiences.service';
import { LocationsService } from '../services/locations.service';
import { Trip } from '../interfaces/Trip';
import { Post } from '../interfaces/Post';
import { Place } from '../interfaces/Place';
import { appsettings } from '../settings/appsettings';
import { emailValidator, phoneValidator } from '../validators/custom-validators';

@Component({
  selector: 'app-dashboard-user',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard-user.html',
  styleUrl: './dashboard-user.css',
})
export class DashboardUser implements OnInit {
  private accesoService = inject(Acceso);
  private tripsService = inject(TripsService);
  private experiencesService = inject(ExperiencesService);
  private locationsService = inject(LocationsService);
  private fb = inject(FormBuilder);
  
  user = JSON.parse(localStorage.getItem("user") || '{}');
  trips: Trip[] = [];
  posts: Post[] = [];
  reviews: any[] = [];
  placesList: Place[] = [];
  
  // Properties for Trip Edit (matching PlanearViaje)
  categories = [
    "Historia",
    "Gastronomía",
    "Naturaleza",
    "Vida nocturna",
    "Arte",
    "Aventura"
  ];
  lugares: string[] = [];
  selectedlugares: string[] = [];
  selectedCategories: string[] = [];

  nombre = [this.user?.first_name, this.user?.last_name].filter(Boolean).join(' ').trim();
  ngOnInit(): void {
    this.loadTrips();
    this.loadPosts();
    this.loadPlaces();
    this.loadReviews();
  }

  loadPlaces() {
    this.locationsService.getPlaces().subscribe({
      next: (places: Place[]) => {
        this.placesList = places;
        this.lugares = places.map(p => p.name);
      },
      error: (err) => console.error('Error loading places', err)
    });
  }

  loadReviews() {
    this.locationsService.getUserReviews().subscribe({
      next: (reviews) => {
        this.reviews = reviews;
      },
      error: (err) => console.error('Error loading reviews', err)
    });
  }

  togglelugares(lugares: string) {
    const index = this.selectedlugares.indexOf(lugares);
    if (index === -1) {
      this.selectedlugares.push(lugares);
    } else {
      this.selectedlugares.splice(index, 1);
    }
  }

  toggleCategory(category: string) {
    const index = this.selectedCategories.indexOf(category);
    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }
  }

  loadTrips() {
    console.log('Iniciando carga de viajes...');
    this.tripsService.getTrips().subscribe({
      next: (trips) => {
        console.log('Viajes cargados desde el backend:', trips);
        this.trips = trips;
        console.log('Variable trips actualizada:', this.trips);
      },
      error: (err) => console.error('Error cargando viajes:', err)
    });
  }

  loadPosts() {
    if (this.user?.id) {
      this.experiencesService.getPostsByUser(this.user.id).subscribe({
        next: (posts) => {
          this.posts = posts;
        },
        error: (err) => console.error('Error cargando posts:', err)
      });
    }
  }

  get activeTripsCount(): number {
    return this.trips.filter(t => t.is_active).length;
  }

  get completedTripsCount(): number {
    return this.trips.filter(t => !t.is_active).length;
  }

  email = this.user.email;
  cellphone = this.user.cellphone;
  bio: string = this.user.bio || '';
  profile_picture: File | null = null;
  previewUrl: string = this.resolvePhoto(this.user.profile_picture) || 'https://i.imgur.com/1X4pYkP.png';
  previewUrlTemp: string | null = null;
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
  successMessage = '';
  showSuccess = false;

  // Trip Edit Logic
  tripFormVisible = false;
  selectedTripId: number | null = null;
  
  tripForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    travel_date: ['', Validators.required],
    number_of_people: [1, [Validators.required, Validators.min(1)]],
    daily_budget: [''],
    plan_name: [''],
    plan_price: [''],
    is_active: [true]
  });

  openTripModal(trip: Trip) {
    this.selectedTripId = trip.id || null;
    
    // Parse description to extract categories and places
    this.selectedCategories = [];
    this.selectedlugares = [];
    
    if (trip.description) {
      // Robust parsing for Categories
      const catRegex = /Categorías:\s*(.*?)(?=\.?\s*Lugares:|$)/i;
      const catMatch = trip.description.match(catRegex);
      
      if (catMatch && catMatch[1]) {
        this.selectedCategories = catMatch[1].split(',').map(c => c.trim()).filter(c => c !== '');
      }
      
      // Robust parsing for Places
      const lugRegex = /Lugares:\s*(.*)$/i;
      const lugMatch = trip.description.match(lugRegex);
      
      if (lugMatch && lugMatch[1]) {
        this.selectedlugares = lugMatch[1].split(',').map(l => l.trim()).filter(l => l !== '');
      }
    }

    this.tripForm.patchValue({
      title: trip.title,
      description: trip.description,
      travel_date: trip.travel_date,
      number_of_people: trip.number_of_people,
      daily_budget: trip.daily_budget,
      plan_name: trip.plan_name,
      plan_price: trip.plan_price,
      is_active: trip.is_active
    });
    this.tripFormVisible = true;
  }

  closeTripModal() {
    this.tripFormVisible = false;
    this.selectedTripId = null;
    this.tripForm.reset();
    this.selectedCategories = [];
    this.selectedlugares = [];
  }

  updateTrip() {
    if (this.tripForm.invalid || !this.selectedTripId) return;
    
    // Reconstruct description
    const newDescription = `Categorías: ${this.selectedCategories.join(', ')}. Lugares: ${this.selectedlugares.join(', ')}`;
    this.tripForm.patchValue({ description: newDescription });

    const updatedData = this.tripForm.value;
    this.tripsService.updateTrip(this.selectedTripId, updatedData).subscribe({
      next: (res) => {
        console.log('Trip updated:', res);
        this.loadTrips(); // Refresh list
        this.closeTripModal();
        this.successMessage = 'Viaje actualizado correctamente';
        this.showSuccess = true;
        setTimeout(() => this.showSuccess = false, 3000);
      },
      error: (err) => console.error('Error updating trip', err)
    });
  }

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
    this.formVisible = true;
  }

  closeForm() {
    this.formVisible = false;
    this.formPasswordVisible = false;
    this.previewUrlTemp = null;
    this.profile_picture = null;
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
        this.showSuccessMessage('Contraseña actualizada correctamente');
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
      this.previewUrlTemp = URL.createObjectURL(this.profile_picture);
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
        this.previewUrlTemp = null;
        this.profile_picture = null;
        this.profileForm.patchValue({
          email: userActualizado.email,
          cellphone: userActualizado.cellphone,
          bio: userActualizado.bio || '',
        });
        localStorage.setItem('user', JSON.stringify(userActualizado));
        this.showSuccessMessage('Perfil actualizado correctamente');
        this.formVisible = false;
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

  private async showSuccessMessage(msg: string) {
    this.successMessage = msg;
    this.showSuccess = true;
    await new Promise(resolve => setTimeout(resolve, 5000));
    this.showSuccess = false;
  }

  // Post Edit Logic
  postFormVisible = false;
  selectedPostId: number | null = null;
  selectedPostFile: File | null = null;

  postForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(20)]],
    rating: [5, Validators.required],
    location: [1, Validators.required]
  });

  openPostModal(post: Post) {
    this.selectedPostId = post.id || null;
    this.postForm.patchValue({
      title: post.title,
      description: post.description,
      rating: post.rating,
      location: post.location || 1
    });
    this.postFormVisible = true;
  }

  closePostModal() {
    this.postFormVisible = false;
    this.selectedPostId = null;
    this.postForm.reset();
    this.selectedPostFile = null;
  }

  onPostFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedPostFile = file;
    }
  }

  updatePost() {
    if (this.postForm.invalid || !this.selectedPostId) return;

    const updatedData = this.postForm.value;
    this.experiencesService.updatePost(this.selectedPostId, updatedData).subscribe({
      next: (post) => {
        if (this.selectedPostFile && this.selectedPostId) {
          this.experiencesService.uploadPostMedia(this.selectedPostId, this.selectedPostFile).subscribe({
            next: () => {
              this.showSuccessMessage('Artículo actualizado correctamente con imagen');
              this.loadPosts();
              this.closePostModal();
            },
            error: (err) => {
              console.error('Error uploading image', err);
              this.showSuccessMessage('Artículo actualizado, pero falló la subida de la imagen');
              this.loadPosts();
              this.closePostModal();
            }
          });
        } else {
          this.showSuccessMessage('Artículo actualizado correctamente');
          this.loadPosts();
          this.closePostModal();
        }
      },
      error: (err) => console.error('Error updating post', err)
    });
  }

  // Review Logic
  reviewFormVisible = false;
  reviewForm: FormGroup = this.fb.group({
    place: ['', Validators.required],
    title: ['', Validators.required],
    comment: ['', [Validators.required, Validators.minLength(10)]],
    rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    visit_date: [new Date().toISOString().split('T')[0]]
  });

  openReviewModal() {
    this.reviewFormVisible = true;
  }

  closeReviewModal() {
    this.reviewFormVisible = false;
    this.reviewForm.reset({
      rating: 5,
      visit_date: new Date().toISOString().split('T')[0]
    });
  }

  createReview() {
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    const reviewData = this.reviewForm.value;
    // Ensure place is sent as ID
    if (typeof reviewData.place === 'object') {
      reviewData.place = reviewData.place.id;
    }

    this.locationsService.createReview(reviewData).subscribe({
      next: (res) => {
        this.showSuccessMessage('Reseña creada exitosamente');
        this.loadReviews();
        this.closeReviewModal();
      },
      error: (err) => {
        console.error('Error creating review', err);
        if (err.error && err.error.error) {
           // Handle specific errors like "unique_together" if backend returns friendly message
           alert('Error: ' + err.error.error);
        } else {
           alert('Error al crear la reseña. Verifica que no hayas reseñado este lugar antes.');
        }
      }
    });
  }

  private resolvePhoto(url?: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    const base = appsettings.apiUrl.replace(/\/api\/?$/,'');
    const normalized = url.startsWith('/') ? url : `/${url}`;
    return `${base}${normalized}`;
  }
}
