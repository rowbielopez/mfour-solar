'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Zap, Eye } from 'lucide-react';
import Badge from '@/components/ui/Badge';

interface Project {
  id: number;
  title: string;
  location: string;
  type: string;
  capacity: string;
  description: string;
  image: string;
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
      <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-card hover:shadow-card-hover transition-all duration-400 hover:-translate-y-1">

        {/* Image */}
        <div className="relative h-52 sm:h-56 overflow-hidden bg-gray-100">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-[1.06] transition-transform duration-600 ease-smooth"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Gradient overlay — stronger at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-green-950/70 via-green-950/20 to-transparent" />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-green-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm font-semibold text-green-950 shadow-lg"
            >
              <Eye className="w-4 h-4" />
              View Details
            </motion.div>
          </div>

          {/* Bottom-left: capacity badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-semibold bg-green-950/60 backdrop-blur-sm rounded-full px-2.5 py-1">
            <Zap className="w-3 h-3 text-solar-400" />
            {project.capacity}
          </div>

          {/* Top-right: type badge */}
          <div className="absolute top-3 right-3">
            <Badge variant="yellow">{project.type}</Badge>
          </div>

          {/* Top-left: year */}
          <div className="absolute top-3 left-3 text-xs text-white/60 font-medium">
            {project.year}
          </div>
        </div>

        {/* Card body */}
        <div className="p-5">
          <h3 className="font-display font-semibold text-[0.95rem] text-green-950 mb-1.5 leading-snug">
            {project.title}
          </h3>
          <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            {project.location}
          </div>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="gray">{tag}</Badge>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
