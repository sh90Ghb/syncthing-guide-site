import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {
  TAOBAO_PRODUCT_URL,
  TAOBAO_REMOTE_SERVICE_URL,
} from '../data/syncthing-content';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-site-footer',
  imports: [RouterLink, MatIconModule],
  template: `
    <footer class="border-t border-slate-200 bg-white text-slate-600">
      <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div class="md:col-span-5">
            <a
              routerLink="/"
              class="font-display text-lg font-bold tracking-tight text-slate-900"
            >
              SyncGuide 同步指南
            </a>
            <p class="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
              面向零基础用户的 Syncthing 跨平台文件同步教程与精选软件整合包服务站。支持 Windows、macOS、Linux、Android、iOS 与 NAS 私有云全场景直连同步。
            </p>
            <p class="mt-3 text-xs text-slate-500">
              说明：淘宝下单购买的是多平台整合软件包与图文教程；如需工程师一对一远程代安装调试，属于另外收费的增值服务。
            </p>
          </div>

          <div class="md:col-span-3">
            <h3 class="text-sm font-semibold text-slate-900">站内导航</h3>
            <ul class="mt-4 space-y-2.5 text-sm">
              <li>
                <a routerLink="/" class="hover:text-slate-950 transition-colors">首页概览</a>
              </li>
              <li>
                <a routerLink="/platforms" class="hover:text-slate-950 transition-colors">跨平台环境兼容表</a>
              </li>
              <li>
                <a routerLink="/tutorial" class="hover:text-slate-950 transition-colors">小白三步上手教程</a>
              </li>
              <li>
                <a routerLink="/faq" class="hover:text-slate-950 transition-colors">远程服务与常见问题</a>
              </li>
            </ul>
          </div>

          <div class="md:col-span-4">
            <h3 class="text-sm font-semibold text-slate-900">获取软件整合包与远程安装支持</h3>
            <p class="mt-4 text-sm leading-relaxed text-slate-600">
              前往官方合作淘宝店铺按需下单：可单独购买软件整合包自助安装，也可另拍远程安装服务由工程师一对一调试。
            </p>
            <div class="mt-5 flex flex-wrap gap-2.5">
              <a
                [href]="taobaoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-slate-800 whitespace-nowrap"
              >
                <span>购买软件整合包</span>
                <mat-icon class="!text-[16px] !h-4 !w-4 leading-4" aria-hidden="true">arrow_outward</mat-icon>
              </a>
              <a
                [href]="remoteServiceUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50 whitespace-nowrap"
              >
                <span>预约远程安装（另收费）</span>
                <mat-icon class="!text-[16px] !h-4 !w-4 leading-4" aria-hidden="true">support_agent</mat-icon>
              </a>
            </div>
          </div>
        </div>

        <div
          class="mt-10 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center"
        >
          <p>© 2026 SyncGuide 同步指南 · 专注 Syncthing 跨平台教学与桌面私有同步支持</p>
          <p>Windows · macOS · Linux · Android · iOS · NAS</p>
        </div>
      </div>
    </footer>
  `,
})
export class SiteFooter {
  readonly taobaoUrl = TAOBAO_PRODUCT_URL;
  readonly remoteServiceUrl = TAOBAO_REMOTE_SERVICE_URL;
}
