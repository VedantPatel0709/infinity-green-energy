import React from 'react';
import NotFound from '../not-found';

export const metadata = {
  title: 'Page Not Found | Infinity Green Energy',
  description: 'The requested route does not exist. Return to the main portal or contact support.',
};

export default function Explicit404Page() {
  return <NotFound />;
}
