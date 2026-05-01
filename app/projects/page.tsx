import type { Metadata } from 'next';
import ProjectsPageContent from './ProjectsPageContent';

export const metadata: Metadata = {
  title: 'Solar Projects',
  description:
    'Browse MFour Solar\'s portfolio of completed solar installations across the Philippines — residential, commercial, and industrial.',
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
