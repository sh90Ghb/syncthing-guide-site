import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {FaqAccordion} from '../components/faq-accordion';
import {PlatformExplorer} from '../components/platform-explorer';
import {SyncModeSimulator} from '../components/sync-mode-simulator';
import {TaobaoCtaCard} from '../components/taobao-cta-card';
import {
  BEGINNER_STEPS,
  FAQ_ITEMS,
  HERO_METRICS,
  TAOBAO_PRODUCT_URL,
  TAOBAO_REMOTE_SERVICE_URL,
} from '../data/syncthing-content';
import {Seo} from '../services/seo';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home-page',
  imports: [
    RouterLink,
    MatIconModule,
    PlatformExplorer,
    SyncModeSimulator,
    TaobaoCtaCard,
    FaqAccordion,
  ],
  template: `
    <!-- Hero Section -->
    <section class="border-b border-slate-200 bg-white">
      <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div class="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <div class="flex flex-col justify-center lg:col-span-6">
            <p class="text-xs sm:text-sm font-medium text-blue-700">
              去中心化私有文件同步 · 跨平台免会员直连方案
            </p>
            <h1
              class="mt-3 font-display text-[clamp(2rem,3.6vw,3.15rem)] font-bold leading-[1.15] tracking-tight text-slate-950"
            >
              告别网盘限速与年费，让电脑、手机和 NAS 自动同步
            </h1>
            <p class="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              用 Syncthing 打造完全属于你自己的私有同步网：文件不经过任何第三方云服务器，局域网跑满千兆带宽，跨系统自动加密续传。不用去英文官网抓瞎，我们为您备好了全平台中文整合安装包与小白图文教程。
            </p>

            <div class="mt-8 flex flex-wrap items-center gap-4">
              <a
                [href]="taobaoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-800 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                <span>前往淘宝下单获取软件</span>
                <mat-icon class="!text-[18px] !h-[18px] !w-[18px] leading-[18px]" aria-hidden="true">arrow_outward</mat-icon>
              </a>
              <a
                href="#tutorial-steps"
                class="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-50 hover:text-slate-950 whitespace-nowrap"
              >
                <span>查看 3 步小白教程</span>
                <mat-icon class="!text-[18px] !h-[18px] !w-[18px] leading-[18px]" aria-hidden="true">south</mat-icon>
              </a>
            </div>

            <p class="mt-4 text-xs leading-relaxed text-slate-500">
              说明：本商品出售全平台整合软件与图文教程，拍下后按手册即可自助安装；也支持一对一远程安装服务（另外收费），
              <a
                [href]="remoteServiceUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="font-medium text-blue-700 underline underline-offset-4 hover:text-blue-800"
              >点此直达远程安装下单入口</a>。
            </p>
          </div>

          <div class="lg:col-span-6">
            @if (!heroImageFailed()) {
              <div class="relative h-full min-h-[260px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                <img
                  src="/assets/images/hero_sync_workspace_1794989138014.jpg"
                  alt="笔记本电脑、桌面显示器与智能手机自动进行跨平台文件同步的现代化办公桌面"
                  referrerpolicy="no-referrer"
                  (error)="onHeroImageError()"
                  class="h-full w-full object-cover"
                />
              </div>
            } @else {
              <div
                class="flex h-full min-h-[260px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 p-8 text-center"
              >
                <mat-icon class="!text-5xl !h-12 !w-12 text-blue-700" aria-hidden="true">sync</mat-icon>
                <p class="mt-4 text-lg font-semibold text-slate-900">多设备加密点对点自动同步</p>
                <p class="mt-1 text-sm text-slate-600">Windows · macOS · Linux · Android · iOS · NAS</p>
              </div>
            }
          </div>
        </div>

        <!-- 4-Column Full-Width Metric Strip -->
        <div
          class="mt-12 grid grid-cols-2 gap-6 border-t border-slate-200 pt-8 sm:grid-cols-4"
        >
          @for (metric of heroMetrics; track metric.label) {
            <div>
              <p class="font-display text-2xl font-bold tracking-tight text-slate-950 tabular-nums sm:text-3xl">
                {{ metric.value }}
              </p>
              <p class="mt-1 text-xs text-slate-600 sm:text-sm">{{ metric.label }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Section 01: Core Value & Asymmetric Bento -->
    <section class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="max-w-2xl">
        <p class="text-xs font-semibold text-blue-700">01. 核心功能与优势对比</p>
        <h2 class="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          为什么越来越多办公族和极客放弃传统网盘，改用 Syncthing？
        </h2>
        <p class="mt-3 text-base leading-relaxed text-slate-600">
          传统网盘先把你的文件传到别人的服务器、限速、审查再按年收会员费；Syncthing 让你的设备之间直接建立加密通道，彻底拿回速度与数据主权。
        </p>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <!-- Bento Item 1 (Span 2) -->
        <article class="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-2">
          <div class="flex items-center justify-between gap-4 text-xs text-slate-500">
            <span>点对点直传架构</span>
            <span class="font-mono text-slate-600">设备 A ↔ 加密隧道 ↔ 设备 B</span>
          </div>
          <h3 class="mt-3 font-display text-xl font-bold text-slate-900">
            没有中间商赚差价：不限速、无容量上限、隐私绝不上云
          </h3>
          <p class="mt-2.5 text-sm leading-relaxed text-slate-600 sm:text-base">
            传统网盘就算开了超级会员，家里几 TB 素材照样要每年续费。Syncthing 只占用你自己的电脑硬盘、手机存储或家用 NAS 空间——硬盘有多大，同步空间就有多大。全程 TLS 1.3 加密传输，你的工作合同、代码源码和家庭照片不会经过任何第三方网盘服务器。
          </p>
        </article>

        <!-- Bento Item 2 (Span 1) -->
        <article class="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <p class="text-xs text-slate-500">传输可靠性</p>
          <h3 class="mt-3 font-display text-xl font-bold text-slate-900">
            大文件断点续传 + 防误删保护
          </h3>
          <p class="mt-2.5 text-sm leading-relaxed text-slate-600">
            几 GB 的高清视频或剪辑工程传一半突然合上笔记本？下次开机上线自动接着断掉的分块继续传，不用从头再来。配合版本控制功能，误删也能随时找回旧版本。
          </p>
        </article>

        <!-- Bento Item 3 (Span 1) -->
        <article class="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <p class="text-xs text-slate-500">智能网络调度</p>
          <h3 class="mt-3 font-display text-xl font-bold text-slate-900">
            局域网千兆满速，出门外网自动穿透
          </h3>
          <p class="mt-2.5 text-sm leading-relaxed text-slate-600">
            设备在同一个 Wi-Fi 下自动走内网直连，实测轻松跑出 100+ MB/s；出差在外用手机流量或酒店网络时，自动切换公网打洞或中继连接，无需折腾复杂公网 IP。
          </p>
        </article>

        <!-- Bento Item 4 (Span 2) -->
        <article class="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-2">
          <div class="flex items-center justify-between gap-4 text-xs text-slate-500">
            <span>全自动静默工作流</span>
            <span>告别手动拷贝与微信传输限制</span>
          </div>
          <h3 class="mt-3 font-display text-xl font-bold text-slate-900">
            改完 Ctrl+S 保存即自动同步，彻底扔掉 U 盘和文件传输助手
          </h3>
          <p class="mt-2.5 text-sm leading-relaxed text-slate-600 sm:text-base">
            微信传文件超过大小限制就发不出去、几天后还会过期失效；U 盘经常忘带或弄丢。配置好 Syncthing 后，它在后台无感监听文件变化，公司改完表格直接下班，回到家打开电脑，最新文件早已静静躺好在桌面上。
          </p>
        </article>
      </div>
    </section>

    <!-- Section 02: Cross-Platform Explorer -->
    <section class="border-y border-slate-200 bg-slate-100/70">
      <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div class="max-w-2xl">
            <p class="text-xs font-semibold text-blue-700">02. 全平台环境与设备搭配</p>
            <h2 class="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              不管你手里是什么系统，都能自由交叉互传
            </h2>
            <p class="mt-2 text-base text-slate-600">
              点击下方常见的设备组合，查看对应系统所需的安装版本与小白避坑要点：
            </p>
          </div>
          <a
            routerLink="/platforms"
            class="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0"
          >
            <span>查看完整 6 大系统兼容表</span>
            <mat-icon class="!text-[16px] !h-4 !w-4 leading-4" aria-hidden="true">arrow_forward</mat-icon>
          </a>
        </div>

        <div class="mt-8">
          <app-platform-explorer />
        </div>
      </div>
    </section>

    <!-- Section 03: Beginner 3-Step Tutorial & Simulator -->
    <section id="tutorial-steps" class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div class="max-w-2xl">
          <p class="text-xs font-semibold text-blue-700">03. 零基础小白上手流程</p>
          <h2 class="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            只要 3 步，10 分钟建立你的第一条跨设备同步通道
          </h2>
          <p class="mt-2 text-base text-slate-600">
            不需要懂任何代码或网络命令行，整个过程全中文图形界面鼠标点几下就能完成。
          </p>
        </div>
        <a
          routerLink="/tutorial"
          class="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0"
        >
          <span>进入完整图文教程与忽略规则库</span>
          <mat-icon class="!text-[16px] !h-4 !w-4 leading-4" aria-hidden="true">arrow_forward</mat-icon>
        </a>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        @for (step of beginnerSteps; track step.number) {
          <article class="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
            <div>
              <div class="flex items-center justify-between gap-2 text-xs text-slate-500">
                <span class="font-mono font-semibold text-blue-700">步骤 {{ step.number }}</span>
                <span>{{ step.duration }}</span>
              </div>
              <h3 class="mt-3 font-display text-lg font-bold text-slate-900">
                {{ step.title }}
              </h3>
              <p class="mt-2.5 text-sm leading-relaxed text-slate-600">
                {{ step.description }}
              </p>

              <ul class="mt-5 space-y-2 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-700 sm:text-sm">
                @for (point of step.checklist; track point) {
                  <li class="flex items-start gap-2">
                    <mat-icon class="mt-0.5 !text-[15px] !h-4 !w-4 shrink-0 text-slate-500" aria-hidden="true">
                      subdirectory_arrow_right
                    </mat-icon>
                    <span>{{ point }}</span>
                  </li>
                }
              </ul>
            </div>

            <p class="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-500">
              提示：{{ step.proTip }}
            </p>
          </article>
        }
      </div>

      <!-- Interactive Sync Mode Simulator -->
      <div class="mt-10">
        <app-sync-mode-simulator />
      </div>
    </section>

    <!-- Section 04: Taobao Conversion & Remote Service Block -->
    <section class="border-t border-slate-200 bg-slate-100/70">
      <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <app-taobao-cta-card />
      </div>
    </section>

    <!-- Section 05: Beginner FAQ -->
    <section class="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div class="max-w-2xl">
          <p class="text-xs font-semibold text-blue-700">04. 下单前常见疑问</p>
          <h2 class="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            小白下单最关心的 5 个问题，这里一次说清楚
          </h2>
        </div>
        <a
          routerLink="/faq"
          class="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0"
        >
          <span>查看全部服务说明</span>
          <mat-icon class="!text-[16px] !h-4 !w-4 leading-4" aria-hidden="true">arrow_forward</mat-icon>
        </a>
      </div>

      <div class="mt-8">
        <app-faq-accordion [items]="faqItems" />
      </div>
    </section>
  `,
})
export class HomePage implements OnInit {
  private readonly seo = inject(Seo);

  readonly taobaoUrl = TAOBAO_PRODUCT_URL;
  readonly remoteServiceUrl = TAOBAO_REMOTE_SERVICE_URL;
  readonly heroMetrics = HERO_METRICS;
  readonly beginnerSteps = BEGINNER_STEPS;
  readonly faqItems = FAQ_ITEMS;
  readonly heroImageFailed = signal(false);

  ngOnInit(): void {
    this.seo.updatePageMeta({
      title: 'Syncthing 中文版下载与中文教程 | 全平台中文私有文件同步指南',
      description:
        'Syncthing 中文版零基础教程：提供全中文界面多端软件整合包与中文图文避坑指南，支持 Windows、macOS、Linux、Android、iOS 与群晖 NAS 同步，支持淘宝购买中文软件包与付费远程安装。',
      keywords:
        'Syncthing中文, Syncthing中文版, Syncthing中文教程, Syncthing中文下载, Syncthing汉化版, SyncTrayzor中文版, Syncthing跨平台, Syncthing远程安装',
      path: '/',
    });
  }

  onHeroImageError(): void {
    this.heroImageFailed.set(true);
  }
}
