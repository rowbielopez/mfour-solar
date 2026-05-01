'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/lib/data';

export default function FeaturedProjects() {
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
            <span className="inline-block text-solar-600 font-semibold text-sm uppercase tracking-widest mb-3">Our Work</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-green-950">
              Featured Installations
            </h2>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-2 text-sm font-semibold text-green-950 hover:text-solar-600 transition-colors group whitespace-nowrap"
          >
            View all projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
