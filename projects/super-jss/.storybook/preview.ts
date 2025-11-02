import type { Preview } from '@storybook/angular'
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'SJ',
          [
            '[sj] Basic',
            'sjRootApi',
            'Typography',
            'Flex',
            'Paper',
            'Card',
            'Button',
            'Interactions',
          ],
        ],
      },
    },
  },
};

export default preview;
