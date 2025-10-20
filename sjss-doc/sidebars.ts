import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'index',
    {
      type: 'category',
      label: 'Getting Started',
      items: ['getting-started/installation', 'getting-started/quick-start'],
    },
    {
      type: 'category',
      label: 'Core',
      items: [
        'core/directive',
        'core/directive-basics',
        'core/directive-shortcuts',
        'core/sj-api',
        'core/sj-api-tokens',
        'core/theming',
        'core/services',
      ],
    },
    {
      type: 'category',
      label: 'Components',
      items: [
        'components/sj-typography',
        'components/sj-button',
        'components/sj-card',
        'components/sj-input',
        'components/sj-flex',
        'components/sj-paper',
        'components/sj-icon',
      ],
    },
  ],
};

export default sidebars;
