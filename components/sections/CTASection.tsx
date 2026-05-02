'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Phone, CheckCircle } from 'lucide-react';

interface CTASectionProps {
  heading?: string;
  subtext?: string;
  dark?: boolean;
}

const trustItems = [
  'Free site assessment',
  'No obligation quote',
  'Response within 24 hours',
];

export default function CTASection({
  heading = 'Ready to Go Solar?',
  subtext = 'Join 500+ Filipino homeowners and businesses who cut their electricity bills by up to 80%.',
  dark = true,
}: CTASectionProps) {
  return (
    <section className={`relative py-20 sm:py-24 overflow-hidden ${dark ? 'bg-mesh' : 'bg-solar-500'}`}>
      {dark && <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />}
      {dark && (
        <>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-solar-500/8 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-green-600/10 rounded-full blur-[70px] pointer-events-none" />
        </>
      )}

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-20 items-center">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Urgency */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 border border-solar-500/30 bg-solar-500/10">
              <span className="w-2 h-2 rounded-full bg-solar-500 animate-pulse flex-shrink-0" />
              <span className={`text-xs font-semibold tracking-wide ${dark ? 'text-solar-400' : 'text-green-950/80'}`}>
                Limited slots available this month
              </span>
            </div>

            <h2 className={`font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-5 leading-[1.06] text-balance ${
              dark ? 'text-white' : 'text-green-950'
            }`}>
              {heading}
            </h2>

            <p className={`text-base sm:text-lg mb-8 max-w-xl leading-relaxed ${
              dark ? 'text-green-100/65' : 'text-green-950/65'
            }`}>
              {subtext}
            </p>

            {/* Trust checklist */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {trustItems.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className={`w-4 h-4 flex-shrink-0 ${dark ? 'text-solar-500' : 'text-green-950/70'}`} />
                  <span className={`text-sm font-medium ${dark ? 'text-green-100/70' : 'text-green-950/70'}`}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — CTA card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:min-w-[300px]"
          >
            <div className={`rounded-3xl p-8 flex flex-col gap-4 ${dark ? 'bg-white/6 border border-white/10 backdrop-blur-sm' : 'bg-green-950/10 border border-green-950/15'}`}>
              <Link
                href="/contact"
                className="group flex items-center justify-center gap-2.5 font-bold px-7 py-4 rounded-2xl text-base transition-all duration-200 hover:-translate-y-0.5 bg-solar-500 hover:bg-solar-400 text-green-950 shadow-glow hover:shadow-glow-lg"
              >
                Get a Free Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+639159717213"
                className={`flex items-center justify-center gap-2.5 font-semibold px-7 py-4 rounded-2xl text-base border-2 transition-all duration-200 hover:-translate-y-0.5 ${
                  dark
                    ? 'border-white/20 text-white hover:bg-white/8 hover:border-white/30'
                    : 'border-green-950/25 text-green-950 hover:bg-green-950/8'
                }`}
              >
                <Phone className="w-4 h-4" />
                0915-971-7213
              </a>
              <p className={`text-xs text-center mt-1 ${dark ? 'text-green-100/35' : 'text-green-950/40'}`}>
                No commitment required · Free consultation
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

