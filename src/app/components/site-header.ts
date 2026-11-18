import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {TAOBAO_PRODUCT_URL} from '../data/syncthing-content';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  template: `
    <header
      class="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md"
    >
      <div
        class="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8"
      >
        <!-- Zone 1: Single-element Brand Wordmark -->
        <a
          routerLink="/"
          class="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
        >
          SyncGuide 同步指南
        </a>

        <!-- Zone 2: 4 concise single-line navigation links -->
        <nav
          aria-label="主导航"
          class="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          <a
            routerLink="/"
            routerLinkActive="text-slate-950 font-semibold underline decoration-blue-700 decoration-2 underline-offset-8"
            [routerLinkActiveOptions]="{exact: true}"
            class="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-slate-950 hover:underline hover:decoration-slate-300 hover:underline-offset-8"
          >
            首页概览
          </a>
          <a
            routerLink="/platforms"
            routerLinkActive="text-slate-950 font-semibold underline decoration-blue-700 decoration-2 underline-offset-8"
            class="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-slate-950 hover:underline hover:decoration-slate-300 hover:underline-offset-8"
          >
            跨平台指南
          </a>
          <a
            routerLink="/tutorial"
            routerLinkActive="text-slate-950 font-semibold underline decoration-blue-700 decoration-2 underline-offset-8"
            class="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-slate-950 hover:underline hover:decoration-slate-300 hover:underline-offset-8"
          >
            新手教程
          </a>
          <a
            routerLink="/faq"
            routerLinkActive="text-slate-950 font-semibold underline decoration-blue-700 decoration-2 underline-offset-8"
            class="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-slate-950 hover:underline hover:decoration-slate-300 hover:underline-offset-8"
          >
            服务与问答
          </a>
        </nav>

        <!-- Zone 3: 1 Primary CTA + Mobile Menu Toggle -->
        <div class="flex items-center gap-3 shrink-0">
          <a
            [href]="taobaoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <span>淘宝店铺下单</span>
            <mat-icon class="!text-[16px] !h-4 !w-4 leading-4" aria-hidden="true">open_in_new</mat-icon>
          </a>

          <button
            type="button"
            (click)="toggleMobileMenu()"
            [attr.aria-expanded]="mobileOpen()"
            aria-label="切换导航菜单"
            class="inline-flex md:hidden items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-blue-700"
          >
            <mat-icon class="!text-[20px] !h-5 !w-5 leading-5" aria-hidden="true">
              {{ mobileOpen() ? 'close' : 'menu' }}
            </mat-icon>
          </button>
        </div>
      </div>

      @if (mobileOpen()) {
        <nav
          aria-label="移动端导航"
          class="border-t border-slate-200 bg-white px-4 py-3 md:hidden"
        >
          <div class="flex flex-col gap-1">
            <a
              routerLink="/"
              (click)="closeMobileMenu()"
              routerLinkActive="bg-slate-100 text-slate-950 font-semibold"
              [routerLinkActiveOptions]="{exact: true}"
              class="rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              首页概览
            </a>
            <a
              routerLink="/platforms"
              (click)="closeMobileMenu()"
              routerLinkActive="bg-slate-100 text-slate-950 font-semibold"
              class="rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              跨平台指南
            </a>
            <a
              routerLink="/tutorial"
              (click)="closeMobileMenu()"
              routerLinkActive="bg-slate-100 text-slate-950 font-semibold"
              class="rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              新手教程
            </a>
            <a
              routerLink="/faq"
              (click)="closeMobileMenu()"
              routerLinkActive="bg-slate-100 text-slate-950 font-semibold"
              class="rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              服务与问答
            </a>
          </div>
        </nav>
      }
    </header>
  `,
})
export class SiteHeader {
  readonly taobaoUrl = TAOBAO_PRODUCT_URL;
  readonly mobileOpen = signal(false);

  toggleMobileMenu(): void {
    this.mobileOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileOpen.set(false);
  }
}
