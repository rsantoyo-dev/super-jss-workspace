import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SJ_BASE_COMPONENTS_IMPORTS, SjRootApi, sj } from 'super-jss';
import { SectionContainerComponent } from './section-container.component';

@Component({
  standalone: true,
  selector: 'app-demo-padding',
  imports: [
    CommonModule,
    SectionContainerComponent,
    ...SJ_BASE_COMPONENTS_IMPORTS,
  ],
  template: `
    <app-section title="Padding System">
      <sj-typography variant="p" [sj]="sj.c('neutral.dark')">
        There are different needs when it comes to spacing inside components.
        Super-JSS provides multiple ways to handle padding, from simple
        symmetric densities (compact, default, comfortable, spacious) to preset
        numeric values (1–12) for richer/asymmetric layouts. Those are only
        quick options, but if full control is needed, it can be achieved by
        using the sj directive padding utilities, either with numeric values
        responding to our spacing system, or with px/rem units.
      </sj-typography>

      <!-- Presets 1–12 (designed arrays you can spread) -->
      <sj-typography variant="h6" [sj]="[sj.mt(1)]"
        >Padding presets 1–12</sj-typography
      >
      <sj-typography variant="small" [sj]="sj.c('neutral.dark')">
        responsive predesigned padding combinations, that may be overridden by
        passing an object with responsive values in theme.
      </sj-typography>
      <sj-typography variant="small" [sj]="sj.c('neutral.dark')">
        [usePadding]="n" in sj-button sj-paper sj-card sj-flex</sj-typography
      >
      <sj-typography variant="small" [sj]="sj.c('neutral.dark')">
        As default, this 4 initial items, are most used paddings to keep
        consistency across the app. it is a responsive padding ex. xs: 0.5, sm:
        0.6, md: 0.7, lg: 0.75, xl: 0.9
      </sj-typography>
      <div
        [sj]="[
          sj.d('grid'),
          sj.gap({ xs: 0.5, md: 1 }),
          sj.gridTemplateColumns({
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)'
          })
        ]"
      >
        @for (item of [1, 2, 3, 4]; track $index) {
        <sj-paper useRounded variant="outlined">
          <sj-flex useCol useGap="compact" [usePadding]="item">
            <sj-typography variant="small"></sj-typography>
            <sj-typography variant="small"
              >sj-paper [usePadding]="{{ item }}"
            </sj-typography>
          </sj-flex>
        </sj-paper>
        }
      </div>

      <sj-typography variant="small" [sj]="sj.c('neutral.dark')">
        This 4 next items, are most used paddings to keep a left padding
        consisten, or any user case that needs a left bias padding.
      </sj-typography>
      <div
        [sj]="[
          sj.d('grid'),
          sj.gap({ xs: 0.5, md: 1 }),
          sj.gridTemplateColumns({
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)'
          })
        ]"
      >
        @for (item of [5, 6, 7, 8]; track $index) {
        <sj-paper useRounded variant="outlined">
          <sj-flex useCol useGap="compact" [usePadding]="item">
            <sj-typography variant="small"></sj-typography>
            <sj-typography variant="small"
              >sj-paper [usePadding]="{{ item }}"
            </sj-typography>
          </sj-flex>
        </sj-paper>
        }
      </div>

      <sj-typography variant="small" [sj]="sj.c('neutral.dark')">
        Last 4 items, are most used paddings with diff x and y values.
      </sj-typography>
      <div
        [sj]="[
          sj.d('grid'),
          sj.gap({ xs: 0.5, md: 1 }),
          sj.gridTemplateColumns({
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)'
          })
        ]"
      >
        @for (item of [9, 10, 11, 12]; track $index) {
        <sj-paper useRounded variant="outlined">
          <sj-flex useCol useGap="compact" [usePadding]="item">
            <sj-typography variant="small"></sj-typography>
            <sj-typography variant="small"
              >sj-paper [usePadding]="{{ item }}"
            </sj-typography>
          </sj-flex>
        </sj-paper>
        }
      </div>

      <!-- Densities 1–4 (simple, symmetric) -->
      <sj-typography variant="strong" [sj]="[sj.mt(0.5)]"
        >Densities 1–4</sj-typography
      >
      <sj-typography variant="small" [sj]="sj.c('neutral.dark')">
        This 4 initial items, as default same values as sj-paper
        [usePadding]="1", are quick helper for padding densities, that are
        symmetric on all sides: compact, default, comfortable, spacious. and
        used from the directive.
      </sj-typography>

      <div
        [sj]="[
          sj.d('grid'),
          sj.gap(sj.gap.options.default),
          sj.gridTemplateColumns({ xs: '1fr', md: 'repeat(2, 1fr)' })
        ]"
      >
        <sj-paper useRounded variant="outlined">
          <sj-flex
            useCol
            [sj]="[
              sj.padding(sj.padding.options.compact),
              sj.gap(sj.gap.options.compact)
            ]"
          >
            <sj-typography variant="small">Density compact </sj-typography>
            <sj-typography variant="small"
              >[sj] → sj.padding(sj.padding.options.compact)
            </sj-typography>
          </sj-flex>
        </sj-paper>
        <sj-paper useRounded variant="outlined">
          <sj-flex
            useCol
            [sj]="[
              sj.padding(sj.padding.options.default),
              sj.gap(sj.gap.options.compact)
            ]"
          >
            <sj-typography variant="small">Density default </sj-typography>
            <sj-typography variant="small"
              >[sj] → sj.padding(sj.padding.options.default)
            </sj-typography>
          </sj-flex>
        </sj-paper>
        <sj-paper useRounded variant="outlined">
          <sj-flex
            useCol
            [sj]="[
              sj.padding(sj.padding.options.comfortable),
              sj.gap(sj.gap.options.compact)
            ]"
          >
            <sj-typography variant="small">Density comfortable </sj-typography>
            <sj-typography variant="small"
              >[sj] → sj.padding(sj.padding.options.comfortable)
            </sj-typography>
          </sj-flex>
        </sj-paper>
        <sj-paper useRounded variant="outlined">
          <sj-flex
            useCol
            [sj]="[
              sj.padding(sj.padding.options.spacious),
              sj.gap(sj.gap.options.compact)
            ]"
          >
            <sj-typography variant="small">Density spacious </sj-typography>
            <sj-typography variant="small"
              >[sj] → sj.padding(sj.padding.options.spacious)
            </sj-typography>
          </sj-flex>
        </sj-paper>
      </div>

      <!-- densities 1 4 paddingTop-->
      <sj-typography variant="strong" [sj]="[sj.mt(0.5)]"
        >Densities 1–4 with Padding Top example</sj-typography
      >

      <div
        [sj]="[
          sj.d('grid'),
          sj.gap(sj.gap.options.default),
          sj.gridTemplateColumns({ xs: '1fr', md: 'repeat(2, 1fr)' })
        ]"
      >
        <sj-paper useRounded variant="outlined">
          <sj-flex
            useCol
            [sj]="[
              sj.paddingTop(sj.padding.options.compact),
              sj.gap(sj.gap.options.compact)
            ]"
          >
            <sj-typography variant="small">Density compact </sj-typography>
            <sj-typography variant="small"
              >[sj] → sj.padding(sj.padding.options.compact)
            </sj-typography>
          </sj-flex>
        </sj-paper>
        <sj-paper useRounded variant="outlined">
          <sj-flex
            useCol
            [sj]="[
              sj.paddingTop(sj.padding.options.default),
              sj.gap(sj.gap.options.compact)
            ]"
          >
            <sj-typography variant="small">Density default </sj-typography>
            <sj-typography variant="small"
              >[sj] → sj.padding(sj.padding.options.default)
            </sj-typography>
          </sj-flex>
        </sj-paper>
        <sj-paper useRounded variant="outlined">
          <sj-flex
            useCol
            [sj]="[
              sj.paddingTop(sj.padding.options.comfortable),
              sj.gap(sj.gap.options.compact)
            ]"
          >
            <sj-typography variant="small">Density comfortable </sj-typography>
            <sj-typography variant="small"
              >[sj] → sj.padding(sj.padding.options.comfortable)
            </sj-typography>
          </sj-flex>
        </sj-paper>
        <sj-paper useRounded variant="outlined">
          <sj-flex
            useCol
            [sj]="[
              sj.paddingTop(sj.padding.options.spacious),
              sj.gap(sj.gap.options.compact)
            ]"
          >
            <sj-typography variant="small">Density spacious </sj-typography>
            <sj-typography variant="small"
              >[sj] → sj.padding(sj.padding.options.spacious)
            </sj-typography>
          </sj-flex>
        </sj-paper>
      </div>

      <!-- sj directive presets system using spacing -->
      <sj-typography variant="strong" [sj]="[sj.mt(1)]"
        >Sj Directive using spacing</sj-typography
      >
      <sj-typography variant="small" [sj]="[]"
        >default spacing 1 = 1rem</sj-typography
      >
      <div
        [sj]="[
          sj.d('grid'),
          sj.gap({ xs: 0.5, md: 1 }),
          sj.gridTemplateColumns({
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)'
          })
        ]"
      >
        @for (item of [1, 1.5, 2, 2.5, 3, 3.5, 4]; track $index) {
        <sj-paper useRounded variant="outlined">
          <sj-flex useCol useGap="compact" [sj]="sj.padding(item)">
            <sj-typography variant="small"></sj-typography>
            <sj-typography variant="small"
              >[sj] → sj.padding({{ item }})
            </sj-typography>
          </sj-flex>
        </sj-paper>
        }
      </div>

      <!-- sj directive presets system using spacing -->
      <sj-typography variant="strong" [sj]="[sj.mt(1)]"
        >Sj Directive using spacing</sj-typography
      >
      <sj-typography variant="small" [sj]="[]"
        >default spacing 1 = 1rem</sj-typography
      >
      <div
        [sj]="[
          sj.d('grid'),
          sj.gap({ xs: 0.5, md: 1 }),
          sj.gridTemplateColumns({
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)'
          })
        ]"
      >
        @for (item of [1, 1.5, 2, 2.5, 3, 3.5, 4]; track $index) {
        <sj-paper useRounded variant="outlined">
          <sj-flex useCol useGap="compact" [sj]="sj.padding(item)">
            <sj-typography variant="small"></sj-typography>
            <sj-typography variant="small"
              >[sj] → sj.padding({{ item }})
            </sj-typography>
          </sj-flex>
        </sj-paper>
        }
      </div>

      <!-- sj directive presets system using spacing -->
      <sj-typography variant="strong" [sj]="[sj.mt(1)]"
        >Sj Directive using px or rem</sj-typography
      >

      <div
        [sj]="[
          sj.d('grid'),
          sj.gap({ xs: 0.5, md: 1 }),
          sj.gridTemplateColumns({
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)'
          })
        ]"
      >
        @for (item of ['10px', '20px', '3rem', '3.5rem']; track $index) {
        <sj-paper useRounded variant="outlined">
          <sj-flex useCol useGap="compact" [sj]="sj.padding(item)">
            <sj-typography variant="small"></sj-typography>
            <sj-typography variant="small"
              >[sj] → sj.padding({{ item }})
            </sj-typography>
          </sj-flex>
        </sj-paper>
        }
      </div>
    </app-section>
  `,
})
export class DemoPaddingComponent {
  readonly sj: SjRootApi = sj;
}
