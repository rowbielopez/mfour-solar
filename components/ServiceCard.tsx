'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap, Settings, ClipboardList, CheckCircle } from 'lucide-react';
import { services } from '@/lib/data';

const iconMap = { Zap, Settings, ClipboardList };

// Map each service id to its top 3 benefits pulled from data
const benefitsMap: Record<string, string[]> = {
  installation: ['Up to 80% bill reduction', '12-year panel warranty', 'Remote monitoring included'],
  maintenance: ['Priority 24-hr response', 'Panel cleaning & testing', 'Inverter health monitoring'],
  consultation: ['Free initial consult', 'Detailed ROI projection', 'No-obligation proposal'],
};

interface ServiceCardProps {
  id: string;
  icon: string;
  title: string;
  shortDesc: string;
  index?: number;
}

export default function ServiceCard({ id, icon, title, shortDesc, index = 0 }: ServiceCardProps) {
  const Icon = iconMap[icon as keyof typeof iconMap] ?? Zap;
  const benefits = benefitsMap[id] ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/services#${id}`} className="block h-full group">
        <div className="relative bg-white rounded-3xl p-8 border border-gray-100 shadow-card hover:shadow-card-hover hover:border-green-950/8 transition-all duration-400 h-full flex flex-col overflow-hidden hover:-translate-y-1.5">

          {/* Icon */}
          <div className="mb-6">
            <div className="w-14 h-14 rounded-2xl bg-green-950 group-hover:bg-solar-500 flex items-center justify-center transition-colors duration-300 shadow-sm">
              <Icon className="w-6 h-6 text-white group-hover:text-green-950 transition-colors duration-300" />
            </div>
          </div>

          {/* Content */}
          <h3 className="font-display font-bold text-lg text-green-950 mb-2.5 leading-snug">
            {title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
            {shortDesc}
          </p>

          {/* Benefits list */}
          <ul className="space-y-2 mb-7">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                {b}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex items-center gap-2 text-sm font-semibold text-green-950 group-hover:text-solar-600 transition-colors duration-300">
            Learn more
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </div>

          {/* Corner accent */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-950/0 via-solar-500 to-green-950/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
        </div>
      </Link>
    </motion.div>
  );
}
