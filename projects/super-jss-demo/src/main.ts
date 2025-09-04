import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { SjCssGeneratorService } from 'super-jss';

bootstrapApplication(AppComponent, {
  providers: [SjCssGeneratorService],
}).catch((e) => console.error(e));


