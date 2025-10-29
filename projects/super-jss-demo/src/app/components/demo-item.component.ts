import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SJ_BASE_COMPONENTS_IMPORTS, SjRootApi, sj } from 'super-jss';
import { CodeBlockComponent } from './code-block.component';

@Component({
  standalone: true,
  selector: 'app-demo-item',
  imports: [CommonModule, RouterModule, ...SJ_BASE_COMPONENTS_IMPORTS, CodeBlockComponent],
  template: `
    <sj-card
      host
      usePadding="default"
      useRounded="default"
      variant="flat"
      [sj]="[]"
    >
      <sj-flex useCol useGap>
        <div [sj]="[ sj.mb(0.5), sj.pb(0.25), sj.borderBottomStyle('solid'), sj.borderBottomWidth(0.05), sj.borderBottomColor('light.dark') ]">
          <sj-flex [sj]="[ sj.justifyContent('space-between'), sj.fxAItems('baseline'), sj.gap(0.5) ]">
            <div>
              <sj-typography variant="h6" [sj]="[ sj.c(titleColor || 'primary'), sj.mt(0) ]">{{ title }}</sj-typography>
              <sj-typography *ngIf="subtitle" variant="small" [sj]="[ sj.c('neutral.dark'), sj.mt(0) ]">{{ subtitle }}</sj-typography>
            </div>
            <div *ngIf="href || route" [sj]="[ sj.d('inline-flex'), sj.gap(0.5) ]">
              <a *ngIf="href" [href]="href" target="_blank" rel="noreferrer"
                 [sj]="[ sj.c('neutral.dark'), sj.textDecoration('none'), { '&:hover': { textDecoration: 'underline' } } ]">{{ actionLabel }}</a>
              <a *ngIf="route" [routerLink]="route"
                 [sj]="[ sj.c('neutral.dark'), sj.textDecoration('none'), { '&:hover': { textDecoration: 'underline' } } ]">{{ actionLabel }}</a>
            </div>
          </sj-flex>
        </div>

        <div [sj]="[]">
          <ng-content></ng-content>
        </div>

        <div *ngIf="code && code.length" [sj]="[sj.d('flex'), sj.justifyContent('flex-end')]">
          <sj-button variant="flat" (click)="toggle()" [sj]="[sj.c('neutral.dark')]">
            {{ expanded() ? 'Hide code' : 'Show code' }}
          </sj-button>
        </div>

        <app-code-block *ngIf="expanded() && code" [code]="code!"></app-code-block>
      </sj-flex>
    </sj-card>
  `,
})
export class DemoItemComponent {
  readonly sj: SjRootApi = sj;
  @Input() title = '';
  @Input() subtitle: string | undefined;
  @Input() titleColor: string | undefined;
  @Input() code: string | undefined;
  // Optional quick action link (external or router). If both provided, both render.
  @Input() href: string | undefined;
  @Input() route: string | undefined;
  @Input() actionLabel = 'Open';

  expanded = signal(false);
  toggle() {
    this.expanded.update((v) => !v);
  }
}
