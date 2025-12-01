import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-bogota',
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-bogota.html',
  styleUrl: './blog-bogota.css',
})
export class BlogBogota {
  formVisible = false;

  openForm() {
    console.log('BlogBogota.openForm called');
    this.formVisible = true;
  }

  closeForm() {
    this.formVisible = false;
  }
}
