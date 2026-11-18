import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {FaqAccordion} from '../components/faq-accordion';
import {TaobaoCtaCard} from '../components/taobao-cta-card';
import {
  FAQ_ITEMS,
  TAOBAO_PRODUCT_URL,
  TAOBAO_REMOTE_SERVICE_URL,
} from '../data/syncthing-content';
import {Seo} from '../services/seo';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-faq-page',
  imports: [MatIconModule, FaqAccordion, TaobaoCtaCard],
  template: `
    <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div class="max-w-3xl">
        <p class="text-xs font-semibold text-blue-700">服务说明与常见问答</p>
        <h1 class="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          购买须知、付费远程安装服务与高频问题解答
        </h1>
        <p class="mt-4 text-base leading-relaxed text-slate-600">
          为了保障每一位用户的体验，我们在下单前把商品包含内容、远程服务收费规则以及常见的网络与数据安全问题全部透明列明。
        </p>
      </div>

      <!-- Clear Service Boundary Comparison -->
      <section class="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2" aria-label="商品与远程服务对比">
        <div class="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div>
            <p class="text-xs font-medium text-slate-500">基础下单选项</p>
            <h2 class="mt-2 font-display text-xl font-bold text-slate-950">
              全平台软件整合包 + 小白图文教程
            </h2>
            <p class="mt-2 text-sm leading-relaxed text-slate-600">
              适合具备基本电脑点击安装能力的用户。拍下后直接发货全套软件安装包与中文排错手册，自行按教程 10 分钟内完成部署。
            </p>
            <ul class="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-700">
              <li>· Windows 中文托盘免黑框版 + 开机自启设置</li>
              <li>· macOS / Linux / Android 稳定端对应安装文件</li>
              <li>· NAS Docker Compose 标准模板与权限图解</li>
              <li>· 常见垃圾文件忽略规则与版本回收站推荐参数</li>
            </ul>
          </div>
          <div class="mt-6 border-t border-slate-100 pt-5">
            <a
              [href]="taobaoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 whitespace-nowrap"
            >
              <span>淘宝拍下软件整合包</span>
              <mat-icon class="!text-[16px] !h-4 !w-4 leading-4" aria-hidden="true">arrow_outward</mat-icon>
            </a>
          </div>
        </div>

        <div class="flex flex-col justify-between rounded-2xl border border-blue-200 bg-blue-50/40 p-6 sm:p-8">
          <div>
            <p class="text-xs font-semibold text-blue-700">额外收费增值选项</p>
            <h2 class="mt-2 font-display text-xl font-bold text-slate-950">
              工程师一对一远程安装调试服务（另外收费）
            </h2>
            <p class="mt-2 text-sm leading-relaxed text-slate-700">
              基础软件价格不含远程安装。若您不想自己排查防火墙、权限报错或跨网连接，请点击下方专属链接加购远程服务，由技术工程师远程桌面一对一部署到好。
            </p>
            <ul class="mt-5 space-y-2 border-t border-blue-200/70 pt-4 text-sm text-slate-800">
              <li>· 远程完成电脑端/NAS端安装与后台自启调优</li>
              <li>· 处理 Windows 防火墙拦截与杀毒软件误报放行</li>
              <li>· 排查 NAS 目录 PUID/PGID 无写入权限报错</li>
              <li>· 现场配对手机端并测试文件同步成功后交付</li>
            </ul>
          </div>
          <div class="mt-6 border-t border-blue-200/70 pt-5">
            <a
              [href]="remoteServiceUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 whitespace-nowrap"
            >
              <span>淘宝拍下远程安装服务</span>
              <mat-icon class="!text-[16px] !h-4 !w-4 leading-4" aria-hidden="true">support_agent</mat-icon>
            </a>
          </div>
        </div>
      </section>

      <div class="mt-12">
        <app-faq-accordion [items]="faqItems" />
      </div>

      <div class="mt-16">
        <app-taobao-cta-card />
      </div>
    </div>
  `,
})
export class FaqPage implements OnInit {
  private readonly seo = inject(Seo);
  readonly faqItems = FAQ_ITEMS;
  readonly taobaoUrl = TAOBAO_PRODUCT_URL;
  readonly remoteServiceUrl = TAOBAO_REMOTE_SERVICE_URL;

  ngOnInit(): void {
    this.seo.updatePageMeta({
      title: 'Syncthing 中文版购买须知、远程安装服务与中文答疑 | SyncGuide',
      description:
        '了解 Syncthing 中文版全平台软件整合包内容、额外收费的一对一中文远程安装调试服务标准，以及同步冲突保护与中文常见问题解答。',
      keywords: 'Syncthing中文版, Syncthing中文远程安装, Syncthing中文常见问题, Syncthing收费, Syncthing中文答疑',
      path: '/faq',
    });
  }
}
