'use client';

import { motion } from 'framer-motion';
import TestimonialCard from '@/components/TestimonialCard';
import { testimonials } from '@/lib/data';

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-solar-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Client Stories
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-green-950 mb-4">
            Real Savings. Real Clients.
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Hear from Filipino homeowners and business owners who made the switch to solar.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
