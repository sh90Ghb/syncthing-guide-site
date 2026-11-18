import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {PlatformExplorer} from '../components/platform-explorer';
import {TaobaoCtaCard} from '../components/taobao-cta-card';
import {PLATFORM_TABLE_ROWS} from '../data/syncthing-content';
import {Seo} from '../services/seo';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-platforms-page',
  imports: [PlatformExplorer, TaobaoCtaCard],
  template: `
    <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div class="max-w-3xl">
        <p class="text-xs font-semibold text-blue-700">跨平台环境指南</p>
        <h1 class="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Syncthing 全平台系统环境兼容与配套版本一览
        </h1>
        <p class="mt-4 text-base leading-relaxed text-slate-600">
          不论是日常 Windows 办公本、MacBook、安卓手机、iPhone/iPad，还是群晖、威联通、飞牛 NAS 服务器，只要运行在同一底层协议下即可自由组成私人同步网络。
        </p>
      </div>

      <!-- Interactive Explorer -->
      <div class="mt-10">
        <app-platform-explorer />
      </div>

      <!-- Full Compatibility Table -->
      <section class="mt-16" aria-labelledby="matrix-heading">
        <h2 id="matrix-heading" class="font-display text-2xl font-bold tracking-tight text-slate-950">
          各操作系统推荐版本与小白适配要点
        </h2>
        <p class="mt-2 text-sm text-slate-600">
          淘宝店铺整合包已帮您按系统分类整理好，避免去 GitHub 找错芯片架构（如 x64 与 ARM64 混淆）。
        </p>

        <div class="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table class="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead class="bg-slate-50 text-xs font-semibold text-slate-700">
              <tr>
                <th scope="col" class="px-5 py-3.5 whitespace-nowrap">操作系统 / 平台</th>
                <th scope="col" class="px-5 py-3.5 whitespace-nowrap">支持版本 / 架构</th>
                <th scope="col" class="px-5 py-3.5 whitespace-nowrap">整合包配套客户端</th>
                <th scope="col" class="px-5 py-3.5 whitespace-nowrap">后台驻留方式</th>
                <th scope="col" class="px-5 py-3.5">关键避坑说明</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              @for (row of platformRows; track row.os) {
                <tr class="hover:bg-slate-50/70">
                  <td class="px-5 py-4 font-semibold text-slate-950 whitespace-nowrap">{{ row.os }}</td>
                  <td class="px-5 py-4 font-mono text-xs text-slate-600 whitespace-nowrap">{{ row.versions }}</td>
                  <td class="px-5 py-4 font-medium text-blue-800 whitespace-nowrap">{{ row.packageName }}</td>
                  <td class="px-5 py-4 text-slate-600">{{ row.autoStart }}</td>
                  <td class="px-5 py-4 text-slate-600">{{ row.notes }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

      <!-- Network & Ports Reference -->
      <section class="mt-16 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 class="font-display text-xl font-bold text-slate-950">
          网络端口与防火墙放行参考（远程调试常查参数）
        </h2>
        <p class="mt-2 text-sm text-slate-600">
          绝大多数新手安装完连不上，都是因为系统防火墙或 Docker 端口映射没放开以下端口。如果您购买了另外收费的远程安装服务，工程师会直接帮您配置好。
        </p>

        <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p class="font-mono text-sm font-semibold text-slate-950 tabular-nums">8384 / TCP</p>
            <p class="mt-1 text-sm font-medium text-slate-800">本地网页管理控制台</p>
            <p class="mt-1 text-xs text-slate-600">默认仅本机浏览器访问，NAS 部署时需映射出来方便局域网管理。</p>
          </div>
          <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p class="font-mono text-sm font-semibold text-slate-950 tabular-nums">22000 / TCP + UDP</p>
            <p class="mt-1 text-sm font-medium text-slate-800">核心数据加密同步端口</p>
            <p class="mt-1 text-xs text-slate-600">同时支持 TCP 与 QUIC (UDP) 协议，外网穿透和高速传输的关键端口。</p>
          </div>
          <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p class="font-mono text-sm font-semibold text-slate-950 tabular-nums">21027 / UDP</p>
            <p class="mt-1 text-sm font-medium text-slate-800">局域网自动发现广播</p>
            <p class="mt-1 text-xs text-slate-600">同一 Wi-Fi 下自动互相识别内网 IP，实现 100MB/s 以上满速直连。</p>
          </div>
        </div>
      </section>

      <div class="mt-16">
        <app-taobao-cta-card />
      </div>
    </div>
  `,
})
export class PlatformsPage implements OnInit {
  private readonly seo = inject(Seo);
  readonly platformRows = PLATFORM_TABLE_ROWS;

  ngOnInit(): void {
    this.seo.updatePageMeta({
      title: 'Syncthing 中文版跨平台指南：Windows/Mac/安卓/iOS/NAS 中文配套 | SyncGuide',
      description:
        '详解 Syncthing 中文版在 Windows 中文托盘、macOS、Linux、Android 安卓汉化版、iOS 及群晖威联通 NAS 的版本选择与中文端口防火墙教程。',
      keywords: 'Syncthing中文版, Syncthing中文跨平台, Syncthing Windows中文版, Syncthing Mac中文, Syncthing 群晖NAS中文, Syncthing安卓中文',
      path: '/platforms',
    });
  }
}
