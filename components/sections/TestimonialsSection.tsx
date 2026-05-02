'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '@/lib/data';

const AUTOPLAY_MS = 5000;

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((next: number, direction: number) => {
    setDir(direction);
    setActive((next + testimonials.length) % testimonials.length);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => go(active + 1, 1), AUTOPLAY_MS);
  }, [active, go]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [resetTimer]);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  const t = testimonials[active];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="eyebrow">Client Stories</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-green-950 mb-4">
            Real Savings. Real Clients.
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
            Hear from Filipino homeowners and businesses who made the switch.
          </p>
        </motion.div>

        {/* Carousel layout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid lg:grid-cols-[1fr_2fr_1fr] gap-4 lg:gap-6 items-center"
        >
          {/* Prev card — desktop only */}
          <div className="hidden lg:block">
            <div
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100 cursor-pointer hover:border-green-950/10 transition-all duration-300 opacity-50 hover:opacity-70"
              onClick={() => { go(active - 1, -1); resetTimer(); }}
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(testimonials[(active - 1 + testimonials.length) % testimonials.length].rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-solar-500 text-solar-500" />
                ))}
              </div>
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                {testimonials[(active - 1 + testimonials.length) % testimonials.length].content}
              </p>
              <p className="mt-4 text-xs font-semibold text-gray-400">
                {testimonials[(active - 1 + testimonials.length) % testimonials.length].name}
              </p>
            </div>
          </div>

          {/* Active card */}
          <div className="relative overflow-hidden">
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={active}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-card-hover relative overflow-hidden"
              >
                {/* Large decorative quote */}
                <Quote className="absolute top-6 right-8 w-16 h-16 text-solar-500/8 rotate-180" />

                <div className="flex gap-1 mb-5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-solar-500 text-solar-500" />
                  ))}
                </div>

                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8 relative z-10">
                  "{t.content}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-950 rounded-2xl flex items-center justify-center text-white font-bold text-sm font-display flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-green-950">{t.name}</p>
                    <p className="text-gray-400 text-sm">{t.role} · {t.location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next card — desktop only */}
          <div className="hidden lg:block">
            <div
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100 cursor-pointer hover:border-green-950/10 transition-all duration-300 opacity-50 hover:opacity-70"
              onClick={() => { go(active + 1, 1); resetTimer(); }}
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(testimonials[(active + 1) % testimonials.length].rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-solar-500 text-solar-500" />
                ))}
              </div>
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                {testimonials[(active + 1) % testimonials.length].content}
              </p>
              <p className="mt-4 text-xs font-semibold text-gray-400">
                {testimonials[(active + 1) % testimonials.length].name}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={() => { go(active - 1, -1); resetTimer(); }}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-green-950 hover:text-green-950 transition-all duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { go(i, i > active ? 1 : -1); resetTimer(); }}
                className="transition-all duration-300"
                aria-label={`Go to testimonial ${i + 1}`}
              >
                <span className={`block rounded-full transition-all duration-300 ${
                  i === active
                    ? 'w-6 h-2 bg-green-950'
                    : 'w-2 h-2 bg-gray-200 hover:bg-gray-300'
                }`} />
              </button>
            ))}
          </div>

          <button
            onClick={() => { go(active + 1, 1); resetTimer(); }}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-green-950 hover:text-green-950 transition-all duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Trust line */}
        <p className="text-center text-gray-400 text-sm mt-8">
          Rated <span className="text-green-950 font-semibold">4.9 / 5.0</span> across{' '}
          <span className="text-green-950 font-semibold">200+ verified reviews</span>
        </p>
      </div>
    </section>
  );
}

