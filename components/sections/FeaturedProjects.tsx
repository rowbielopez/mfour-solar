'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProjectCard, { type Project } from '@/components/ProjectCard';
import ProjectModal from '@/components/sections/ProjectModal';
import { projects } from '@/lib/data';

export default function FeaturedProjects() {
  const [modal, setModal] = useState<Project | null>(null);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14"
        >
          <div>
            <span className="eyebrow">Our Work</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-green-950">
              Featured Installations
            </h2>
            <p className="text-gray-500 mt-3 max-w-md leading-relaxed">
              Real projects, real results — from Luzon to Mindanao.
            </p>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-2 text-sm font-semibold text-green-950 hover:text-solar-600 transition-colors group whitespace-nowrap flex-shrink-0"
          >
            View all projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onClick={setModal} />
          ))}
        </div>
      </div>

      <ProjectModal project={modal} onClose={() => setModal(null)} />
    </section>
  );
}
