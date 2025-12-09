/// <reference types="google.maps" />
import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit, NgZone } from '@angular/core'; // 1. Importamos NgZone

@Component({
  selector: 'app-explorarmapa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './explorarmapa.html',
  styleUrl: './explorarmapa.css'
})
export class Explorarmapa implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  map!: google.maps.Map;
  infoWindow!: google.maps.InfoWindow;
  placesService!: google.maps.places.PlacesService;
  directionsService!: google.maps.DirectionsService;
  directionsRenderer!: google.maps.DirectionsRenderer;

  filtroActual: string = 'Todos';
  rutaActiva: boolean = false;
  
  // --- VARIABLES PARA EL MODAL ---
  modalVisible: boolean = false;
  selectedPlaceDetails: any = null; 
  isLoadingDetails: boolean = false; 

  sitios: any[] = [
    { nombre: 'Monserrate', lat: 4.6058, lng: -74.0555, categoria: 'Naturaleza', descripcion: 'El cerro tutelar de la ciudad.', imagen: '' },
    { nombre: 'Museo del Oro', lat: 4.6018, lng: -74.0719, categoria: 'Cultura', descripcion: 'Colección de orfebrería única.', imagen: '' },
    { nombre: 'Jardín Botánico de Bogotá', lat: 4.6661, lng: -74.1003, categoria: 'Naturaleza', descripcion: 'Centro de investigación y educación.', imagen: '' },
    { nombre: 'La Candelaria', lat: 4.5969, lng: -74.0729, categoria: 'Historia', descripcion: 'Centro histórico y colonial.', imagen: '' },
    { nombre: 'Usaquén', lat: 4.6965, lng: -74.0306, categoria: 'Cultura', descripcion: 'Pueblo colonial y mercado de pulgas.', imagen: '' },
    { nombre: 'Planetario de Bogotá', lat: 4.6122, lng: -74.0700, categoria: 'Cultura', descripcion: 'Escenario de divulgación científica.', imagen: '' }
  ];

  sitiosFiltrados: any[] = [];
  marcadores: google.maps.Marker[] = [];

  // 2. Inyectamos NgZone en el constructor
  constructor(private ngZone: NgZone) {
    this.sitiosFiltrados = [...this.sitios];
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    const bogota = { lat: 4.6097, lng: -74.0817 };
    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: bogota,
      zoom: 12,
      mapTypeControl: false,
      fullscreenControl: false,
      styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }] 
    });

    this.infoWindow = new google.maps.InfoWindow();
    this.placesService = new google.maps.places.PlacesService(this.map);
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      map: this.map,
      suppressMarkers: true,
      polylineOptions: { strokeColor: '#0052A6', strokeWeight: 5 }
    });

    this.cargarMarcadores();
    this.cargarImagenesIniciales();
  }

  cargarMarcadores(): void {
    this.marcadores.forEach(m => m.setMap(null));
    this.marcadores = [];

    this.sitiosFiltrados.forEach((sitio) => {
      const marker = new google.maps.Marker({
        position: { lat: sitio.lat, lng: sitio.lng },
        map: this.map,
        title: sitio.nombre,
        animation: google.maps.Animation.DROP
      });

      // 3. CORRECCIÓN CLICK MARCADOR: Usamos ngZone.run()
      marker.addListener('click', () => {
        this.ngZone.run(() => {
          this.abrirModalDetalles(sitio);
        });
      });

      this.marcadores.push(marker);
    });
  }

  cargarImagenesIniciales(): void {
    this.sitios.forEach(sitio => {
      const request = { query: sitio.nombre + " Bogotá", fields: ['photos', 'place_id'] };
      this.placesService.findPlaceFromQuery(request, (results: any, status: any) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results && results[0]) {
          if (results[0].photos) sitio.imagen = results[0].photos[0].getUrl({ maxWidth: 400 });
          sitio.place_id = results[0].place_id; 
        } else {
          sitio.imagen = 'assets/placeholder.jpg'; 
        }
      });
    });
  }

  abrirModalDetalles(sitio: any): void {
    this.modalVisible = true;
    this.isLoadingDetails = true;
    this.selectedPlaceDetails = { ...sitio };

    // 4. CORRECCIÓN PRELOADER: Timeout de seguridad (3 segundos)
    setTimeout(() => {
      this.ngZone.run(() => {
        if (this.isLoadingDetails) {
          this.isLoadingDetails = false;
          console.log("Timeout de carga finalizado");
        }
      });
    }, 3000);

    if (sitio.place_id) {
      const request = {
        placeId: sitio.place_id,
        fields: ['name', 'rating', 'formatted_phone_number', 'website', 'opening_hours', 'photos', 'reviews', 'url']
      };

      this.placesService.getDetails(request, (place, status) => {
        // 5. CORRECCIÓN PRELOADER: Usamos ngZone.run() en el callback de la API
        this.ngZone.run(() => {
          this.isLoadingDetails = false; // Esto ahora actualizará la vista inmediatamente
          
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            this.selectedPlaceDetails = {
              ...this.selectedPlaceDetails,
              googleRating: place.rating,
              phone: place.formatted_phone_number,
              website: place.website,
              openNow: place.opening_hours?.isOpen(),
              weekdayText: place.opening_hours?.weekday_text,
              googleUrl: place.url,
              reviews: place.reviews?.slice(0, 3),
              photos: place.photos?.map(p => p.getUrl({ maxWidth: 600, maxHeight: 400 })) || []
            };
          }
        });
      });
    } else {
      this.isLoadingDetails = false; 
    }
  }

  cerrarModal(): void {
    this.modalVisible = false;
    this.selectedPlaceDetails = null;
  }

  // 6. CORRECCIÓN RUTA: Guardamos la referencia antes de borrarla
  calcularRutaDesdeModal(): void {
    const destinoGuardado = this.selectedPlaceDetails; // Guardamos antes de cerrar
    this.cerrarModal(); // Ahora selectedPlaceDetails es null, pero tenemos destinoGuardado
    
    if (destinoGuardado) {
      this.calcularRuta(destinoGuardado);
    }
  }

  calcularRuta(destino: any): void {
    if (!navigator.geolocation) {
      alert("Navegador sin soporte GPS");
      return;
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      const request: any = {
        origin: { lat: pos.coords.latitude, lng: pos.coords.longitude },
        destination: { lat: destino.lat, lng: destino.lng },
        travelMode: google.maps.TravelMode.DRIVING
      };
      this.directionsService.route(request, (result: any, status: any) => {
        this.ngZone.run(() => { // Buena práctica envolver esto también
          if (status === 'OK') {
            this.directionsRenderer.setDirections(result);
            this.rutaActiva = true;
          } else alert('Error ruta: ' + status);
        });
      });
    }, () => alert("Acceso GPS denegado"));
  }

  limpiarRuta(): void {
    this.directionsRenderer.set('directions', null);
    this.rutaActiva = false;
    this.map.setZoom(12);
    this.map.setCenter({ lat: 4.6097, lng: -74.0817 });
  }

  filtrar(cat: string): void {
    this.filtroActual = cat;
    this.sitiosFiltrados = cat === 'Todos' ? this.sitios : this.sitios.filter(s => s.categoria === cat);
    this.cargarMarcadores();
  }

  irASitio(sitio: any): void {
    this.map.setCenter({ lat: sitio.lat, lng: sitio.lng });
    this.map.setZoom(16);
    this.abrirModalDetalles(sitio); 
  }
}