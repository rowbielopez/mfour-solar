'use client';

import { motion } from 'framer-motion';
import { Shield, Award, Zap, Star } from 'lucide-react';

const items = [
  { icon: Star,   text: '4.9/5 Rating',        sub: '200+ verified reviews' },
  { icon: Award,  text: 'DOE & ERC Certified',  sub: 'Philippines licensed'  },
  { icon: Shield, text: '10-Year Warranty',     sub: 'Workmanship guarantee' },
  { icon: Zap,    text: '500+ Installations',   sub: 'Across the Philippines'},
];

export default function TrustBar() {
  return (
    <div className="bg-white border-b border-gray-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, text, sub }, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3.5 py-5 px-4 sm:px-6 border-r border-gray-100 last:border-r-0 even:border-r-0 lg:even:border-r"
            >
              <div className="w-9 h-9 rounded-xl bg-green-950 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-solar-500" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-green-950 leading-tight truncate">{text}</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
