'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Zap, Settings, ClipboardList } from 'lucide-react';
import { services } from '@/lib/data';
import CTASection from '@/components/sections/CTASection';

const iconMap = { Zap, Settings, ClipboardList };

export default function ServicesPageContent() {
  return (
    <>
      {/* Page hero */}
      <section className="pt-32 pb-16 bg-green-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-block text-solar-400 font-semibold text-sm uppercase tracking-widest mb-4">
              Our Services
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl leading-tight mb-5">
              End-to-End Solar Solutions for Every Need
            </h1>
            <p className="text-green-100/70 text-lg leading-relaxed">
              From your first consultation to decades of clean power, MFour Solar supports
              you at every stage of your solar journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services detail */}
      <div className="bg-white">
        {services.map((service, i) => {
          const Icon = iconMap[service.icon as keyof typeof iconMap] ?? Zap;
          const isEven = i % 2 === 0;

          return (
            <section
              key={service.id}
              id={service.id}
              className={`py-24 ${i % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                  className={`grid lg:grid-cols-2 gap-16 items-center ${
                    !isEven ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  {/* Image */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className={`relative h-[380px] rounded-2xl overflow-hidden ${!isEven ? 'lg:col-start-2' : ''}`}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-950/40 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-2 bg-solar-500 rounded-full px-4 py-2">
                        <Icon className="w-4 h-4 text-green-950" />
                        <span className="text-green-950 font-semibold text-sm">{service.title}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}
                  >
                    <span className="inline-block text-solar-600 font-semibold text-sm uppercase tracking-widest mb-3">
                      0{i + 1}
                    </span>
                    <h2 className="font-display font-bold text-3xl text-green-950 mb-4">
                      {service.title}
                    </h2>
                    <p className="text-gray-500 leading-relaxed mb-7">{service.description}</p>

                    {/* Benefits */}
                    <ul className="space-y-3 mb-8">
                      {service.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-solar-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm">{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Process steps */}
                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 mb-7">
                      <h4 className="font-semibold text-green-950 text-sm mb-4">Our Process</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {service.steps.map((step) => (
                          <div key={step.step} className="flex items-start gap-3">
                            <span className="text-solar-500 font-bold text-xs mt-0.5">{step.step}</span>
                            <div>
                              <p className="font-semibold text-green-950 text-xs">{step.title}</p>
                              <p className="text-gray-400 text-xs mt-0.5">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/contact"
                      className="btn-primary inline-flex"
                    >
                      Book {service.title}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <CTASection
        heading="Not Sure Which Service You Need?"
        subtext="Our solar consultants will assess your property and recommend the right solution — for free."
      />
    </>
  );
}
