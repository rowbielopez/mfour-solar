'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Target, Eye, Heart } from 'lucide-react';
import { stats } from '@/lib/data';
import CTASection from '@/components/sections/CTASection';

const team = [
  {
    name: 'Miguel Santos',
    role: 'CEO & Founder',
    bio: 'Electrical engineer with 15+ years in the renewable energy sector. Led 3 major solar projects for DENR.',
    initials: 'MS',
  },
  {
    name: 'Ana Reyes',
    role: 'Head of Engineering',
    bio: 'BSEE from UP Diliman, experienced solar PV system designer. Oversees all installation quality.',
    initials: 'AR',
  },
  {
    name: 'Carlo Mendoza',
    role: 'Operations Manager',
    bio: 'Project management professional with expertise in large-scale commercial solar deployments.',
    initials: 'CM',
  },
  {
    name: 'Liza Bautista',
    role: 'Client Relations Lead',
    bio: 'Dedicated to ensuring every client gets the most from their solar investment, from quote to commissioning.',
    initials: 'LB',
  },
];

export default function AboutPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-green-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-solar-500/10 rounded-full blur-[100px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block text-solar-400 font-semibold text-sm uppercase tracking-widest mb-4">
                About MFour Solar
              </span>
              <h1 className="font-display font-bold text-4xl sm:text-5xl leading-tight mb-6">
                Championing Clean Energy in the Philippines Since 2018
              </h1>
              <p className="text-green-100/70 text-lg leading-relaxed">
                We started with a simple belief: every Filipino deserves access to clean, affordable
                energy. Today, with over 100 installations and 10 years of engineering experience,
                we're making that belief a reality—one rooftop at a time.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative h-[340px] rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80"
                alt="MFour Solar team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-950/60 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-solar-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <p
                  className={`font-display font-bold text-green-950 ${
                    /\d/.test(stat.value) ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'
                  }`}
                >
                  {stat.value}
                </p>
                <p className="text-green-950/60 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block text-solar-600 font-semibold text-sm uppercase tracking-widest mb-3">
                Our Story
              </span>
              <h2 className="font-display font-bold text-3xl text-green-950 mb-5">
                From One Installation to Nationwide Impact
              </h2>
              <div className="space-y-4 text-gray-500 leading-relaxed">
                <p>
                  MFour Solar was founded in 2018 by Miguel Santos, a licensed electrical engineer
                  frustrated by the Philippines' high electricity rates and dependence on fossil fuels.
                  What began as a one-man consulting practice quickly grew into a full-service solar
                  integrator.
                </p>
                <p>
                  Our first installation — a 5 kWp system for a home in Quezon City — reduced the
                  family's electricity bill from ₱7,000 to ₱800 per month. That result became our
                  north star: deliver measurable, life-changing impact for every client.
                </p>
                <p>
                  By 2021, we had expanded across Metro Manila and the major Visayan cities. Today,
                  MFour Solar fields a dedicated team of experienced engineers, project managers, and
                  support specialists serving clients from Luzon to Mindanao.
                </p>
              </div>
            </motion.div>

            {/* Mission & Vision */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-5"
            >
              {[
                {
                  icon: Target,
                  title: 'Our Mission',
                  desc: 'To accelerate the Philippines\' transition to clean, affordable solar energy by delivering world-class installations and unmatched after-sales support to every client.',
                  color: 'bg-solar-500/10',
                  iconColor: 'text-solar-600',
                },
                {
                  icon: Eye,
                  title: 'Our Vision',
                  desc: 'A Philippines where every home and business has access to clean, reliable solar energy — reducing the nation\'s carbon footprint and energy costs simultaneously.',
                  color: 'bg-green-950/5',
                  iconColor: 'text-green-950',
                },
                {
                  icon: Heart,
                  title: 'Our Values',
                  desc: 'Transparency in pricing. Honesty in assessment. Excellence in installation. Dedication in after-sales. These aren\'t just words — they\'re how we operate every day.',
                  color: 'bg-red-50',
                  iconColor: 'text-red-500',
                },
              ].map(({ icon: Icon, title, desc, color, iconColor }) => (
                <div key={title} className={`${color} rounded-2xl p-6 border border-gray-100`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                      <Icon className={`w-5 h-5 ${iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-950 mb-2">{title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block text-solar-600 font-semibold text-sm uppercase tracking-widest mb-3">
              The Team
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-green-950">
              The Experts Behind Your Solar System
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-green-950 rounded-2xl flex items-center justify-center text-white font-bold text-lg font-display mx-auto mb-4">
                  {member.initials}
                </div>
                <h3 className="font-semibold text-green-950 mb-0.5">{member.name}</h3>
                <p className="text-solar-600 text-xs font-medium mb-3">{member.role}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
