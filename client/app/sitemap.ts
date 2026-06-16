import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://infinitygreenenergy.com';
  const routes = [
    '',
    '/services',
    '/calculator',
    '/contact',
    '/dashboard',
    '/about',
    '/blog',
    '/case-studies',
    '/faqs',
    '/industries',
    '/guides',
    '/knowledge-center',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
