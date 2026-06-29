import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Renewable Energy Insights | Infinity Green Energy',
  description: 'Market briefs, legislative analyses, and practical guides detailing industrial energy procurement and optimization.',
  alternates: {
    canonical: 'https://infinitygreenenergy.in/insights',
  },
  openGraph: {
    title: 'Renewable Energy Insights | Infinity Green Energy',
    description: 'Market briefs, legislative analyses, and practical guides detailing industrial energy procurement and optimization.',
    url: 'https://infinitygreenenergy.in/insights',
    type: 'website',
  },
};

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
