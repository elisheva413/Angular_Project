import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import { provideRouter } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';



export const appConfig: ApplicationConfig = {
  providers: [
        providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
