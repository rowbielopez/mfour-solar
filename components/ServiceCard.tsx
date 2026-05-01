'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap, Settings, ClipboardList } from 'lucide-react';

const iconMap = { Zap, Settings, ClipboardList };

interface ServiceCardProps {
  id: string;
  icon: string;
  title: string;
  shortDesc: string;
  index?: number;
}

const cardNumbers = ['01', '02', '03'];

export default function ServiceCard({ id, icon, title, shortDesc, index = 0 }: ServiceCardProps) {
  const Icon = iconMap[icon as keyof typeof iconMap] ?? Zap;
  const num = cardNumbers[index] ?? '0' + (index + 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      <Link href={`/services#${id}`} className="block h-full">
        <div className="group relative bg-white rounded-2xl p-7 border border-gray-100 shadow-card hover:shadow-card-hover hover:border-green-950/10 transition-all duration-300 h-full flex flex-col overflow-hidden">

          {/* Top row: icon + number */}
          <div className="flex items-start justify-between mb-6">
            <motion.div
              className="w-12 h-12 bg-green-950/5 group-hover:bg-solar-500/12 rounded-xl flex items-center justify-center transition-colors duration-300"
              whileHover={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-6 h-6 text-green-950 group-hover:text-solar-600 transition-colors duration-300" />
            </motion.div>
            <span className="font-display font-bold text-3xl text-gray-100 group-hover:text-solar-500/20 transition-colors duration-300 select-none leading-none">
              {num}
            </span>
          </div>

          {/* Content */}
          <h3 className="font-display font-semibold text-[1.05rem] text-green-950 mb-2.5 leading-snug">
            {title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed flex-1">
            {shortDesc}
          </p>

          {/* CTA row */}
          <div className="flex items-center gap-2 mt-6 text-sm font-semibold text-gray-400 group-hover:text-solar-600 transition-colors duration-300">
            Learn more
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-solar-500/0 via-solar-500 to-solar-500/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
        </div>
      </Link>
    </motion.div>
  );
}
