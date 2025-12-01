import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Header } from './header/header';
import { Subscription } from 'rxjs';
import { Footer } from './footer/footer';
import { BlogBogota } from './blog-bogota/blog-bogota'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, BlogBogota],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('ProyectoUTurismo');
  showHeader = true;
  private sub: Subscription | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // decide cuándo mostrar el header: ocultarlo en login (y rutas que quieras)
    this.showHeader = this.router.url !== '/login';
    this.sub = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        const url = ev.urlAfterRedirects || ev.url;
        // ajustar las rutas que deben ocultar el header
        this.showHeader = !(url === '/login' || url === '/');
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
