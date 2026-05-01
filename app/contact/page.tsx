import type { Metadata } from 'next';
import ContactPageContent from './ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with MFour Solar for a free consultation or quote. We serve all major cities across the Philippines.',
};

export default function ContactPage() {
  return <ContactPageContent />;
}
