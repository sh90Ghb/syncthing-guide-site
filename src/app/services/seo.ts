import {DOCUMENT} from '@angular/common';
import {inject, Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

export interface PageSeoConfig {
  title: string;
  description: string;
  keywords?: string;
  path: string;
}

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

    const origin = this.doc.location?.origin || '';
    const canonicalUrl = origin ? `${origin}${config.path}` : config.path;
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
