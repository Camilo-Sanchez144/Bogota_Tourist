import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  menuopen: boolean = false;

  abrirmenu(){
    this.menuopen = !this.menuopen;
  }
  cerrarsesion(){
    console.log("Cerrando sesión");
  }
}
