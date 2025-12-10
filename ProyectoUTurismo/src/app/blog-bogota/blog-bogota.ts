import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExperiencesService } from '../services/experiences.service';
import { Post } from '../interfaces/Post';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-bogota',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './blog-bogota.html',
  styleUrl: './blog-bogota.css',
})
export class BlogBogota implements OnInit {
  formVisible = false;
  posts: Post[] = [];
  private experiencesService = inject(ExperiencesService);
  private fb = inject(FormBuilder);

  postForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(20)]],
    rating: [5, Validators.required],
    location: [1, Validators.required] // Default location ID for now, should be dynamic
  });

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.experiencesService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (err) => console.error('Error loading posts', err)
    });
  }

  selectedFile: File | null = null;

  openForm() {
    this.formVisible = true;
  }

  closeForm() {
    this.formVisible = false;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (this.postForm.valid) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const newPost = {
        ...this.postForm.value,
        user: user.id // Send the logged-in user ID
      };
      
      this.experiencesService.createPost(newPost).subscribe({
        next: (post) => {
          if (this.selectedFile) {
            this.experiencesService.uploadPostMedia(post.id, this.selectedFile).subscribe({
              next: () => {
                alert('¡Artículo publicado exitosamente con imagen!');
                this.loadPosts(); // Reload to get fresh data
                this.closeForm();
                this.postForm.reset();
                this.selectedFile = null;
              },
              error: (err) => {
                console.error('Error uploading image', err);
                alert('Artículo publicado, pero falló la subida de la imagen.');
                this.loadPosts();
                this.closeForm();
                this.postForm.reset();
              }
            });
          } else {
            this.posts.unshift(post);
            this.closeForm();
            this.postForm.reset();
            alert('¡Artículo publicado exitosamente!');
          }
        },
        error: (err) => {
          console.error('Error creating post', err);
          alert('Error al publicar el artículo. Asegúrate de estar logueado.');
        }
      });
    }
  }
}
