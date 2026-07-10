
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EventService } from '../services/event.service';
import { Place } from '../interfaces/Place';
import { IEvent } from '../interfaces/Event';
import { ChangeDetectorRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../interfaces/Usuario';

@Component({
  selector: 'eventos',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './eventos.html',
  styleUrl: './eventos.css',
})
export class PlanearViaje implements OnInit {
  private eventsService = inject(EventService);
  private userService = inject(UserService)
  formVisible = false;
  user: Usuario | null = null
  events: IEvent[] = []
  event: IEvent | null = null;
  error: string = "";
  private cdr = inject(ChangeDetectorRef);
  private authservice =inject(AuthService)

  selectedPlan: any = null;


  openForm() {
    this.formVisible = true;
  }

  closeForm() {
    this.formVisible = false;
    this.error=""; 
  }
  enviarFormulario(){
    
  }
  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventsService.getEvent().subscribe({
      next: (data) => {
        this.events = data
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading events', err)
    });
  }
  loadEventById(id:number){
    this.eventsService.getEventById(id).subscribe({
      next:(event)=>{
        const userId = this.authservice.getCurrentUserId()
          this.userService.getUserById(userId).subscribe({
            next:(user)=>{
              this.user = user
              this.cdr.detectChanges();
            },
            error: (err) => console.error('Error loading user', err)
          }
        )
        this.event = event
        this.openForm()
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading events', err)
    });
  }
  sendForm(eventid:any){
    this.eventsService.joinEvent(eventid).subscribe({
      next:(eventsuscribed)=>{
        alert(`Te has inscrito al evento "${eventsuscribed.event.title}", ¡Buena suerte!` )
        this.closeForm();
      },
      error: (err) => {
        if (err.status == 400 || err.status == 500) {
            if (err.error == 'Ya estás inscrito en este evento') {
              this.error = 'Ya estás inscrito en este evento'
            } else if (err.error == 'El evento está lleno') {
              this.error = 'Lo sentimos, el evento está lleno'
            } else {
              this.error ='Ocurrió un error, intenta de nuevo'
              console.log(err)
            }
            this.cdr.detectChanges() 
        }
      }
    })
  }
}
