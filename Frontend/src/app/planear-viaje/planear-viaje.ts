import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-planear-viaje',
  imports: [CommonModule, RouterLink, SlicePipe],
  templateUrl: './planear-viaje.html',
  styleUrl: './planear-viaje.css',
})
export class PlanearViaje implements OnInit{
  
  ngOnInit(): void {

  }
}
