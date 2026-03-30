/// <reference types="google.maps" />
import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit, NgZone, inject, OnInit } from '@angular/core';
import { LocationsService } from '../services/locations.service';
import { Place } from '../interfaces/Place';

@Component({
  selector: 'app-explorarmapa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './explorarmapa.html',
  styleUrl: './explorarmapa.css'
})
export class Explorarmapa implements AfterViewInit, OnInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  map!: google.maps.Map;
  infoWindow!: google.maps.InfoWindow;
  placesService!: google.maps.places.PlacesService;
  directionsService!: google.maps.DirectionsService;
  directionsRenderer!: google.maps.DirectionsRenderer;

  filtroActual: string = 'Todos';
  rutaActiva: boolean = false;
  
  modalVisible: boolean = false;
  selectedPlaceDetails: any = null;
  isLoadingDetails: boolean = false;
  localReviews: any[] = [];

  private locationsService = inject(LocationsService);
  sitios: Place[] = [];

  sitiosFiltrados: Place[] = [];
  marcadores: google.maps.Marker[] = [];

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.loadPlaces();
  }

  loadPlaces() {
    this.locationsService.getPlaces().subscribe({
      next: (places) => {
        this.sitios = places;
        this.sitiosFiltrados = [...this.sitios];
        if (this.map) {
          this.cargarMarcadores();
        }
      },
      error: (err) => console.error('Error loading places', err)
    });
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

    if (this.sitios.length > 0) {
      this.cargarMarcadores();
    }
  }

  cargarMarcadores(): void {
    this.marcadores.forEach(m => m.setMap(null));
    this.marcadores = [];

    this.sitiosFiltrados.forEach((sitio) => {
      const marker = new google.maps.Marker({
        position: { lat: Number(sitio.latitude), lng: Number(sitio.longitude) },
        map: this.map,
        title: sitio.name,
        animation: google.maps.Animation.DROP
      });

      marker.addListener('click', () => {
        this.ngZone.run(() => {
          this.abrirModalDetalles(sitio);
        });
      });

      this.marcadores.push(marker);
    });
  }

  abrirModalDetalles(sitio: Place): void {
    this.modalVisible = true;
    this.isLoadingDetails = true;
    this.selectedPlaceDetails = { ...sitio };
    this.localReviews = [];

    // Fetch local reviews
    if (sitio.id) {
      this.locationsService.getPlaceReviews(sitio.id).subscribe({
        next: (reviews) => {
          this.localReviews = reviews;
        },
        error: (err) => console.error('Error loading local reviews', err)
      });
    }

    // Try to fetch more details from Google if needed, using name
    const request = { query: sitio.name + " Bogotá", fields: ['place_id'] };
    this.placesService.findPlaceFromQuery(request, (results: any, status: any) => {
       if (status === google.maps.places.PlacesServiceStatus.OK && results && results[0]) {
          const placeId = results[0].place_id;
          this.fetchGoogleDetails(placeId);
       } else {
         this.isLoadingDetails = false;
       }
    });
  }

  fetchGoogleDetails(placeId: string) {
      const request = {
        placeId: placeId,
        fields: ['name', 'rating', 'formatted_phone_number', 'website', 'opening_hours', 'photos', 'reviews', 'url']
      };

      this.placesService.getDetails(request, (place, status) => {
        this.ngZone.run(() => {
          this.isLoadingDetails = false;
          
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
  }

  cerrarModal(): void {
    this.modalVisible = false;
    this.selectedPlaceDetails = null;
  }

  calcularRutaDesdeModal(): void {
    const destinoGuardado = this.selectedPlaceDetails;
    this.cerrarModal();
    
    if (destinoGuardado) {
      this.calcularRuta(destinoGuardado);
    }
  }

  calcularRuta(destino: any): void {
    if (!navigator.geolocation) {
      return;
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      const request: any = {
        origin: { lat: pos.coords.latitude, lng: pos.coords.longitude },
        destination: { lat: Number(destino.latitude), lng: Number(destino.longitude) },
        travelMode: google.maps.TravelMode.DRIVING
      };
      this.directionsService.route(request, (result: any, status: any) => {
        this.ngZone.run(() => {
          if (status === 'OK') {
            this.directionsRenderer.setDirections(result);
            this.rutaActiva = true;
          }
        });
      });
    });
  }

  limpiarRuta(): void {
    this.directionsRenderer.set('directions', null);
    this.rutaActiva = false;
    this.map.setZoom(12);
    this.map.setCenter({ lat: 4.6097, lng: -74.0817 });
  }

  filtrar(cat: string): void {
    this.filtroActual = cat;
    this.sitiosFiltrados = cat === 'Todos' ? this.sitios : this.sitios.filter(s => s.category === cat);
    this.cargarMarcadores();
  }

  irASitio(sitio: any): void {
    this.map.setCenter({ lat: Number(sitio.latitude), lng: Number(sitio.longitude) });
    this.map.setZoom(16);
    this.abrirModalDetalles(sitio);
  }
}