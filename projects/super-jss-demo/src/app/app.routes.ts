import { Routes } from '@angular/router';
import { TypographyComponent } from './components/typography.component';
import { DemoButtonsComponent } from './components/demo-buttons.component';
import { DemoCardsComponent } from './components/demo-cards.component';
import { PaletteComponent } from './components/palette.component';
import { ThemingComponent } from './components/theming.component';

export const routes: Routes = [
    { path: 'theming', component: ThemingComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'buttons', component: DemoButtonsComponent },
    { path: 'cards', component: DemoCardsComponent },
    { path: 'palette', component: PaletteComponent },
    { path: 'home', component: DemoCardsComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];
