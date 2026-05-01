import type { Metadata } from 'next';
import ServicesPageContent from './ServicesPageContent';

export const metadata: Metadata = {
  title: 'Solar Services',
  description:
    'Explore MFour Solar\'s complete range of services: solar panel installation, maintenance, and expert consultation.',
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
