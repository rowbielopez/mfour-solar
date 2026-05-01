'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Phone, Star, CheckCircle } from 'lucide-react';

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
      {/* Grid pattern overlay */}
      {dark && <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />}

      {/* Decorative blobs */}
      {dark && (
        <>
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-solar-500/8 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-green-600/10 rounded-full blur-[60px] pointer-events-none" />
        </>
      )}

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Star rating */}
          <div className="flex items-center justify-center gap-1 mb-5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${dark ? 'fill-solar-500 text-solar-500' : 'fill-green-950/30 text-green-950/30'}`}
              />
            ))}
            <span className={`text-xs font-medium ml-1.5 ${dark ? 'text-green-100/50' : 'text-green-950/50'}`}>
              4.9 / 5.0 — 200+ reviews
            </span>
          </div>

          <h2 className={`font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 leading-tight text-balance ${
            dark ? 'text-white' : 'text-green-950'
          }`}>
            {heading}
          </h2>

          <p className={`text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed ${
            dark ? 'text-green-100/65' : 'text-green-950/65'
          }`}>
            {subtext}
          </p>

          {/* Trust checklist */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-10">
            {trustItems.map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle className={`w-3.5 h-3.5 flex-shrink-0 ${dark ? 'text-solar-500' : 'text-green-950/70'}`} />
                <span className={`text-xs font-medium ${dark ? 'text-green-100/60' : 'text-green-950/60'}`}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/contact"
              className={`group inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 text-base ${
                dark
                  ? 'bg-solar-500 hover:bg-solar-400 text-green-950 hover:shadow-glow-lg'
                  : 'bg-green-950 hover:bg-green-900 text-white'
              }`}
            >
              Get a Free Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+639159717213"
              className={`inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-full border-2 transition-all duration-200 hover:-translate-y-0.5 text-base ${
                dark
                  ? 'border-white/15 text-white hover:bg-white/8 hover:border-white/25'
                  : 'border-green-950/25 text-green-950 hover:bg-green-950/8'
              }`}
            >
              <Phone className="w-4 h-4" />
              0915-971-7213
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
