import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { httpInterceptor } from './app/interceptors/http.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideRouter(routes),
    provideAnimationsAsync()
  ]
}).catch(err => console.error(err));
