import type { Metadata } from 'next';
import AboutPageContent from './AboutPageContent';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about MFour Solar — our story, mission, and the team driving clean energy adoption across the Philippines.',
};

export default function AboutPage() {
  return <AboutPageContent />;
}
