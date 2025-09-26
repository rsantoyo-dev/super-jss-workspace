import { Routes } from '@angular/router';
import { TypographyComponent } from './components/typography.component';
import { DemoButtonsComponent } from './components/demo-buttons.component';
import { DemoCardsComponent } from './components/demo-cards.component';
import { PaletteComponent } from './components/palette.component';
import { JsonStudioComponent } from './sj-json-studio/json-studio.component';

export const routes: Routes = [
    { path: 'theming', component: JsonStudioComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'buttons', component: DemoButtonsComponent },
    { path: 'cards', component: DemoCardsComponent },
    { path: 'palette', component: PaletteComponent },
    { path: 'home', component: DemoCardsComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];
