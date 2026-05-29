import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EventService } from '../services/event.service';
import { Place } from '../interfaces/Place';
import { Event } from '../interfaces/Event';

@Component({
  selector: 'app-planear-viaje',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './planear-viaje.html',
  styleUrl: './planear-viaje.css',
})
export class PlanearViaje implements OnInit {
  private eventsService = inject(EventService);
formVisible = false;
events: Event[] = []

selectedPlan: any = null;

items = ['1', '2', '3', '4', '5', 'Más'];
selectedOption = '';

form = {
  titulo: '',
  selectedOption: '',
  presupuesto: '',
  planTitulo: '',
  planPrecio: ''
};


openForm(plan: any) {
  this.selectedPlan = plan;

  this.form.planTitulo = plan.titulo;
  this.form.planPrecio = plan.precio;

  this.formVisible = true;
}

closeForm() {
  this.formVisible = false;
}
enviarFormulario(){
  
}
/* enviarFormulario() {
    const event: Event = {
      title: this.form.planTitulo || 'Mi Viaje a Bogotá',
      travel_date: this.form.date,
      number_of_people: parseInt(this.form.selectedOption) || 1,
      daily_budget: this.form.presupuesto ? parseFloat(this.form.presupuesto) : 0,
      plan_name: this.form.planTitulo,
      plan_price: this.form.planPrecio ? parseFloat(this.form.planPrecio) : 0,
      description: `Categorías: ${this.selectedCategories.join(', ')}. Lugares: ${this.selectedlugares.join(', ')}`
    };

    if (!localStorage.getItem('access')) {
      alert('Debes iniciar sesión para crear un viaje.');
      return;
    }

    this.tripsService.createTrip(trip).subscribe({
      next: (res) => {
        console.log('Viaje creado:', res);
        alert('¡Viaje creado exitosamente!');
        this.limpiarFormulario();
        this.closeForm();
      },
      error: (err) => {
        console.error('Error creando viaje:', err);
        if (err.status === 401) {
          alert('Tu sesión ha expirado o no es válida. Por favor, inicia sesión nuevamente.');
        } else {
          alert('Error al crear el viaje. Intenta nuevamente.');
        }
      }
    });
  } */
/* limpiarFormulario() {
  this.form.date = '';
  this.form.selectedOption = '';
  this.form.presupuesto = '';
} */
/* categories = [
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
 */
  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventsService.getEvent().subscribe({
      next: (data) => {
        this.events = data
        console.log(data)
      },
      error: (err) => console.error('Error loading events', err)
    });
  }

  /* togglelugares(lugares: string) {
  const index = this.selectedlugares.indexOf(lugares);

  if (index === -1) {
    // agregar
    this.selectedlugares.push(lugares);
  } else {
    // quitar
    this.selectedlugares.splice(index, 1);
  }
}
toggleCategory(category: string) {
  const index = this.selectedCategories.indexOf(category);

  if (index === -1) {
    // agregar
    this.selectedCategories.push(category);
  } else {
    // quitar
    this.selectedCategories.splice(index, 1);
  }
}
planes =[
    {
    id:1,
    titulo: 'Ciclovía de Bogotá: La Ruta del Domingo',
    descripcion: 'Descubre la icónica Ciclovia de Bogotá: 120km de carril exclusivo todos los domingos. Historia, Rutas y Tips',
    duracion: '1 día',
    destacados:['Ciclovia','Rutas','Alquiler', 'Seguridad', 'Experiencia'],
    precio: 499
  },
  {
    id:2,
    titulo: 'Bogotá en 24 Horas',
    descripcion: 'La introducción perfecta a Bogotá. Visita los lugares icónicos y prueba comida tradicional.',
    duracion:'1 día', 
    destacados:['Altitud','Preparación','Presupuesto','Seguridad'],
    precio: 120
  },
  {
    id:3,
    titulo: 'Fin de Semana Cultural',
    descripcion: 'Sumérgete en la cultura bogotana con visitas profundas a museos, barrios locales y arte urbano.',
    duracion: '2-3 días',
    destacados:['Museo del Oro','La Candelaria','Usaquén','Ciclovía','Galerias de arte'],
    precio: 280
  },
  {
    id:4,
    titulo: 'Aventura Gastronómica',
    descripcion: 'Explora los sabores auténticos de Colombia con chef locales y mercados tradicionales.',
    duracion: '3 días',
    destacados:['Mercado San Alejo','Restaurantes secretos','Café Colombiano','Tours culinarios'],
    precio: 350
  },
  {
    id:5,
    titulo: 'Ruta Gastronómica: Sabores de Colombia',
    descripcion: 'Descubre los mejores restaurantes, mercados tradicionales y prueba comida autentica colombiana en Bogotá',
    duracion: '1 día',
    destacados:['Mercados','Recetas','Cafés', 'Bebidas'],
    precio: 270
  },
  {
    id:6,
    titulo: 'La Bogotá insólita: Secretos Locales',
    descripcion: 'Lugares que solo los Colombianos conocen. Galerias escondidas, cafés de barrio y experiencias auténticas',
    duracion: '1-2 días',
    destacados:['Barrios','Arte Urbano','Vida Nocturna', 'Eventos'],
    precio: 300
  }
] */
}
