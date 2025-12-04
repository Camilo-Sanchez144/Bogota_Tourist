import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // habilita el comportamiento de scroll hacia fragments (#id)
    // el offset se aplica con CSS (`scroll-margin-top`) para evitar incompatibilidades de tipo
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled' }))
  ]
};
