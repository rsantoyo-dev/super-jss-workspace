import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SJ_BASE_COMPONENTS_IMPORTS,
  SjRootApi,
  sj,
  SjInputComponent,
  SjIconComponent,
  icon,
} from 'super-jss';
import { SectionContainerComponent } from './section-container.component';
import { DemoItemComponent } from './demo-item.component';

interface DemoInput {
  title: string;
  message: string;
  titleColor: string;
  variant: 'outlined' | 'filled' | 'flat';
  usePaint?: string | 'none' | 'auto';
  usePadding?: any;
  useRounded?: any;
  placeholder?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  withPrefixSuffix?: boolean;
  usageExample: string;
}

@Component({
  selector: 'app-demo-inputs',
  standalone: true,
  imports: [
    CommonModule,
    SectionContainerComponent,
    SJ_BASE_COMPONENTS_IMPORTS,
    DemoItemComponent,
    SjInputComponent,
    SjIconComponent,
  ],
  template: `
    <app-section title="Inputs">
      <sj-typography variant="span">
        Minimal, theme-aware inputs that follow Paper/Button variants. Use
        density tokens for spacing and paint for palettes.
      </sj-typography>

      <sj-flex useCol useGap="default" usePadding="default">
        @for (item of inputData; track item.title) {
        <app-demo-item
          [title]="item.title"
          [titleColor]="item.titleColor"
          [code]="item.usageExample"
        >
          <div [sj]="[sj.w('360px')]">
            <sj-input
              [variant]="item.variant"
              [usePaint]="$any(item.usePaint)"
              [usePadding]="$any(item.usePadding)"
              [useRounded]="$any(item.useRounded)"
              [fullWidth]="$any(item.fullWidth)"
              [disabled]="$any(item.disabled)"
              [invalid]="$any(item.invalid)"
              [placeholder]="$any(item.placeholder)"
            >
              <ng-container *ngIf="item.withPrefixSuffix">
                <sj-icon prefix [name]="icon.superJson" size="1rem"></sj-icon>
                <span suffix [sj]="[sj.c('neutral.dark')]">{{ '@' }}</span>
              </ng-container>
            </sj-input>
          </div>
          <sj-typography variant="small" [sj]="[sj.c('neutral.dark')]">{{
            item.message
          }}</sj-typography>
        </app-demo-item>
        }
      </sj-flex>
    </app-section>
  `,
})
export class DemoInputsComponent {
  readonly sj: SjRootApi = sj;
  readonly icon = icon;

  protected readonly inputData: DemoInput[] = [
    {
      title: '<sj-input outlined>',
      titleColor: 'primary',
      variant: 'outlined',
      usePadding: 'default',
      useRounded: 'default',
      placeholder: 'Outlined…',
      message: 'Outlined with default density spacing.',
      usageExample: `<sj-input variant="outlined" usePadding="default" useRounded="default" placeholder="Outlined…" />`,
    },
    {
      title: '<sj-input filled primary>',
      titleColor: 'primary.contrast',
      variant: 'filled',
      usePaint: 'primary',
      usePadding: 'default',
      useRounded: 'default',
      placeholder: 'Filled primary…',
      message: 'Filled surface using primary paint and contrast text.',
      usageExample: `<sj-input variant="filled" usePaint="primary" usePadding="default" useRounded="default" placeholder="Filled primary…" />`,
    },
    {
      title: '<sj-input flat>',
      titleColor: 'primary',
      variant: 'flat',
      placeholder: 'Flat…',
      message: 'Flat has no border/background by default.',
      usageExample: `<sj-input variant="flat" placeholder="Flat…" />`,
    },
    {
      title: 'Invalid (outlined)',
      titleColor: 'error.dark',
      variant: 'outlined',
      usePadding: 'default',
      useRounded: 'default',
      invalid: true,
      placeholder: 'Invalid…',
      message: 'Shows error outline/border.',
      usageExample: `<sj-input variant="outlined" usePadding="default" useRounded="default" [invalid]="true" placeholder="Invalid…" />`,
    },
    {
      title: 'Disabled (filled)',
      titleColor: 'neutral.dark',
      variant: 'filled',
      usePaint: 'neutral',
      usePadding: 'default',
      useRounded: 'default',
      disabled: true,
      placeholder: 'Disabled…',
      message: 'Dimmed + non-interactive.',
      usageExample: `<sj-input variant="filled" usePaint="neutral" usePadding="default" useRounded="default" [disabled]="true" placeholder="Disabled…" />`,
    },
    {
      title: 'Full width + slots',
      titleColor: 'primary',
      variant: 'outlined',
      usePadding: 'default',
      useRounded: 'default',
      fullWidth: true,
      withPrefixSuffix: true,
      placeholder: 'Search…',
      message: 'Prefix/suffix content via attribute selectors.',
      usageExample: `<sj-input fullWidth variant="outlined" usePadding="default" useRounded="default" placeholder="Search…">
  <sj-icon prefix name="superJson" size="1rem"></sj-icon>
  <span suffix>@</span>
</sj-input>`,
    },
  ];
}
