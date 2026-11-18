import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page').then((m) => m.HomePage),
  },
  {
    path: 'platforms',
    loadComponent: () =>
      import('./pages/platforms-page').then((m) => m.PlatformsPage),
  },
  {
    path: 'tutorial',
    loadComponent: () =>
      import('./pages/tutorial-page').then((m) => m.TutorialPage),
  },
  {
    path: 'faq',
    loadComponent: () =>
      import('./pages/faq-page').then((m) => m.FaqPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
