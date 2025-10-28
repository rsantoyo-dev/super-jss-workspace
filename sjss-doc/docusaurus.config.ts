import {themes as prismThemes} from 'prism-react-renderer';
import path from 'path';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const GTAG_ID = process.env.GTAG_ID;

const config: Config = {
  title: 'Super-JSS',
  tagline: 'A super-powered CSS-in-JS library for Angular',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  // Public canonical site URL
  url: 'https://sjss.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'super-jss', // Usually your GitHub org/user name.
  projectName: 'super-jss', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Super-JSS',
      logo: {
        alt: 'Super-JSS Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://www.npmjs.com/package/super-jss',
          label: 'npm',
          position: 'right',
        },
        {
          href: 'https://github.com/rsantoyo-dev/super-jss-workspace',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Links',
          items: [
            { label: 'Docs', to: '/docs' },
            { label: 'npm', href: 'https://www.npmjs.com/package/super-jss' },
            { label: 'GitHub', href: 'https://github.com/rsantoyo-dev/super-jss-workspace' },
          ],
        },
        {
          title: 'Playgrounds',
          items: [
            { label: 'sjRootApi (StackBlitz)', href: 'https://stackblitz.com/edit/stackblitz-starters-lgwyvmd2?file=src%2Fmain.ts' },
            { label: 'Workspace (StackBlitz)', href: 'https://stackblitz.com/~/github.com/rsantoyo-dev/super-jss-workspace?file=projects/super-jss-demo/src/app/app.component.ts' },
            { label: 'Storybook', href: 'https://sjss-storybook.netlify.app/?path=/docs/sj-sj-basic--docs' },
            { label: 'Demo', href: 'https://sjssdemo.netlify.app' },
          ],
        },
        {
          title: 'Articles',
          items: [
            { label: 'Journey to CSS‑in‑JS for Angular', href: 'https://www.designsystemscollective.com/my-journey-to-css-in-js-for-angular-building-super-jss-sjss-e1e5e8817a15' },
            { label: 'From Flash to Angular Signals', href: 'https://www.designsystemscollective.com/from-flash-to-angular-signals-my-accidental-journey-to-design-systems-b5e6e39dd12b' },
          ],
        },
      ],
      copyright: 'Contact: <a href="mailto:ricardo.santoyo@hotmail.com">ricardo.santoyo@hotmail.com</a>',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  plugins: (
    [
      // Google Analytics 4 via gtag (enabled if GTAG_ID is set)
      GTAG_ID
        ? [
            '@docusaurus/plugin-google-gtag',
            {
              trackingID: GTAG_ID,
              anonymizeIP: true,
            },
          ]
        : null,
      // Prevent bundling Angular/our Angular lib in the React docs app
      () => ({
        name: 'docusaurus-plugin-super-jss-alias',
        configureWebpack() {
          return {
            resolve: {
              alias: {
                'super-jss': path.resolve(__dirname, 'src/stubs/empty.js'),
                '@storybook/angular': path.resolve(__dirname, 'src/stubs/empty.js'),
              },
            },
          };
        },
      }),
    ].filter(Boolean) as any
  ),
};

export default config;
