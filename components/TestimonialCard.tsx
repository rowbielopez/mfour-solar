'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  content: string;
  rating: number;
  avatar: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export default function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col h-full"
    >
      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-solar-500 text-solar-500" />
        ))}
      </div>

      {/* Quote text */}
      <div className="relative flex-1 mb-5">
        <Quote className="absolute -top-1 -left-1 w-5 h-5 text-solar-500/20 rotate-180" />
        <p className="text-gray-600 text-sm leading-relaxed pl-3">
          {testimonial.content}
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
        <div className="w-10 h-10 bg-green-950 rounded-xl flex items-center justify-center text-white font-bold text-xs font-display flex-shrink-0">
          {testimonial.avatar}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-green-950 text-sm truncate">{testimonial.name}</p>
          <p className="text-gray-400 text-xs truncate">{testimonial.role} · {testimonial.location}</p>
        </div>
      </div>
    </motion.div>
  );
}
