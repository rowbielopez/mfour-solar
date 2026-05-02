'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Leaf, Star, Zap, Clock, Shield } from 'lucide-react';
import { stats } from '@/lib/data';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-green-950">
      {/* Layered background */}
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/60 via-green-950 to-green-950" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-solar-500/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-800/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-green-900/30 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left column — copy */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="text-white max-w-xl lg:max-w-none"
          >
            {/* Certification badge */}
            <motion.div variants={fadeUp} className="mb-7">
              <span className="inline-flex items-center gap-2 bg-solar-500/15 border border-solar-500/25 rounded-full px-4 py-1.5 text-solar-400 text-xs font-semibold tracking-wide">
                <Leaf className="w-3.5 h-3.5 flex-shrink-0" />
                DOE & ERC Certified Solar Integrator — Philippines
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-display font-bold text-[2.4rem] sm:text-5xl lg:text-[3.5rem] leading-[1.08] tracking-tight mb-5 text-balance"
            >
              Power Your Home with{' '}
              <span className="relative inline-block">
                <span className="text-solar-500">Clean, Cost-Saving</span>
                <svg
                  className="absolute -bottom-1.5 left-0 w-full"
                  viewBox="0 0 280 10"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 7.5C46 2.5 92 1 140 4.5C188 8 234 9.5 278 6.5"
                    stroke="#FFC300"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              Solar Energy
            </motion.h1>

            {/* Value prop */}
            <motion.p
              variants={fadeUp}
              className="text-green-100/65 text-base sm:text-lg leading-relaxed mb-8 max-w-md"
            >
              Reduce your electricity bill by up to{' '}
              <span className="text-white font-semibold">80%</span> with a system that pays for itself in under 6 years — backed by a{' '}
              <span className="text-white font-semibold">10-year workmanship warranty</span> and 25-year panel performance guarantee.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/contact"
                className="btn-primary text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 group"
              >
                Get Free Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/projects"
                className="btn-secondary text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5"
              >
                View Our Work
              </Link>
            </motion.div>

            {/* Social proof row */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-10">
              <div className="flex -space-x-1.5">
                {['MS', 'RR', 'CM', 'JV'].map((init) => (
                  <div
                    key={init}
                    className="w-7 h-7 rounded-full bg-gradient-to-br from-solar-400 to-solar-600 border-2 border-green-950 flex items-center justify-center text-green-950 text-2xs font-bold"
                  >
                    {init}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-solar-400 text-solar-400" />
                  ))}
                </div>
                <p className="text-green-100/50 text-xs">
                  Trusted by <span className="text-white font-medium">500+</span> Filipino families
                </p>
              </div>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display font-bold text-xl sm:text-2xl text-solar-400 leading-none">
                    {stat.value}
                  </p>
                  <p className="text-green-100/40 text-xs mt-1.5 leading-snug">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column — installation PNG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="relative h-[340px] sm:h-[420px] lg:h-[560px] w-full"
          >
            {/* Hover wrapper — grows and glows on hover */}
            <motion.div
              className="relative h-full w-full"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              {/* Glow background — solar amber */}
              <motion.div
                variants={{
                  rest: { opacity: 0.45, scale: 1 },
                  hover: { opacity: 1, scale: 1.12 },
                }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-solar-500/20 blur-[70px] pointer-events-none"
              />
              {/* Secondary glow — green tint */}
              <motion.div
                variants={{
                  rest: { opacity: 0.2 },
                  hover: { opacity: 0.55 },
                }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
                className="absolute inset-8 rounded-full bg-green-600/15 blur-[50px] pointer-events-none"
              />

              {/* PNG image — no border, no clip, contains full image */}
              <motion.div
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.04 },
                }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full"
              >
                <Image
                  src="/hero-solar.png"
                  alt="Solar panels installed on a residential rooftop in the Philippines"
                  fill
                  priority
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </motion.div>

            {/* Stats overlay pills — pinned to bottom, outside the grow wrapper */}
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 pointer-events-none">
              {[
                { icon: Zap, value: '80%', label: 'Bill Reduction' },
                { icon: Clock, value: '5.5 yrs', label: 'Avg. Payback' },
                { icon: Shield, value: '25 yrs', label: 'Panel Warranty' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="bg-white/10 backdrop-blur-md rounded-xl px-3 py-2.5 border border-white/15 text-center">
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <Icon className="w-3 h-3 text-solar-400 flex-shrink-0" />
                    <p className="text-white font-bold text-sm leading-none">{value}</p>
                  </div>
                  <p className="text-white/60 text-[10px] leading-tight">{label}</p>
                </div>
              ))}
            </div>

            {/* Top-left: certified badge */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-3 py-1.5 pointer-events-none">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-white text-xs font-medium">DOE & ERC Certified</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/30 pointer-events-none"
      >
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
