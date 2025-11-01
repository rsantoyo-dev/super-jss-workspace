import { Component } from '@angular/core';
import { SJ_BASE_COMPONENTS_IMPORTS, sj, SjRootApi } from 'super-jss';
import { RouterModule } from '@angular/router';
import { SectionContainerComponent } from './section-container.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    SJ_BASE_COMPONENTS_IMPORTS,
    SectionContainerComponent,
    RouterModule,
  ],
  template: `
    <app-section title="Welcome to Super JSS Demo">
      <sj-flex useCol useGap="default">
        <sj-paper
          variant="flat"
          usePaint="secondary"
          usePadding="default"
          useRounded="compact"
        >
          <sj-flex useCol useGap>
            <sj-typography variant="p">
              Super JSS is a modern CSS-in-JS library for Angular that enables
              styling with JavaScript objects. generate atomic CSS classes at
              runtime based on your theme.
            </sj-typography>
            <sj-typography variant="p">
              Install the library and start styling with JavaScript objects.
            </sj-typography>
            <sj-paper
              variant="outlined"
              usePaint="primary"
              usePadding
              useRounded="compact"
            >
              <sj-typography variant="pre">npm i super-jss</sj-typography>
            </sj-paper>
          </sj-flex>
        </sj-paper>

        <!-- Nutshell -->
        <sj-paper variant="flat" useRounded="compact">
          <sj-flex useCol useGap="compact" useGap>
            <sj-typography variant="h6">SJSS in a nutshell</sj-typography>
            <sj-flex useCol useGap="compact">
              <sj-typography variant="p"
                >• Author styles as plain JS objects with the [sj]
                directive.</sj-typography
              >
              <sj-typography variant="p"
                >• Theme tokens (e.g., primary.main) and responsive objects
                (xs…xxl).</sj-typography
              >
              <sj-typography variant="p"
                >• Tiny, atomic CSS classes generated at runtime.</sj-typography
              >
            </sj-flex>
          </sj-flex>
        </sj-paper>

        <!-- Color tiles -->
        <sj-paper variant="flat" usePadding="default" useRounded="compact">
          <sj-typography variant="strong">Palette preview</sj-typography>
          <sj-flex useWrap useGap="compact">
            <a routerLink="/palette">
              <sj-paper
                variant="filled"
                usePaint="primary"
                useRounded="compact"
                usePadding="compact"
              >
                <sj-typography variant="small">primary.main</sj-typography>
              </sj-paper>
            </a>
            <a routerLink="/palette">
              <sj-paper
                variant="filled"
                usePaint="secondary"
                useRounded="compact"
                usePadding="compact"
              >
                <sj-typography variant="small">secondary.main</sj-typography>
              </sj-paper>
            </a>
            <a routerLink="/palette">
              <sj-paper
                variant="filled"
                usePaint="success"
                useRounded="compact"
                usePadding="compact"
              >
                <sj-typography variant="small">success.main</sj-typography>
              </sj-paper>
            </a>
            <a routerLink="/palette">
              <sj-paper
                variant="filled"
                usePaint="info"
                useRounded="compact"
                usePadding="compact"
              >
                <sj-typography variant="small">info.main</sj-typography>
              </sj-paper>
            </a>
            <a routerLink="/palette">
              <sj-paper
                variant="filled"
                usePaint="warning"
                useRounded="compact"
                usePadding="compact"
              >
                <sj-typography variant="small">warning.main</sj-typography>
              </sj-paper>
            </a>
            <a routerLink="/palette">
              <sj-paper
                variant="filled"
                usePaint="error"
                useRounded="compact"
                usePadding="compact"
              >
                <sj-typography variant="small">error.main</sj-typography>
              </sj-paper>
            </a>
            <a routerLink="/palette">
              <sj-paper
                variant="filled"
                usePaint="neutral"
                useRounded="compact"
                usePadding="compact"
              >
                <sj-typography variant="small">neutral.main</sj-typography>
              </sj-paper>
            </a>
            <a routerLink="/palette">
              <sj-paper
                variant="filled"
                usePaint="dark"
                useRounded="compact"
                usePadding="compact"
              >
                <sj-typography variant="small">dark.main</sj-typography>
              </sj-paper>
            </a>
            <a routerLink="/palette">
              <sj-paper
                variant="filled"
                usePaint="light"
                useRounded="compact"
                usePadding="compact"
              >
                <sj-typography variant="small">light.main</sj-typography>
              </sj-paper>
            </a>
          </sj-flex>
        </sj-paper>

        <!-- Explore: quick links to all sidenav items -->
        <sj-paper variant="flat" usePadding="default" useRounded="compact">
          <sj-typography variant="strong">Explore</sj-typography>
          <sj-flex useWrap useGap="compact">
            <sj-button
              [useDensity]="1"
              useRounded="compact"
              [variant]="'contained'"
              [routerLink]="'/home'"
              >Home</sj-button
            >
            <sj-button
              [useDensity]="1"
              useRounded="compact"
              [variant]="'contained'"
              [routerLink]="'/palette'"
              >Palette</sj-button
            >
            <sj-button
              [useDensity]="1"
              useRounded="compact"
              [variant]="'contained'"
              [routerLink]="'/typography'"
              >Typography</sj-button
            >
            <sj-button
              [useDensity]="1"
              useRounded="compact"
              [variant]="'contained'"
              [routerLink]="'/spacing'"
              >Spacing</sj-button
            >
            <sj-button
              [useDensity]="1"
              useRounded="compact"
              [variant]="'contained'"
              [routerLink]="'/padding'"
              >Padding</sj-button
            >
            <sj-button
              [useDensity]="1"
              useRounded="compact"
              [variant]="'contained'"
              [routerLink]="'/theming'"
              >Theming</sj-button
            >
            <sj-button
              [useDensity]="1"
              useRounded="compact"
              [variant]="'contained'"
              [routerLink]="'/paper'"
              >Paper</sj-button
            >
            <sj-button
              [useDensity]="1"
              useRounded="compact"
              [variant]="'contained'"
              [routerLink]="'/buttons'"
              >Buttons</sj-button
            >
            <sj-button
              [useDensity]="1"
              useRounded="compact"
              [variant]="'contained'"
              [routerLink]="'/inputs'"
              >Inputs</sj-button
            >
            <sj-button
              [useDensity]="1"
              useRounded="compact"
              [variant]="'contained'"
              [routerLink]="'/cards'"
              >Cards</sj-button
            >
          </sj-flex>
        </sj-paper>

        <!-- Links -->
        <sj-paper variant="flat" usePadding="default" useRounded="compact">
          <sj-typography variant="strong">Links</sj-typography>
          <sj-flex useWrap useGap="compact">
            <a href="https://sjss.dev/" target="_blank" rel="noreferrer"
              >sjss.dev</a
            >
            <a
              href="https://www.npmjs.com/package/super-jss"
              target="_blank"
              rel="noreferrer"
              >npm: super-jss</a
            >
            <a
              href="https://github.com/rsantoyo-dev/super-jss-workspace"
              target="_blank"
              rel="noreferrer"
              >GitHub</a
            >
          </sj-flex>
        </sj-paper>
      </sj-flex>
    </app-section>
  `,
})
export class HomeComponent {
  readonly sj: SjRootApi = sj;
}
