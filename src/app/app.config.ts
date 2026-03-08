import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { providePrimeNG } from 'primeng/config'; 
import { provideRouter } from '@angular/router'; 
import Aura from '@primeuix/themes/aura'; 
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), 
    providePrimeNG({
      theme: {
        preset: Aura, 
        options: {
            darkModeSelector: false 
        }
      }
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};





