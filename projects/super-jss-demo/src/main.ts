import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { SjCssGeneratorService } from 'super-jss';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [SjCssGeneratorService, provideRouter(routes)],
}).catch((e) => console.error(e));


