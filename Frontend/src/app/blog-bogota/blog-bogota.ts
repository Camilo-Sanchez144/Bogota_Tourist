import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExperiencesService } from '../services/experiences.service';
import { Post } from '../interfaces/Post';
import { Comments } from '../interfaces/Comments';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-blog-bogota',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './blog-bogota.html',
  styleUrl: './blog-bogota.css',
})
export class BlogBogota implements OnInit {
  formVisible = false;
  postVisible = false;
  selectedPost: Post | null = null;
  comments: Comments[] = [];
  posts: Post[] = [];

  replyingTo: number | null = null;   
  replyContent: string = '';
  newComment: string = '';
  liked: boolean = false;

  private experiencesService = inject(ExperiencesService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  postForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(20)]],
  });

  ngOnInit(): void {
    this.loadPosts();
  }
  loadComments(id:number){
    this.experiencesService.getCommentsByPost(id).subscribe({
      next:(data)=>{
        this.comments = data;
        this.cdr.detectChanges();
        console.log(data)
      },
      error:(err)=>console.error('Error loading comments', err)
    })
  }
  loadPosts() {
    this.experiencesService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading posts', err)
    });
  }
  openPost(){
    this.postVisible = true
  }

  closePost() {
    this.postVisible = false;
    this.selectedPost = null;
    this.comments = [];
    this.replyingTo = null; 
    this.replyContent = '';
    this.newComment = '';
    this.liked = false;
    this.cdr.detectChanges()
  }
  openForm() {
    this.formVisible = true;
  }

  closeForm() {
    this.formVisible = false;
  }
  viewPost(id:number){
    this.experiencesService
      .getPostById(id)
      .subscribe({

        next:(data)=>{
          this.loadComments(id)
          this.selectedPost = data;
          this.postVisible = true
          this.cdr.detectChanges();
          console.log(data);
        },
        error:(err)=>{
          console.error(err);
        }
      });
  }
  selectedFile: File | null = null;
  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  submitComment() {
    if (!this.newComment.trim() || !this.selectedPost) return;
    this.experiencesService.createComment(this.selectedPost.id, this.newComment).subscribe({
      next: () => {
        this.newComment = '';
        this.loadComments(this.selectedPost!.id);
      },
      error: (err) => console.error(err)
    });
  }

  submitReply(parentId: number) {
    if (!this.replyContent.trim() || !this.selectedPost) return;
    this.experiencesService.createComment(this.selectedPost.id, this.replyContent, parentId).subscribe({
      next: () => {
        this.replyContent = '';
        this.replyingTo = null;
        this.loadComments(this.selectedPost!.id);
      },
      error: (err) => console.error(err)
    });
  }

  toggleLike() {
    if (!this.selectedPost) return;
    this.experiencesService.toggleLike(this.selectedPost.id).subscribe({
      next: (res) => {
        this.liked = res.liked;
        this.selectedPost!.likes_count = res.likes_count;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }
  onSubmit() {
    if (this.postForm.valid) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const formData = new FormData();

      formData.append('title', this.postForm.value.title);
      formData.append('description', this.postForm.value.description);
      formData.append('user', user.id);

      if(this.selectedFile){
        formData.append('image', this.selectedFile);
      }

      this.experiencesService.createPost(formData).subscribe({
        next: (post) => {
            this.loadPosts();
            this.closeForm();
            this.postForm.reset();
            this.selectedFile = null;
            alert('¡Artículo publicado exitosamente!');
          },
        error: (err) => {
          console.error('Error creating post', err);
          console.log(formData.values)
          alert('Error al publicar el artículo. Asegúrate de llenar los campos correctamente');
        }
      });
    }
  }
}
