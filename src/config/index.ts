import { Github, Twitter } from 'lucide-react';

export const siteConfig = {
  siteName: 'minasehiro',
  domain: 'https://minasehiro.art',
  meta: {
    favicon: '/images/minasehiro.png',
    title: 'minasehiro',
    slogan: '遠きに行くには必ず邇きよりす',
    description: 'Apps & Portfolio - プログラミング、写真',
  },
  googleAnalyticsId: 'G-R4YW72GP8T',
  social: [
    {
      icon: Twitter,
      label: 'X',
      link: 'https://x.com/minase_hiro_',
    },
    {
      icon: Github,
      label: 'GitHub',
      link: 'https://github.com/minasehiro',
    },
  ],
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Engineer', href: '/engineer' },
    { label: 'Photographer', href: '/photographer' },
    { label: 'Contact', href: '/contact' },
  ],
};
