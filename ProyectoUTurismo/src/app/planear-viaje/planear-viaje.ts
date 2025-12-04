import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-planear-viaje',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './planear-viaje.html',
  styleUrl: './planear-viaje.css',
})
export class PlanearViaje {
formVisible = false;

selectedPlan: any = null;

items = ['1', '2', '3', '4', '5', 'Más'];
selectedOption = '';

form = {
  date: '',
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

enviarFormulario() {
  // Construir payload incluyendo categorías seleccionadas y plan completo
  const body = {
    ...this.form,
    selectedCategories: this.selectedCategories,
    planCompleto: this.selectedPlan
  };

  // Aquí puedes enviar `body` a tu API con fetch o HttpClient.
  // Ejemplo simple (fetch):
  // fetch('/api/planes', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) })
  //   .then(r => r.json()).then(res => console.log('respuesta', res));

  console.log('Datos enviados:', body);
  this.limpiarFormulario();
}
limpiarFormulario() {
  this.form.date = '';
  this.form.selectedOption = '';
  this.form.presupuesto = '';
}
categories = [
  "Historia",
  "Gastronomía",
  "Naturaleza",
  "Vida nocturna",
  "Arte",
  "Aventura"
];
lugares=[
  "+ Monserrate",
  "+ La Candelaria",
  "+ Museo del Oro",
  "+ Usaquén",
  "+ Jardín Botánico",
  "+ Planetario de Bogotá"
]
selectedlugares: string[] = [];
selectedCategories: string[] = [];

togglelugares(lugares: string) {
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
]
}
