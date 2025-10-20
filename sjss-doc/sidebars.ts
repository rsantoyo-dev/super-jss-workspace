import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'index',
    {
      type: 'category',
      label: 'Components',
      items: [
        'components/sj-button',
        'components/sj-card',
        'components/sj-directive-basics',
        'components/sj-directive-shortcuts',
        'components/sj-flex',
        'components/sj-icon',
        'components/sj-input',
        'components/sj-paper',
        'components/sj-root-api',
        'components/sj-root-api-tokens',
        'components/sj-typography',
      ],
    },
  ],
};

export default sidebars;
