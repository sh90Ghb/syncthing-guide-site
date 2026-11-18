import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {SyncModeSimulator} from '../components/sync-mode-simulator';
import {TaobaoCtaCard} from '../components/taobao-cta-card';
import {BEGINNER_STEPS, STIGNORE_PRESETS} from '../data/syncthing-content';
import {Seo} from '../services/seo';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tutorial-page',
  imports: [MatIconModule, SyncModeSimulator, TaobaoCtaCard],
  template: `
    <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div class="max-w-3xl">
        <p class="text-xs font-semibold text-blue-700">小白保姆级教程</p>
        <h1 class="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          零基础 3 步上手 Syncthing：从安装、配对到防误删设置
        </h1>
        <p class="mt-4 text-base leading-relaxed text-slate-600">
          不需要注册账户，也不需要购买公网服务器。按照下面三个步骤依次操作，即可让你的多台设备自动保持文件一致。
        </p>
      </div>

      <!-- Detailed 3 Steps -->
      <div class="mt-10 space-y-6">
        @for (step of steps; track step.number) {
          <article class="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="font-mono text-sm font-semibold text-blue-700">第 {{ step.number }} 步</span>
              <span class="text-xs text-slate-500">{{ step.duration }}</span>
            </div>
            <h2 class="mt-2 font-display text-xl font-bold text-slate-950 sm:text-2xl">
              {{ step.title }}
            </h2>
            <p class="mt-3 text-base leading-relaxed text-slate-600">
              {{ step.description }}
            </p>

            <div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              @for (item of step.checklist; track item) {
                <div class="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-sm text-slate-700">
                  <mat-icon class="mt-0.5 !text-[16px] !h-4 !w-4 shrink-0 text-blue-700" aria-hidden="true">
                    check_circle
                  </mat-icon>
                  <span>{{ item }}</span>
                </div>
              }
            </div>

            <p class="mt-4 text-xs text-slate-500">经验总结：{{ step.proTip }}</p>
          </article>
        }
      </div>

      <!-- Sync Mode Simulator -->
      <div class="mt-14">
        <app-sync-mode-simulator />
      </div>

      <!-- Copyable .stignore Templates -->
      <section class="mt-14" aria-labelledby="stignore-heading">
        <h2 id="stignore-heading" class="font-display text-2xl font-bold tracking-tight text-slate-950">
          实用技巧：一键复制常用忽略规则（.stignore）
        </h2>
        <p class="mt-2 text-sm text-slate-600">
          在文件夹设置页面找到「忽略模式」，粘贴下面规则即可自动跳过系统缩略图、Office 临时锁文件与大型缓存目录，大幅提升同步清爽度与速度。
        </p>

        <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          @for (preset of stignorePresets; track preset.title; let idx = $index) {
            <div class="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6">
              <div>
                <div class="flex items-start justify-between gap-3">
                  <h3 class="text-base font-semibold text-slate-900">{{ preset.title }}</h3>
                  <button
                    type="button"
                    (click)="copyPreset(idx, preset.code)"
                    class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0"
                  >
                    <mat-icon class="!text-[14px] !h-3.5 !w-3.5 leading-3.5" aria-hidden="true">
                      {{ copiedIndex() === idx ? 'check' : 'content_copy' }}
                    </mat-icon>
                    <span>{{ copiedIndex() === idx ? '已复制' : '复制规则' }}</span>
                  </button>
                </div>
                <pre
                  class="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-100"
                ><code>{{ preset.code }}</code></pre>
              </div>
            </div>
          }
        </div>
      </section>

      <div class="mt-16">
        <app-taobao-cta-card />
      </div>
    </div>
  `,
})
export class TutorialPage implements OnInit {
  private readonly seo = inject(Seo);
  readonly steps = BEGINNER_STEPS;
  readonly stignorePresets = STIGNORE_PRESETS;
  readonly copiedIndex = signal<number | null>(null);

  ngOnInit(): void {
    this.seo.updatePageMeta({
      title: 'Syncthing 新手三步教程：配对、同步模式与 .stignore 忽略规则 | SyncGuide',
      description:
        '手把手教小白从零安装配置 Syncthing：详解设备 ID 配对、双向/仅发送/仅接收防误删模式、版本控制回收站与常用 .stignore 过滤模板。',
      keywords: 'Syncthing 教程, Syncthing 怎么用, Syncthing 仅发送, Syncthing stignore, 文件同步防误删',
      path: '/tutorial',
    });
  }

  async copyPreset(index: number, code: string): Promise<void> {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(code);
        this.copiedIndex.set(index);
        setTimeout(() => {
          if (this.copiedIndex() === index) {
            this.copiedIndex.set(null);
          }
        }, 2500);
      }
    } catch {
      this.copiedIndex.set(null);
    }
  }
}
