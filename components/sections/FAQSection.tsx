'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqs } from '@/lib/data';
import Link from 'next/link';

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-60" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="eyebrow justify-center">Common Questions</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-green-950 mb-3">
            Everything About Going Solar
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Clear answers to the questions Filipino homeowners ask most before making the switch.
          </p>
        </motion.div>

        <div className="space-y-2.5">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'bg-white border-green-950/12 shadow-card'
                    : 'bg-white border-gray-100 hover:border-gray-200'
                }`}
              >
                <button
                  className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  {/* Active indicator line */}
                  <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-full transition-all duration-300 ${
                    isOpen ? 'bg-solar-500' : 'bg-transparent'
                  }`} />

                  <span className={`font-semibold text-sm sm:text-[0.9rem] leading-relaxed transition-colors duration-200 ${
                    isOpen ? 'text-green-950' : 'text-gray-700'
                  }`}>
                    {faq.question}
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? '#FFC300' : '#F3F4F6' }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                  >
                    <Plus className={`w-3.5 h-3.5 transition-colors duration-200 ${isOpen ? 'text-green-950' : 'text-gray-500'}`} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50">
                        <span className="block pt-4">{faq.answer}</span>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom nudge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-gray-400 text-sm">
            Still have questions?{' '}
            <Link href="/contact" className="text-green-950 font-semibold hover:text-solar-600 transition-colors underline underline-offset-2">
              Talk to a solar expert →
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
