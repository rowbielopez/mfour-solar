'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { services } from '@/lib/data';

export default function ServicesSection() {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-14"
        >
          <div>
            <span className="eyebrow">What We Do</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-green-950 leading-tight text-balance">
              End-to-End Solar Solutions
            </h2>
            <p className="text-gray-500 mt-3 max-w-md leading-relaxed">
              From your first consultation to decades of clean power, we handle every step with precision and care.
            </p>
          </div>
          <Link
            href="/services"
            className="flex-shrink-0 flex items-center gap-2 text-sm font-semibold text-green-950 hover:text-solar-600 transition-colors group"
          >
            All services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.id} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
