import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { BlogBogota } from './blog-bogota/blog-bogota';
import { Articulo1 } from './home/articulo1/articulo1';
import { Articulo2 } from './home/articulo2/articulo2';
import { Articulo3 } from './home/articulo3/articulo3';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'home', component: Home },
  { path: 'blog-bogota', component: BlogBogota},
  { path: 'articulo/1', component: Articulo1},
  { path: 'articulo/2', component: Articulo2},
  { path: 'articulo/3', component: Articulo3},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
