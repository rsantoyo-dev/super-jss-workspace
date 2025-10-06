import { Routes } from '@angular/router';
import { TypographyComponent } from './components/typography.component';
import { DemoButtonsComponent } from './components/demo-buttons.component';
import { DemoCardsComponent } from './components/demo-cards.component';
import { PaletteComponent } from './components/palette.component';
import { DemoPaperComponent } from './components/demo-paper.component';
import { ThemingComponent } from './components/theming.component';
import { PerfBenchmarkComponent } from './components/perf-benchmark.component';
import { HeroComponent } from './components/hero.component';

export const routes: Routes = [
  { path: 'hero', component: HeroComponent },
  { path: 'cards', component: DemoCardsComponent },
  { path: 'paper', component: DemoPaperComponent },
  { path: 'theming', component: ThemingComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'buttons', component: DemoButtonsComponent },
  { path: 'palette', component: PaletteComponent },
  { path: 'perf', component: PerfBenchmarkComponent },
  { path: 'home', component: DemoCardsComponent },
  { path: '', redirectTo: 'cards', pathMatch: 'full' },
];
