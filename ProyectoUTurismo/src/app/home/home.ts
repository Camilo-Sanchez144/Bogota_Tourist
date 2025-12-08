import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  categorias = ['Todos', 'Salud', 'Hospedaje', 'Transporte', 'Exploración'];
  categoriaSeleccionada = 'Todos';

  items = [
    {
      titulo: 'Aclimatación a la altura',
      descripcion: 'Bogotá está a 2,640 metros sobre el nivel del mar.',
      detalle: 'La ciudad se encuentra a más de 2,600 metros de altura. Es normal sentir fatiga, mareos ligeros o dificultad para respirar las primeras horas. Recomendaciones: bebe mucha agua, come ligero, evita el alcohol el primer día, descansa bien y considera tomar té de coca. La mayoría de personas se aclimatan en 24-48 horas.',
      categoria: 'Salud',
      open: false,
      icon: 'assets/images/Weather.png'
    },
    {
      titulo: 'Mejores zonas para hospedarse',
      descripcion: 'Elige la zona perfecta según tu estilo.',
      detalle: 'Usaquén: barrio bohemio con restaurantes, tiendas y vida nocturna. Chapinero: zona central, comercial y segura. Centro histórico: sitios culturales cercanos pero más congestionado. La Candelaria: cultural, museos y arquitectura colonial. Zona Rosa: moderna, restaurants y vida nocturna premium. Recomendamos Usaquén o Chapinero para visitantes por primera vez.',
      categoria: 'Hospedaje',
      open: false,
      icon: 'assets/images/Hotel.png'
    },
    {
      titulo: 'Transporte público vs Privado',
      descripcion: 'Entiende las opciones de movilidad en Bogotá.',
      detalle: 'TransMilenio: sistema de autobús rápido, económico (3,600 COP) pero muy congestionado. Uber/Didi: conveniente pero más caro (10,000-25,000 COP por viaje). Taxis: seguros, regulados, tarifa por metro. A pie: el centro y Usaquén son muy caminables. Recomendación: usa TransMilenio para distancias largas, Uber para noches tardías, camina en barrios seguros.',
      categoria: 'Transporte',
      open: false,
      icon: 'assets/images/Taxi.png'
    },
    {
      titulo: 'Gastronomía local imprescindible',
      descripcion: 'Proba los sabores más auténticos de Bogotá.',
      detalle: 'Ajiaco: sopa tradicional bogotana con pollo, papas y maíz. Arepa con queso: desayuno colombiano clásico. Empanadas: perfectas para picar entre tours. Café: Colombia produce el mejor café del mundo. Bandeja Paisa: plato completo y abundante. Mazorca: maíz con queso derretido. Come en restaurantes locales, no solo en cadenas turísticas.',
      categoria: 'Exploración',
      open: false,
      icon: 'assets/images/Food.png'
    },
    {
      titulo: 'Museos imprescindibles',
      descripcion: 'Sumérgete en la riqueza cultural.',
      detalle: 'Museo del Oro: colección de orfebrería prehispánica más grande del mundo. Museo Botero: arte de Fernando Botero y otros maestros. La Candelaria: barrio colonial con iglesias y calles históricas. Casa de la Moneda: historia numismática y cultural. Museo Nacional: arte colombiano e internacional. La mayoría son accesibles en el centro histórico caminando.',
      categoria: 'Exploración',
      open: false,
      icon: 'assets/images/Museum.png'
    },
    {
      titulo: 'Monserrate y vistas panorámicas',
      descripcion: 'El santuario más importante de Colombia.',
      detalle: 'Monserrate está a 3,152 metros, 500 metros más alto que Bogotá. Puedes llegar en cable car (teleférico), funicular o a pie en 1 hora. Abre temprano, ideal para ver la ciudad desde arriba. Hay restaurant al llegar. Costo: ~10,000 COP. Ideal como parada en tu primer día para aclimatarte caminando gradualmente.',
      categoria: 'Exploración',
      open: false,
      icon: 'assets/images/Mountain.png'
    }
  ];

  itemsFiltrados() {
    if (this.categoriaSeleccionada === 'Todos') return this.items;
    return this.items.filter(i => i.categoria === this.categoriaSeleccionada);
  }
}