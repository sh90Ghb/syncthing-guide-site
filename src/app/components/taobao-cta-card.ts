import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {
  TAOBAO_PRODUCT_URL,
  TAOBAO_REMOTE_SERVICE_URL,
} from '../data/syncthing-content';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-taobao-cta-card',
  imports: [MatIconModule],
  template: `
    <section
      aria-labelledby="purchase-heading"
      class="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10"
    >
      <div class="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        <div class="flex flex-col justify-between lg:col-span-7">
          <div>
            <p class="text-xs font-medium text-blue-700">
              淘宝正品发货 · 软件本体与远程服务独立下单入口
            </p>
            <h2
              id="purchase-heading"
              class="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            >
              告别全英文官网折腾，直接带走 Syncthing 中文版方案
            </h2>
            <p class="mt-3 text-base leading-relaxed text-slate-600">
              如果您打算自己照着中文图文手册 10 分钟安装，拍下「中文版软件整合包」即可；如果完全不想研究网络、防火墙或 NAS 权限，请另外拍下「支持远程安装服务」专属链接。
            </p>

            <div class="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div class="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/80 p-5">
                <div>
                  <div class="flex items-center justify-between gap-2">
                    <h3 class="text-base font-semibold text-slate-900">
                      01. 中文版软件整合包
                    </h3>
                    <span class="text-xs font-medium text-slate-600">全中文自助装</span>
                  </div>
                  <p class="mt-2 text-sm leading-relaxed text-slate-600">
                    含 Win 中文托盘无黑框版、Mac/Linux/安卓中文端安装包、NAS 部署模板、防垃圾文件规则及全中文避坑手册。
                  </p>
                </div>

                <div class="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-200/80 pt-4">
                  <a
                    [href]="taobaoUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-blue-800 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                  >
                    <span>拍下中文软件整合包</span>
                    <mat-icon class="!text-[15px] !h-4 !w-4 leading-4" aria-hidden="true">shopping_bag</mat-icon>
                  </a>
                  <button
                    type="button"
                    (click)="copyLink('software')"
                    class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap"
                  >
                    <mat-icon class="!text-[14px] !h-3.5 !w-3.5 leading-3.5" aria-hidden="true">
                      {{ copiedTarget() === 'software' ? 'check' : 'content_copy' }}
                    </mat-icon>
                    <span>{{ copiedTarget() === 'software' ? '已复制' : '复制链接' }}</span>
                  </button>
                </div>
              </div>

              <div class="flex flex-col justify-between rounded-xl border border-blue-200 bg-blue-50/50 p-5">
                <div>
                  <div class="flex items-center justify-between gap-2">
                    <h3 class="text-base font-semibold text-slate-900">
                      02. 支持远程安装服务
                    </h3>
                    <span class="text-xs font-semibold text-blue-700">另外收费</span>
                  </div>
                  <p class="mt-2 text-sm leading-relaxed text-slate-600">
                    基础软件单不含远程安装；如需工程师远程桌面一对一帮您装好软件、搞定防火墙、NAS 权限与手机配对，请拍下本支持远程安装专属入口。
                  </p>
                </div>

                <div class="mt-5 flex flex-wrap items-center gap-2 border-t border-blue-200/70 pt-4">
                  <a
                    [href]="remoteServiceUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-slate-800 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                  >
                    <span>拍下支持远程安装服务</span>
                    <mat-icon class="!text-[15px] !h-4 !w-4 leading-4" aria-hidden="true">support_agent</mat-icon>
                  </a>
                  <button
                    type="button"
                    (click)="copyLink('remote')"
                    class="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-blue-50 whitespace-nowrap"
                  >
                    <mat-icon class="!text-[14px] !h-3.5 !w-3.5 leading-3.5" aria-hidden="true">
                      {{ copiedTarget() === 'remote' ? 'check' : 'content_copy' }}
                    </mat-icon>
                    <span>{{ copiedTarget() === 'remote' ? '已复制' : '复制链接' }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p class="mt-5 text-xs text-slate-500">
            提示：电脑端点击按钮可直接打开淘宝详情页；手机端如无法直接拉起淘宝 App，可点击「复制链接」后打开手机淘宝粘贴访问。
          </p>
        </div>

        <div class="lg:col-span-5">
          @if (!imageFailed()) {
            <div class="relative h-full min-h-[240px] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              <img
                src="/assets/images/remote_install_support_1794989139291.jpg"
                alt="工程师远程协助配置跨平台同步网络拓扑桌面环境"
                referrerpolicy="no-referrer"
                (error)="onImageError()"
                class="h-full w-full object-cover"
              />
              <div
                class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-5 text-white"
              >
                <p class="text-sm font-semibold">专业技术交付，小白零门槛落地</p>
                <p class="mt-1 text-xs text-slate-200">
                  支持向日葵 / ToDesk 远程协助调试，直到两台设备稳定同步成功
                </p>
              </div>
            </div>
          } @else {
            <div
              class="flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-100 p-6 text-center"
            >
              <mat-icon class="!text-4xl !h-9 !w-9 text-blue-700" aria-hidden="true">support_agent</mat-icon>
              <p class="mt-3 text-base font-semibold text-slate-900">一对一远程安装支持</p>
              <p class="mt-1 text-sm text-slate-600">软件基础包与付费远程调试按需选购</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class TaobaoCtaCard {
  readonly taobaoUrl = TAOBAO_PRODUCT_URL;
  readonly remoteServiceUrl = TAOBAO_REMOTE_SERVICE_URL;
  readonly copiedTarget = signal<'software' | 'remote' | null>(null);
  readonly imageFailed = signal(false);

  async copyLink(target: 'software' | 'remote'): Promise<void> {
    const url = target === 'software' ? this.taobaoUrl : this.remoteServiceUrl;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        this.copiedTarget.set(target);
        setTimeout(() => {
          if (this.copiedTarget() === target) {
            this.copiedTarget.set(null);
          }
        }, 2500);
      }
    } catch {
      this.copiedTarget.set(null);
    }
  }

  onImageError(): void {
    this.imageFailed.set(true);
  }
}
