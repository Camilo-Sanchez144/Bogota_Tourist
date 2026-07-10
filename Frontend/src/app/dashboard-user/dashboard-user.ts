import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { ExperiencesService } from '../services/experiences.service';
import { LocationsService } from '../services/locations.service';
import { EventService } from '../services/event.service';
import { Post } from '../interfaces/Post';
import { Place } from '../interfaces/Place';
import { appsettings } from '../settings/appsettings';
import { emailValidator, phoneValidator } from '../validators/custom-validators';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../interfaces/Usuario';
import { IEvent } from '../interfaces/Event'

@Component({
  selector: 'app-dashboard-user',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard-user.html',
  styleUrl: './dashboard-user.css',
})
export class DashboardUser implements OnInit {
  private experiencesService = inject(ExperiencesService);
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private eventsService = inject(EventService);
  private authservice =inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  user: Usuario | null = null;
  posts: Post[] = [];
  reviews: any[] = [];
  eventsParticipant: IEvent[] = [];
  events: IEvent[] = [];
  placesList: Place[] = [];

  ngOnInit(): void {
    this.loadTrips();
    this.loadPosts();
    this.loadUser();
    this.eventParticipant();
    this.eventsByUser();
    this.loadEvents();
  }
  passwordError = ''
  formPasswordVisible = false;
  successMessage = '';
  showSuccess = false;
  confirmDeletePost = false;
  confirmDeleteEventParticipation = false;
  confirmDeleteEvent = false;
  editEventFormVisible = false;
  tripFormVisible = false;
  selectedTripId: number | null = null;

  selectedlugares: string[] = [];
  selectedCategories: string[] = [];

  name = this.user?.first_name
  email = this.user?.email;
  cellphone = this.user?.cellphone;
  bio: string = this.user?.bio || '';
  profile_picture: File | null = null;
  previewUrlTemp: string | null = null;
  date_of_birth: Date | null = null;

  postFormVisible = false;
  selectedPostId: number | null = null;
  selectedEventParticipationId: number | null = null;
  selectedEventId: number | null = null;
  selectedPostFile: File | null = null;
  postPreviewUrlTemp: string | null = null;

  passwordForm: FormGroup = this.fb.group(
    {
      newPassword: ['', [Validators.required]],
      confirmNewPassword: ['', [Validators.required]],
    },
    { validators: this.passwordsMatchValidator }
  );
  
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

  profileForm: FormGroup = this.fb.group({
    email: [this.email || '', [Validators.required, emailValidator()]],
    cellphone: [this.cellphone || '', [Validators.required, phoneValidator()]],
    bio: [this.bio || '', [Validators.required]],
    date_of_birth: [this.date_of_birth || '', [Validators.required]]
  });

  reviewFormVisible = false;
  reviewForm: FormGroup = this.fb.group({
    place: ['', Validators.required],
    title: ['', Validators.required],
    comment: ['', [Validators.required, Validators.minLength(10)]],
    rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    visit_date: [new Date().toISOString().split('T')[0]]
  });

