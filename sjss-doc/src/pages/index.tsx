import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

function LinksSection() {
  const links = [
    { title: 'Documentation', url: 'https://sjss.dev' },
    { title: 'Demo & Workspace', url: 'https://stackblitz.com/~/github.com/rsantoyo-dev/super-jss-workspace?file=projects/super-jss-demo/src/app/app.component.ts', description: 'Source Code on StackBlitz' },
    { title: 'GitHub', url: 'https://github.com/rsantoyo-dev/super-jss-workspace', description: 'Source Code on GitHub' },
    { title: 'Storybook', url: 'https://sjss-storybook.netlify.app/' },
    { title: 'NPM', url: 'https://www.npmjs.com/package/super-jss' },
    { title: 'License', url: 'https://opensource.org/licenses' },
  ];

  return (
    <div className={styles.linksSection}>
      <div className="container">
        <div className="row">
          {links.map((link, idx) => (
            <div className="col col--4" key={idx}>
              <div className="card-demo">
                <div className="card">
                  <div className="card__header">
                    <h3>{link.title}</h3>
                  </div>
                  <div className="card__body">
                    <p>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">{link.description || link.url}</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WhySuperJSS() {
  return (
    <div className={styles.whySection}>
      <div className="container">
        <Heading as="h2">Why Super-JSS?</Heading>
        <p>
        Traditional CSS-in-JS libraries ship massive bundles with every possible utility class. SJSS generates <strong>only the atomic CSS you use</strong>, keeping your bundle tiny while providing full theming and responsiveness.
        </p>
      </div>
    </div>
  );
}

function ExampleSection() {
  const codeExample = `
import { Component, effect, inject } from '@angular/core';
import { SJ_BASE_COMPONENTS_IMPORTS, SjThemeService, sj } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-hero',
  imports: [SJ_BASE_COMPONENTS_IMPORTS],
  template: \
    <sj-host
      [sj]="[
        sj.display(sj.display.options.flex),
        sj.flexDirection({
          xs: sj.flexDirection.options.column,
          md: sj.flexDirection.options.row
        }),
        sj.justifyContent(sj.justifyContent.options.center),
        sj.alignItems(sj.alignItems.options.center),
        sj.gap({ xs: 0.5, md: 1 }),
        sj.p(2),
        sj.bg(sj.bg.options.light.light)
      ]"
    >
      <sj-paper usePaint="primary" usePadding="default" useRounded="default">
        <h1 [sj]="[sj.m(0)]">Hello SJSS</h1>
      </sj-paper>

      <sj-button
        [sj]="[
          sj.p(2),
          sj.bg('primary.main'),
          sj.c('white'),
          sj.hover([ sj.backgroundColor(sj.bg.options.primary.dark) ])
        ]"
        (click)="updatePrimaryColor()"
      >
        Update Primary
      </sj-button>
    </sj-host>
  \
,
})
export class HeroComponent {
  readonly theme = inject(SjThemeService);
  readonly sj = sj;

  private _bpLogger = effect(() => {
    console.log('current breakpoint:', this.theme.breakpoint());
  });

  updatePrimaryColor() {
    this.theme.setTheme({
      palette: {
        primary: { ...this.theme.sjTheme().palette.primary, main: '#4e3149ff' },
      } as any,
    });
  }
}
  `;
  return (
    <div className={styles.exampleSection}>
      <div className="container">
        <Heading as="h2">Basic Example</Heading>
        <p>This minimal Hero shows inline <code>[sj]</code> styles, a one-line theme update, and a reactive breakpoint log.</p>
        <pre>
          <code>
            {codeExample}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="A super-powered CSS-in-JS library for Angular">
      <HomepageHeader />
      <main>
        <LinksSection />
        <WhySuperJSS />
        <ExampleSection />
      </main>
    </Layout>
  );
}