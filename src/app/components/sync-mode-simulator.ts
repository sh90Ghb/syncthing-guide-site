import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {SYNC_MODES, SyncModeDemo} from '../data/syncthing-content';

type SimEventType = 'edit-a' | 'delete-b';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-sync-mode-simulator',
  imports: [MatIconModule],
  template: `
    <div class="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="text-xs font-semibold text-blue-700">交互式防踩坑演示</p>
          <h3 class="mt-1 font-display text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            怕误删文件？先点一点试试三种同步模式的区别
          </h3>
          <p class="mt-1.5 text-sm text-slate-600">
            很多新手不敢用同步软件，是担心在一边删了文件另一边也跟着没了。选好模式就能彻底消除顾虑：
          </p>
        </div>

        <div
          role="tablist"
          aria-label="选择同步模式"
          class="inline-flex max-w-full flex-wrap items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1"
        >
          @for (mode of modes; track mode.id) {
            <button
              type="button"
              role="tab"
              [attr.aria-selected]="selectedModeId() === mode.id"
              (click)="selectMode(mode.id)"
              [class]="
                selectedModeId() === mode.id
                  ? 'rounded-lg bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-950 shadow-sm transition-colors duration-150 whitespace-nowrap shrink-0'
                  : 'rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-600 transition-colors duration-150 hover:text-slate-950 whitespace-nowrap shrink-0'
              "
            >
              {{ mode.name }}
            </button>
          }
        </div>
      </div>

      @let mode = activeMode();
      <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div class="rounded-xl border border-slate-200 bg-slate-50/70 p-5 lg:col-span-5">
          <div class="flex items-center justify-between gap-2 text-xs text-slate-500">
            <span class="font-mono font-medium text-slate-700">{{ mode.englishName }}</span>
            <span>适用人群说明</span>
          </div>
          <p class="mt-3 text-base font-semibold text-slate-900">
            {{ mode.recommendedFor }}
          </p>
          <p class="mt-2 text-sm leading-relaxed text-slate-600">
            {{ mode.summary }}
          </p>

          <div class="mt-5 border-t border-slate-200/80 pt-4">
            <p class="text-xs font-medium text-slate-500">点击下方按钮模拟真实操作结果：</p>
            <div class="mt-2.5 flex flex-wrap gap-2">
              <button
                type="button"
                (click)="triggerEvent('edit-a')"
                [class]="
                  simEvent() === 'edit-a'
                    ? 'inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-3.5 py-2 text-xs font-semibold text-white transition-colors whitespace-nowrap'
                    : 'inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap'
                "
              >
                <mat-icon class="!text-[16px] !h-4 !w-4 leading-4" aria-hidden="true">edit_document</mat-icon>
                <span>模拟：A 设备新增/修改文件</span>
              </button>
              <button
                type="button"
                (click)="triggerEvent('delete-b')"
                [class]="
                  simEvent() === 'delete-b'
                    ? 'inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-3.5 py-2 text-xs font-semibold text-white transition-colors whitespace-nowrap'
                    : 'inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap'
                "
              >
                <mat-icon class="!text-[16px] !h-4 !w-4 leading-4" aria-hidden="true">delete_outline</mat-icon>
                <span>模拟：B 设备删除某个文件</span>
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 lg:col-span-7">
          <div>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-center">
              <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p class="text-xs font-medium text-slate-500">设备 A（例如：手机/公司电脑）</p>
                <p class="mt-1.5 text-sm font-semibold text-slate-900">
                  {{ simEvent() === 'edit-a' ? '新增 / 更新了文件' : '原有文件完好保留中' }}
                </p>
              </div>

              <div class="flex flex-col items-center justify-center py-2 text-center">
                <mat-icon class="text-blue-700" aria-hidden="true">
                  {{ mode.id === 'sendreceive' ? 'sync_alt' : 'arrow_forward' }}
                </mat-icon>
                <span class="mt-1 font-mono text-xs font-medium text-slate-600">
                  {{
                    mode.id === 'sendreceive'
                      ? '双向同步规则'
                      : mode.id === 'sendonly'
                        ? 'A 单向发往 B'
                        : 'B 仅从 A 接收'
                  }}
                </span>
              </div>

              <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p class="text-xs font-medium text-slate-500">设备 B（例如：家用电脑/NAS）</p>
                <p class="mt-1.5 text-sm font-semibold text-slate-900">
                  {{ deviceBStatus() }}
                </p>
              </div>
            </div>

            <div class="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p class="text-xs font-semibold text-slate-900">执行结果解释：</p>
              <p class="mt-1 text-sm leading-relaxed text-slate-700">
                {{ simEvent() === 'edit-a' ? mode.deviceBOutcome : mode.deleteRule }}
              </p>
            </div>
          </div>

          <p class="mt-4 text-xs text-slate-500">
            安全兜底提示：无论使用哪种模式，按照我们提供的手册开启「回收站版本控制」后，历史修改与删除均会自动备份，可随时找回。
          </p>
        </div>
      </div>
    </div>
  `,
})
export class SyncModeSimulator {
  readonly modes = SYNC_MODES;
  readonly selectedModeId = signal<SyncModeDemo['id']>('sendonly');
  readonly simEvent = signal<SimEventType>('delete-b');

  readonly activeMode = computed(
    () =>
      this.modes.find((m) => m.id === this.selectedModeId()) ?? this.modes[0],
  );

  readonly deviceBStatus = computed(() => {
    const modeId = this.selectedModeId();
    const evt = this.simEvent();
    if (evt === 'edit-a') {
      return '自动收到设备 A 的最新文件';
    }
    if (modeId === 'sendreceive') {
      return 'B 删除后，A 也会同步删除（可从版本回收站恢复）';
    }
    if (modeId === 'sendonly') {
      return 'B 删了文件，A 设备原图绝对安全不受影响';
    }
    return 'B 仅被动接收，B 的本地修改或删除不会传回 A';
  });

  selectMode(id: SyncModeDemo['id']): void {
    this.selectedModeId.set(id);
  }

  triggerEvent(evt: SimEventType): void {
    this.simEvent.set(evt);
  }
}
