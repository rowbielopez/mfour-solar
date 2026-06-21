'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard, { type Project } from '@/components/ProjectCard';
import ProjectModal from '@/components/sections/ProjectModal';
import { projects } from '@/lib/data';
import CTASection from '@/components/sections/CTASection';

const filterOptions = ['All', 'Residential', 'Commercial', 'Industrial', 'Institutional', 'Agriculture'];

export default function ProjectsPageContent() {
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState<Project | null>(null);

  const filtered =
    filter === 'All' ? projects : projects.filter((p) => p.type === filter);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-green-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-block text-solar-400 font-semibold text-sm uppercase tracking-widest mb-4">
              Portfolio
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl leading-tight mb-5">
              Real Installations. Real Results.
            </h1>
            <p className="text-green-100/70 text-lg">
              Over 100 solar installations completed across Luzon, Visayas, and Mindanao.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12">
            {filterOptions.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-green-950 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={setModal}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-gray-400 py-20">No projects in this category yet.</p>
          )}
        </div>
      </section>

      {/* Project detail modal with photo gallery */}
      <ProjectModal project={modal} onClose={() => setModal(null)} />

      <CTASection
        heading="Start Your Solar Project"
        subtext="Join hundreds of Filipino homes and businesses generating their own clean energy."
      />
    </>
  );
}
