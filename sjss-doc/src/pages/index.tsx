import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

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
          Super JSS (SJSS) is atomic CSS‑in‑JS for Angular: write styles as
          plain JavaScript objects with the <code>[sj]</code> directive, use
          theme tokens for colors/spacing/typography, and ship tiny runtime‑generated
          CSS with responsive breakpoints built in.
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
        <p>Live StackBlitz demo (Palette)</p>
        <div className={styles.embedWrap}>
          <iframe
            src="https://stackblitz.com/edit/sjss-palette?embed=1&file=src%2Fmain.ts&hideExplorer=1&hideNavigation=1&view=preview"
            title="SJSS • Palette"
            style={{
              width: "100%",
              height: 520,
              border: 0,
              borderRadius: 8,
              overflow: "hidden",
            }}
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; clipboard-write"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          />
        </div>
        <p>
          If the embed doesn’t load locally, open it directly:{" "}
          <a
            href="https://stackblitz.com/edit/sjss-palette?file=src%2Fmain.ts"
            target="_blank"
            rel="noreferrer noopener"
          >
            Open on StackBlitz
          </a>
          .
        </p>

        
      </div>
    </section>
  );
}

function DemoInvite() {
  return (
    <section className={styles.playground}>
      <div className="container">
        <Heading as="h2">Live Angular Demo</Heading>
        <p>
          Try the full demo app with a live theme editor at
          {" "}
          <a href="https://sjssdemo.netlify.app/" target="_blank" rel="noreferrer noopener">
            sjssdemo.netlify.app
          </a>
          . Edit palette, spacing, and typography in real time.
        </p>
        <a href="https://sjssdemo.netlify.app/" target="_blank" rel="noreferrer noopener">
          <img
            src="/img/Screenshot%202025-11-01%20at%204.40.29%E2%80%AFPM.png"
            alt="SJSS demo app showing the live theme editor"
            style={{ width: "100%", maxWidth: 600, margin: "0 auto", display: "block", borderRadius: 8, border: 0, boxShadow: "0 2px 16px rgba(0,0,0,0.15)" }}
          />
        </a>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Atomic CSS‑in‑JS for Angular 20"
    >
      <Hero />
      <main>
        <DemoInvite />
        <Install />
        <LivePlayground />
      </main>
    </Layout>
  );
}
