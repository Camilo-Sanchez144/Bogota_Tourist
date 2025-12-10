import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { BlogBogota } from './blog-bogota/blog-bogota';
import { Explorarmapa } from './explorarmapa/explorarmapa';
import { DashboardUser } from './dashboard-user/dashboard-user';
import { PlanearViaje } from './planear-viaje/planear-viaje';
import { AboutUs } from './pages/about-us/about-us';
import { Contact } from './pages/contact/contact';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';
import { checkloginGuard } from './guards/checklogin-guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [loginGuard] },
  { path: 'home', component: Home, canActivate: [checkloginGuard] },
  { path: 'dashboard-user', component: DashboardUser, canActivate: [checkloginGuard] },
  { path: 'blog-bogota', component: BlogBogota, canActivate: [checkloginGuard] },
  { path: 'explorarmapa', component: Explorarmapa, canActivate: [checkloginGuard] },
  { path: 'planearViaje', component: PlanearViaje, canActivate: [checkloginGuard] },
  { path: 'about-us', component: AboutUs, canActivate: [checkloginGuard] },
  { path: 'contact', component: Contact, canActivate: [checkloginGuard] },
  { path: 'privacy-policy', component: PrivacyPolicy, canActivate: [checkloginGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
