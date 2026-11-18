import {DOCUMENT} from '@angular/common';
import {inject, Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

export interface PageSeoConfig {
  title: string;
  description: string;
  keywords?: string;
  path: string;
}

const PRODUCTION_ORIGIN = 'https://syncthing-guide-site.formulacalckit.com';

@Injectable({
  providedIn: 'root',
})
export class Seo {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  updatePageMeta(config: PageSeoConfig): void {
    this.titleService.setTitle(config.title);
    this.metaService.updateTag({name: 'description', content: config.description});
    if (config.keywords) {
      this.metaService.updateTag({name: 'keywords', content: config.keywords});
    }
    this.metaService.updateTag({property: 'og:title', content: config.title});
    this.metaService.updateTag({property: 'og:description', content: config.description});
    this.metaService.updateTag({name: 'twitter:title', content: config.title});
    this.metaService.updateTag({name: 'twitter:description', content: config.description});

    const rawOrigin = this.doc.location?.origin || '';
    const isLocalhost =
      !rawOrigin ||
      rawOrigin.includes('localhost') ||
      rawOrigin.includes('127.0.0.1');
    const origin = isLocalhost ? PRODUCTION_ORIGIN : rawOrigin;
    const normalizedPath = config.path === '/' ? '/' : config.path;
    const canonicalUrl = `${origin}${normalizedPath}`;
    this.metaService.updateTag({property: 'og:url', content: canonicalUrl});

    let linkEl = this.doc.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkEl) {
      linkEl = this.doc.createElement('link');
      linkEl.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(linkEl);
    }
    linkEl.setAttribute('href', canonicalUrl);
  }
}
