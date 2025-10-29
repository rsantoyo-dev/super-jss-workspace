import { Routes } from '@angular/router';
import { TypographyComponent } from './components/typography.component';
import { DemoButtonsComponent } from './components/demo-buttons.component';
import { DemoCardsComponent } from './components/demo-cards.component';
import { PaletteComponent } from './components/palette.component';
import { DemoPaperComponent } from './components/demo-paper.component';
import { ThemingComponent } from './components/theming.component';
import { PerfBenchmarkComponent } from './components/perf-benchmark.component';
import { HeroComponent } from './components/hero.component';
import { DemoInputsComponent } from './components/demo-inputs.component';
import { DemoElementOptionsComponent } from './components/demo-element-options.component';
import { DemoPaddingComponent } from './components/demo-padding.component';

export const routes: Routes = [
  { path: 'hero', component: HeroComponent },
  { path: 'cards', component: DemoCardsComponent },
  { path: 'paper', component: DemoPaperComponent },
  { path: 'theming', component: ThemingComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'buttons', component: DemoButtonsComponent },
  { path: 'inputs', component: DemoInputsComponent },
  { path: 'palette', component: PaletteComponent },
  { path: 'element-options', component: DemoElementOptionsComponent },
  { path: 'padding', component: DemoPaddingComponent },
  { path: 'perf', component: PerfBenchmarkComponent },
  { path: 'home', component: DemoPaperComponent },
  { path: '', redirectTo: 'paper', pathMatch: 'full' },
];
