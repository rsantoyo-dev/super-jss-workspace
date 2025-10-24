import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function Hero() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroMinimal}>
      <div className="container">
        <img src="/img/logo.svg" className={styles.logo} alt="SJSS logo" />
        <Heading as="h1" className={styles.title}>
          {siteConfig.title}
        </Heading>
        <p className={styles.tagline}>Atomic CSS‑in‑JS for Angular 20</p>
        <div className={styles.ctaRow}>
          <Link className="button button--primary" to="/docs">
            Get started
          </Link>
          <a
            className="button button--secondary"
            href="https://www.npmjs.com/package/super-jss"
            target="_blank"
            rel="noopener noreferrer"
          >
            npm
          </a>
          <a
            className="button button--secondary"
            href="https://github.com/rsantoyo-dev/super-jss-workspace"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}

function Install() {
  return (
    <section className={styles.install}>
      <div className="container">
        <Heading as="h2">Install</Heading>
        <pre>
          <code>npm i super-jss</code>
        </pre>
        <p className={styles.note}>
          Tip: for Angular template autocomplete, install the Angular Language
          Service extension in your IDE.
        </p>
      </div>
    </section>
  );
}

function LivePlayground() {
  return (
    <section className={styles.playground}>
      <div className="container">
        <Heading as="h2">Try it</Heading>
        <p>Live StackBlitz demo of the sj root API:</p>
        <div className={styles.embedWrap}>
          <iframe
            src="https://stackblitz.com/edit/stackblitz-starters-lgwyvmd2?embed=1&file=src/main.ts&hideExplorer=1&hideNavigation=1&view=preview"
            title="SJSS • sjRootApi"
            style={{ width: '100%', height: 520, border: 0, borderRadius: 8, overflow: 'hidden' }}
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; clipboard-write"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          />
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title}`} description="Atomic CSS‑in‑JS for Angular 20">
      <Hero />
      <main>
        <Install />
        <LivePlayground />
        <Resources />
      </main>
    </Layout>
  );
}

function Resources() {
  const items = [
    {
      title: 'My journey to CSS‑in‑JS for Angular',
      url:
        'https://www.designsystemscollective.com/my-journey-to-css-in-js-for-angular-building-super-jss-sjss-e1e5e8817a15',
    },
    {
      title: 'From Flash to Angular Signals: my accidental journey',
      url:
        'https://www.designsystemscollective.com/from-flash-to-angular-signals-my-accidental-journey-to-design-systems-b5e6e39dd12b',
    },
    {
      title: 'Workspace on StackBlitz (full repo)',
      url:
        'https://stackblitz.com/~/github.com/rsantoyo-dev/super-jss-workspace?file=projects/super-jss-demo/src/app/app.component.ts',
    },
    {
      title: 'sjRootApi on StackBlitz',
      url:
        'https://stackblitz.com/edit/stackblitz-starters-lgwyvmd2?file=src%2Fmain.ts',
    },
    {
      title: 'Storybook: SJ basics',
      url:
        'https://sjss-storybook.netlify.app/?path=/docs/sj-sj-basic--docs',
    },
    {
      title: 'Demo: Paper page',
      url: 'https://sjssdemo.netlify.app/paper',
    },
  ];

  return (
    <section className={styles.resources}>
      <div className="container">
        <Heading as="h2">Resources</Heading>
        <ul className={styles.resourceList}>
          {items.map((it) => (
            <li key={it.url}>
              <a href={it.url} target="_blank" rel="noopener noreferrer">
                {it.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
