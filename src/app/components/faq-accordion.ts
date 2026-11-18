import {ChangeDetectionStrategy, Component, input, signal} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {FaqEntry} from '../data/syncthing-content';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-faq-accordion',
  imports: [MatIconModule],
  template: `
    <div class="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      @for (item of items(); track item.id) {
        <div>
          <button
            type="button"
            (click)="toggle(item.id)"
            [attr.aria-expanded]="openId() === item.id"
            class="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-slate-50/80 sm:px-7 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-blue-700"
          >
            <div>
              <span class="block text-xs font-medium text-blue-700">
                {{ item.category }}
              </span>
              <span class="mt-1 block text-base font-semibold text-slate-900">
                {{ item.question }}
              </span>
            </div>
            <mat-icon
              [class]="
                openId() === item.id
                  ? 'shrink-0 text-slate-700 transition-transform duration-200 rotate-180'
                  : 'shrink-0 text-slate-400 transition-transform duration-200'
              "
              aria-hidden="true"
            >
              expand_more
            </mat-icon>
          </button>

          @if (openId() === item.id) {
            <div class="px-5 pb-6 pt-0 text-sm leading-relaxed text-slate-600 sm:px-7 sm:text-base">
              {{ item.answer }}
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class FaqAccordion {
  readonly items = input.required<FaqEntry[]>();
  readonly openId = signal<string | null>('remote-fee');

  toggle(id: string): void {
    this.openId.update((current) => (current === id ? null : id));
  }
}
