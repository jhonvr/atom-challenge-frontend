import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { API_BASE_URL } from './api-base.token';
import { apiBaseInterceptor } from '@shared/services/api-base.interceptor';

declare global {
  interface Window { __APP_CONFIG__?: { apiBaseUrl: string }; }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([apiBaseInterceptor])
    ),
    { provide: API_BASE_URL, useFactory: () => window.__APP_CONFIG__?.apiBaseUrl ?? '/api' },
    provideAnimationsAsync()
  ]
};
