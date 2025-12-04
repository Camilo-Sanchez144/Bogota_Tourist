import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { BlogBogota } from './blog-bogota/blog-bogota';
import { Explorarmapa } from './explorarmapa/explorarmapa';
import { DashboardUser } from './dashboard-user/dashboard-user';
import { PlanearViaje } from './planear-viaje/planear-viaje';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'home', component: Home },
  { path: 'dashboard-user', component: DashboardUser},
  { path: 'blog-bogota', component: BlogBogota},
  { path: 'explorarmapa', component: Explorarmapa },
  { path: 'planearViaje', component: PlanearViaje },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
