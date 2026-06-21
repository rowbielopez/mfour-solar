'use client';

import { motion } from 'framer-motion';
import { Award, Shield, Users, TrendingUp, Headphones, Leaf, Battery } from 'lucide-react';
import { whyChooseUs } from '@/lib/data';

const iconMap = { Award, Shield, Users, TrendingUp, Headphones, Leaf, Battery };

const bars = [
  { label: 'Client Satisfaction', value: 98, color: 'from-solar-500 to-solar-400' },
  { label: 'System Uptime', value: 99.2, color: 'from-green-700 to-green-500' },
  { label: 'On-Time Project Delivery', value: 95, color: 'from-green-600 to-green-400' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle dot background */}
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Left — narrative + metrics */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow">Why MFour Solar</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-green-950 mb-4 leading-tight text-balance">
              The Philippines' Most Trusted Solar Integrator
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 max-w-md">
              Over 100 installations completed and 10 years of solar engineering experience.
              We combine technical precision with genuine care for every client's investment.
            </p>

            {/* Performance bars */}
            <div className="space-y-5 mb-8">
              {bars.map((bar, i) => (
                <div key={bar.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700">{bar.label}</span>
                    <span className="font-bold text-green-950 tabular-nums">{bar.value}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.12 }}
                      className={`h-full bg-gradient-to-r ${bar.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Highlight callout */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative bg-green-950 rounded-2xl p-5 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-solar-500/10 rounded-full blur-2xl" />
              <div className="relative flex items-center gap-4">
                <div className="flex-shrink-0 text-center bg-solar-500/15 rounded-xl px-4 py-3">
                  <p className="font-display font-bold text-3xl text-solar-500 leading-none">2–5</p>
                  <p className="text-solar-400/70 text-xs mt-0.5">yrs</p>
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">Typical Payback Period</p>
                  <p className="text-green-100/60 text-xs mt-0.5 leading-relaxed">
                    Most clients recover their investment within 2 to 5 years — then keep saving for years more.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — feature grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {whyChooseUs.map((item, i) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Award;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -3 }}
                  className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-green-950/10 hover:bg-white hover:shadow-card transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-solar-500/10 rounded-xl flex items-center justify-center mb-3.5">
                    <Icon className="w-5 h-5 text-solar-600" />
                  </div>
                  <h3 className="font-semibold text-green-950 text-sm mb-1.5 leading-snug">{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
