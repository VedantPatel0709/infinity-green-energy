import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://infinitygreenenergy.com';
  const routes = [
    '',
    '/solutions',
    '/calculator',
    '/about',
    '/about/team',
    '/case-studies',
    '/faqs',
    '/industry-network',
    '/insights',
    '/knowledge-center',
    '/request-proposal',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
