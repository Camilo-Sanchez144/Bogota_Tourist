import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { BlogBogota } from './blog-bogota/blog-bogota';
import { Explorarmapa } from './explorarmapa/explorarmapa';
import { DashboardUser } from './dashboard-user/dashboard-user';
import { PlanearViaje } from './planear-viaje/planear-viaje';
import { checkloginGuard } from './guards/checklogin-guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [loginGuard] },
  { path: 'home', component: Home, canActivate: [checkloginGuard] },
  { path: 'dashboard-user', component: DashboardUser, canActivate: [checkloginGuard] },
  { path: 'blog-bogota', component: BlogBogota, canActivate: [checkloginGuard] },
  { path: 'explorarmapa', component: Explorarmapa, canActivate: [checkloginGuard] },
  { path: 'planearViaje', component: PlanearViaje, canActivate: [checkloginGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
