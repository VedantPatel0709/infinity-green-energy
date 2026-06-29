import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industry Network | Infinity Green Energy',
  description: 'Connect with renewable energy producers (IPPs) and commercial & industrial (C&I) consumers across India via our open access network.',
  alternates: {
    canonical: 'https://infinitygreenenergy.in/industry-network',
  },
  openGraph: {
    title: 'Industry Network | Infinity Green Energy',
    description: 'Connect with renewable energy producers (IPPs) and commercial & industrial (C&I) consumers across India via our open access network.',
    url: 'https://infinitygreenenergy.in/industry-network',
    type: 'website',
  },
};

export default function IndustryNetworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
