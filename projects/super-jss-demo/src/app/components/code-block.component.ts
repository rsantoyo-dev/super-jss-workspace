import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sj, SJ_BASE_COMPONENTS_IMPORTS } from 'super-jss';
import { SjRootApi } from 'super-jss';

@Component({
  standalone: true,
  selector: 'app-code-block',
  imports: [CommonModule, ...SJ_BASE_COMPONENTS_IMPORTS],
  template: `
    <sj-card [variant]="'outlined'" [sj]="{ m: 0, p: 0 }">
      <pre
        [sj]="{
          m: 0,
          p: 1,
          bg: 'light.dark',
          maxH: '400px',
          overflowY: 'auto',
          overflowX: 'hidden',
          w: '100%',
          maxW: '100%',
          boxSizing: 'border-box'
        }"
      >
        <code
          [sj]="{
            d: 'block',
            m: 0,
            w: '100%',
            whiteSpace: 'pre-wrap',
            overflowWrap: 'anywhere',
            wordBreak: 'break-word',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            lineHeight: 1.4,
            c: 'light.contrast',
            boxSizing: 'border-box'
          }"
          [innerText]="code"
        ></code>
      </pre>
    </sj-card>
  `,
})
export class CodeBlockComponent {
  readonly sj: SjRootApi = sj;
  @Input() code = '';
}
