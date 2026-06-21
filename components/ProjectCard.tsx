'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Zap, Images } from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  location: string;
  type: string;
  capacity: string;
  description: string;
  photos: string[];
  tags: string[];
  year: string;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
  onClick?: (project: Project) => void;
}

export default function ProjectCard({ project, index = 0, onClick }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
      onClick={() => onClick?.(project)}
    >
      {/* Full-bleed image card — aspect-ratio locked */}
      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 shadow-card">

        <Image
          src={project.photos[0]}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Persistent gradient — subtle at top, strong at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-950/85 via-green-950/20 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <span className="text-xs text-white/70 font-medium bg-black/20 backdrop-blur-sm rounded-full px-2.5 py-1">
            {project.year}
          </span>
          <span className="text-xs text-green-950 font-semibold bg-solar-500 rounded-full px-3 py-1">
            {project.type}
          </span>
        </div>

        {/* Photo-count affordance — signals an openable gallery */}
        {project.photos.length > 1 && (
          <span className="absolute bottom-4 right-4 z-10 flex items-center gap-1 text-xs text-white font-medium bg-black/35 backdrop-blur-sm rounded-full px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Images className="w-3 h-3" />
            {project.photos.length} photos
          </span>
        )}

        {/* Bottom info — always visible */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-display font-bold text-white text-base leading-snug mb-1">
            {project.title}
          </h3>
          <div className="flex items-center gap-1.5 text-white/60 text-xs">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            {project.location}
          </div>

          {/* Hover reveal — capacity + description */}
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 0, opacity: 0 }}
            whileHover={{ height: 'auto', opacity: 1 }}
          >
            <div className="group-hover:translate-y-0 translate-y-2 transition-transform duration-300 pt-3 border-t border-white/15 mt-3">
              <div className="flex items-center gap-1.5 text-solar-400 text-xs font-semibold mb-2">
                <Zap className="w-3 h-3" />
                {project.capacity}
              </div>
              <p className="text-white/70 text-xs leading-relaxed line-clamp-2">
                {project.description}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Hover overlay — darkens image slightly */}
        <div className="absolute inset-0 bg-green-950/0 group-hover:bg-green-950/15 transition-colors duration-400" />
      </div>
    </motion.div>
  );
}
