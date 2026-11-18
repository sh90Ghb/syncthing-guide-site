import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {PLATFORM_PAIRINGS} from '../data/syncthing-content';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-platform-explorer',
  imports: [MatIconModule],
  template: `
    <div>
      <!-- Interactive Segmented Filter Tabs -->
      <div
        role="tablist"
        aria-label="选择设备跨平台同步组合"
        class="inline-flex max-w-full flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 p-1.5"
      >
        @for (pairing of pairings; track pairing.id) {
          <button
            type="button"
            role="tab"
            [attr.aria-selected]="selectedId() === pairing.id"
            (click)="selectPairing(pairing.id)"
            [class]="
              selectedId() === pairing.id
                ? 'rounded-lg bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-slate-950 shadow-sm transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700'
                : 'rounded-lg px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 transition-colors duration-150 hover:text-slate-950 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700'
            "
          >
            {{ pairing.label }}
          </button>
        }
      </div>

      <!-- Selected Platform Details -->
      @let active = activePairing();
      <div
        role="tabpanel"
        class="mt-6 grid grid-cols-1 items-stretch gap-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:grid-cols-12"
      >
        <div class="flex flex-col justify-between lg:col-span-7">
          <div>
            <div class="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span class="font-medium text-blue-700">{{ active.setupDifficulty }}</span>
              <span aria-hidden="true">·</span>
              <span>{{ active.architecture }}</span>
            </div>

            <h3 class="mt-3 font-display text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {{ active.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
              {{ active.subtitle }}
            </p>

            <div class="mt-6 border-t border-slate-100 pt-5">
              <p class="text-xs font-semibold text-slate-900">
                淘宝整合包已为您配齐以下文件与指引：
              </p>
              <ul class="mt-3 space-y-2 text-sm text-slate-700">
                @for (item of active.includedFiles; track item) {
                  <li class="flex items-start gap-2.5">
                    <mat-icon
                      class="mt-0.5 !text-[16px] !h-4 !w-4 shrink-0 text-blue-700"
                      aria-hidden="true"
                    >
                      check_circle
                    </mat-icon>
                    <span>{{ item }}</span>
                  </li>
                }
              </ul>
            </div>

            <div class="mt-6 rounded-xl border border-amber-200/80 bg-amber-50/60 p-4">
              <p class="text-xs font-semibold text-amber-900">小白常见卡点与避坑提示</p>
              <p class="mt-1 text-sm leading-relaxed text-amber-950/80">
                {{ active.pitfallTip }}
              </p>
            </div>
          </div>

          <div
            class="mt-6 flex flex-col gap-1 border-t border-slate-100 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"
          >
            <span>典型场景：{{ active.useCase }}</span>
            <span class="font-mono text-slate-600">{{ active.portsNote }}</span>
          </div>
        </div>

        <div class="lg:col-span-5">
          @if (!imageFailed()) {
            <div class="relative h-full min-h-[240px] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              <img
                src="/assets/images/cross_platform_devices_1794989138894.jpg"
                alt="支持 Windows、macOS、平板、手机与 NAS 多设备跨平台同步的硬件生态"
                referrerpolicy="no-referrer"
                (error)="onImageError()"
                class="h-full w-full object-cover"
              />
              <div
                class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent p-5 text-white"
              >
                <p class="text-xs text-slate-200">跨系统无缝底层协议</p>
                <p class="mt-0.5 text-sm font-semibold">
                  {{ active.label }} · 全链路加密直传
                </p>
              </div>
            </div>
          } @else {
            <div
              class="flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-100 p-6 text-center"
            >
              <mat-icon class="!text-4xl !h-9 !w-9 text-blue-700" aria-hidden="true">devices</mat-icon>
              <p class="mt-3 text-base font-semibold text-slate-900">{{ active.label }}</p>
              <p class="mt-1 text-sm text-slate-600">{{ active.architecture }}</p>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class PlatformExplorer {
  readonly pairings = PLATFORM_PAIRINGS;
  readonly selectedId = signal<string>(PLATFORM_PAIRINGS[0].id);
  readonly imageFailed = signal(false);

  readonly activePairing = computed(
    () =>
      this.pairings.find((p) => p.id === this.selectedId()) ?? this.pairings[0],
  );

  selectPairing(id: string): void {
    this.selectedId.set(id);
  }

  onImageError(): void {
    this.imageFailed.set(true);
  }
}
