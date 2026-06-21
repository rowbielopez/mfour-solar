'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Zap, Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import type { Project } from '@/components/ProjectCard';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [active, setActive] = useState(0);

  // Reset the active photo whenever a new project opens.
  useEffect(() => {
    setActive(0);
  }, [project?.id]);

  // Close on Escape, lock body scroll while open.
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % project.photos.length);
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + project.photos.length) % project.photos.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl max-h-[92vh] overflow-y-auto scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gallery — main image */}
            <div className="relative aspect-[16/10] bg-gray-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={project.photos[active]}
                    alt={`${project.title} — photo ${active + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gradient for control legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none" />

              {/* Close */}
              <button
                onClick={onClose}
                aria-label="Close project details"
                className="absolute top-3 right-3 w-9 h-9 bg-black/45 hover:bg-black/65 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Prev / next (only with multiple photos) */}
              {project.photos.length > 1 && (
                <>
                  <button
                    onClick={() => setActive((i) => (i - 1 + project.photos.length) % project.photos.length)}
                    aria-label="Previous photo"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActive((i) => (i + 1) % project.photos.length)}
                    aria-label="Next photo"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Counter */}
                  <span className="absolute bottom-3 right-3 text-xs font-medium text-white bg-black/45 rounded-full px-2.5 py-1">
                    {active + 1} / {project.photos.length}
                  </span>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {project.photos.length > 1 && (
              <div className="flex gap-2 px-6 pt-4 overflow-x-auto scrollbar-hide">
                {project.photos.map((photo, i) => (
                  <button
                    key={photo + i}
                    onClick={() => setActive(i)}
                    aria-label={`View photo ${i + 1}`}
                    className={`relative h-16 w-24 flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200 ${
                      active === i ? 'ring-2 ring-solar-500 ring-offset-2' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={photo} alt="" fill className="object-cover" sizes="96px" />
                  </button>
                ))}
              </div>
            )}

            {/* Details */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-3 mb-1">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-green-950">{project.title}</h3>
                <span className="text-xs text-green-950 font-semibold bg-solar-500 rounded-full px-3 py-1 flex-shrink-0">
                  {project.type}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{project.location}</span>
                <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-solar-500" />{project.capacity}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{project.year}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{project.description}</p>
              <div className="flex flex-wrap items-center gap-1.5 mb-6">
                <Tag className="w-4 h-4 text-gray-300 self-center" />
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="green">{tag}</Badge>
                ))}
              </div>
              <a href="/contact" className="btn-primary w-full justify-center text-sm">
                Get a Similar System Quote
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