  eventFormVisible = false;
  eventForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    quota: ['', [Validators.required, Validators.minLength(1)]],
    location: ['', Validators.required],
    date: [new Date().toISOString().split('T')[0]],
    price: ['' , Validators.required]
  });

  openEventModal(){
    this.eventFormVisible = true;
  }
  closeEventModal(){
    this.eventFormVisible = false;
  }
  createEvent(){
    if(this.eventForm.invalid){
      this.eventForm.markAllAsTouched();
      return;
    }
    const { title, description, quota, date, price,location } = this.eventForm.value;
    const newEvent = {
      title: title || '',
      description: description || '',
      max_people: quota ? Number(quota) : 0,
      location: String(location) || '',
      date: date || new Date().toISOString().split('T')[0],
      price: price ? Number(price) : 0
    } as any; 
    
    this.eventsService.createevent(newEvent).subscribe({
      next: () => {
        this.loadEvents();
        this.closeEventModal();
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
      
    })
  }
  loadTrips() {

  }
  loadPosts() {
      this.experiencesService.getPostsByUser().subscribe({
        next: (posts) => {
          this.posts = posts;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error cargando posts:', err)
      });
  }
  loadUser(){
    const userId = this.authservice.getCurrentUserId()
    this.userService.getUserById(userId).subscribe({
      next:(data)=>{
        this.user = data
        this.cdr.detectChanges();
        const birthDate = this.user?.profile?.date_of_birth
        ? new Date(this.user.profile.date_of_birth)
            .toISOString()
            .split('T')[0]
        : '';
        this.profileForm.patchValue({
          email: this.user?.email,
          cellphone: this.user?.cellphone,
          bio: this.user?.profile.bio,
          date_of_birth: birthDate
        });
      },
      error:(err)=>console.error('Error loading user', err)
    })
  }

  loadEvents(){
    this.eventsService.getEvent().subscribe({
      next:(data)=>{
        this.events = data;
        this.cdr.detectChanges();
      },
      error:(err)=>console.error('Error loading user', err)
  });
  }
  openEditEventModal(eventId:any){
    this.editEventFormVisible = true;
    this.selectedEventId = eventId;
    this.eventsService.getEventById(eventId).subscribe({
      
      next:(data)=>{
        const formattedDate = new Date(data.date)
        .toISOString()
        .split('T')[0];
        this.eventForm.patchValue({
        title: data.title,
        description: data.description,
        price: data.price,
        max_people: data.max_people,
        location: data.location,
        date: formattedDate,
        quota: data.max_people
      });

    },error: (err) => console.error(err)
  })
    
  }
  closeEditEventModal(){
    this.editEventFormVisible = false;
    this.selectedEventId = null;
  }
  editEvent(eventId:number){
    const { title, description, quota, date, price,location } = this.eventForm.value;
    const newEvent = {
      title: title || '',
      description: description || '',
      max_people: quota ? Number(quota) : 0,
      location: String(location) || '',
      date: date || new Date().toISOString().split('T')[0],
      price: price ? Number(price) : 0
    } as any; 
    
    this.eventsService.editEvent(eventId,newEvent).subscribe({
      next: () => {
        this.loadEvents();
        this.closeEditEventModal();
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
      
    }) 
  }
  closeTripModal() {
    this.tripFormVisible = false;
    this.selectedTripId = null;
    this.tripForm.reset();
    this.selectedCategories = [];
    this.selectedlugares = [];
  }
  openModalDeletePost(post:number){
    this.selectedPostId = post;
    this.confirmDeletePost = true;
  }
  openModalDeleteEventParticipation(event:number){
    this.confirmDeleteEventParticipation = true;
    this.selectedEventParticipationId = event;
  }
  openModalDeleteEvent(event:number){
    this.confirmDeleteEvent = true;
    this.selectedEventId = event;
  }

  closeModalDelete() {
    this.confirmDeletePost = false;
    this.selectedPostId = null;
    this.confirmDeleteEventParticipation = false;
    this.selectedEventParticipationId = null;
    this.confirmDeleteEvent = false;
    this.selectedEventId = null;
  }

  deletePost(postId:number){
    this.experiencesService.deletePost(postId).subscribe({
      next:()=>{
        this.closeModalDelete();
        this.cdr.detectChanges();
        this.loadPosts();
        this.showSuccessMessage('Se eliminó correctamente la publicación');
      }, error: (err)=>{
          console.error('Error al borrar el post: ', err);
      }
    })
  }
  deleteEvent(eventId: number) {
    this.eventsService.deleteEvent(eventId).subscribe({
      next: () => {
        alert('Se eliminó correctamente la publicación');
        this.closeModalDelete();
        this.cdr.detectChanges();
        this.eventsByUser();
      },
      error: (err) => {
        console.error('Error deleting event: ', err);
      }
    });
  }
  updateTrip() {

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

    const body = {password: (newPassword || '').trim()};
    this.userService.patchUser(body).subscribe({
      next: (userActualizado) => {
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

    const { email, cellphone, bio, date_of_birth } = this.profileForm.value;
    const formData = new FormData();
    formData.append('date_of_birth', date_of_birth || '');
    formData.append('bio', bio || '');

    const body = {cellphone: cellphone, email:email };
    if (this.profile_picture) {
      formData.append('profile_picture', this.profile_picture);
    }

    const userId = this.user?.id;
    if (!userId) {
      console.error('No hay id de usuario para actualizar');
      return;
    }

    this.userService.updateUserProfile(userId, formData).subscribe({
      next: () => {
        this.userService.patchUser(body).subscribe({
          next:(data)=>{
            this.loadUser();
          },
          error: (err) => {
            console.error('Error al actualizar perfil:', err);
          }
        })
        this.cdr.detectChanges()
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

  if (!control || !(control.dirty || control.touched) || !control.errors) {
    return '';
  }

  const errors = control.errors;

  if (errors['required']) return 'Este campo es requerido';
  if (errors['invalidEmail']) return 'Email inválido';
  if (errors['invalidPhone']) return 'Teléfono inválido';
  if (errors['invalidDate']) return 'Fecha inválida';
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

  postForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(20)]]
  });

  openPostModal(post: Post) {
    this.selectedPostId = post.id || null;
    this.postForm.patchValue({
      title: post.title,
      description: post.description
    });
    this.postPreviewUrlTemp = post.imageUrl || null;
    this.postFormVisible = true;
  }

  closePostModal() {
    this.postFormVisible = false;
    this.selectedPostId = null;
    this.postForm.reset();
    this.selectedPostFile = null;
    this.clearPostPreviewUrl();
  }

  onPostFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedPostFile = file;
      this.clearPostPreviewUrl();
      this.postPreviewUrlTemp = URL.createObjectURL(file);
    }
  }

  eventParticipant(){
    this.eventsService.getEventsByUserParticipant().subscribe({
      next:(data) => {
        this.eventsParticipant = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error getting event', err)
    })
  }

  leaveEvent(event:any){
    this.eventsService.leaveEvent(event).subscribe({
      next:()=>{
        this.eventParticipant();
        alert('Se borró su participación en el evento');
        this.closeModalDelete();
      },error:(err)=>console.error('Error deleting event', err)
    })
  }

  eventsByUser(){
    this.eventsService.getEventsByUser().subscribe({
      next:(data)=>{
        this.events = data;
        this.cdr.detectChanges();
      }, error:(err)=>console.error('Error getting event', err)
    })
  }

  updatePost() {
    if (this.postForm.invalid || !this.selectedPostId) {
      this.postForm.markAllAsTouched();
      return;
    }

    const formDataPost = new FormData()
    const { title, description } = this.postForm.value;
    formDataPost.append('title', title)
    formDataPost.append('description', description)
    if(this.selectedPostFile && this.selectedPostId){
      formDataPost.append('image',this.selectedPostFile)
    }

    this.experiencesService.updatePost(this.selectedPostId, formDataPost).subscribe({
      next: () => {
        window.location.reload()
      },
      error: (err) => console.error('Error updating post', err)
    });
  }

  private clearPostPreviewUrl() {
    if (this.postPreviewUrlTemp?.startsWith('blob:')) {
      URL.revokeObjectURL(this.postPreviewUrlTemp);
    }
    this.postPreviewUrlTemp = null;
  }

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

/*     this.locationsService.createReview(reviewData).subscribe({
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
    }); */
  }
}
