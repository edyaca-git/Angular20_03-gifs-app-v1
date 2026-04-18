import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),

    // Proveemos el HttpClient para poder hacer 
    // peticiones HTTP a la API de Giphy desde el 
    // servicio GifService, y usamos withFetch() 
    // para usar la API Fetch en lugar de 
    // XMLHttpRequest, lo que es más moderno y 
    // eficiente.
    provideHttpClient(withFetch()),
  ],
};
