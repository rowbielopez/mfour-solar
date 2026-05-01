'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Zap, Calendar, Tag } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/lib/data';
import CTASection from '@/components/sections/CTASection';
import Badge from '@/components/ui/Badge';

type Project = (typeof projects)[0];

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
              Over 500 solar installations completed across Luzon, Visayas, and Mindanao.
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

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-60">
                <Image
                  src={modal.image}
                  alt={modal.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setModal(null)}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-xl text-green-950 mb-1">{modal.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{modal.location}</span>
                  <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-solar-500" />{modal.capacity}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{modal.year}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{modal.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  <Tag className="w-4 h-4 text-gray-300 self-center" />
                  {modal.tags.map((tag) => (
                    <Badge key={tag} variant="green">{tag}</Badge>
                  ))}
                </div>
                <a
                  href="/contact"
                  className="btn-primary w-full justify-center text-sm"
                >
                  Get a Similar System Quote
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTASection
        heading="Start Your Solar Project"
        subtext="Join hundreds of Filipino homes and businesses generating their own clean energy."
      />
    </>
  );
}
