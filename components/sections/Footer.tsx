'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook } from 'lucide-react';

const footerLinks = {
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Projects', href: '/projects' },
    { label: 'Careers', href: '#' },
    { label: 'Press & Media', href: '#' },
  ],
  Services: [
    { label: 'Solar Installation', href: '/services#installation' },
    { label: 'Maintenance & Repair', href: '/services#maintenance' },
    { label: 'Consultation', href: '/services#consultation' },
    { label: 'Get a Quote', href: '/contact' },
  ],
  Resources: [
    { label: 'FAQ', href: '/#faq' },
    { label: 'Solar Calculator', href: '/#calculator' },
    { label: 'Net Metering Guide', href: '#' },
    { label: 'Solar Blog', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-green-950 text-white">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex mb-6">
              <Image
                src="/mfour-logo.png"
                alt="MFour Solar"
                width={240}
                height={70}
                className="h-16 w-auto object-contain"
              />
            </Link>

            <p className="text-green-100/60 text-sm leading-relaxed max-w-xs mb-1">
              Powering Filipino homes and businesses with clean, affordable solar energy.
              100+ installations. 10 years of engineering experience. Zero-compromise quality.
            </p>
            <p className="text-solar-400/80 text-xs font-medium mb-5">
              Lead Engineer: Engr. Mark Daryll Acosta
            </p>

            {/* Contact details */}
            <div className="space-y-3">
              <a href="tel:+639159717213" className="flex items-center gap-3 text-green-100/60 hover:text-solar-400 transition-colors text-sm group">
                <div className="w-7 h-7 bg-white/5 group-hover:bg-solar-500/15 rounded-lg flex items-center justify-center transition-colors flex-shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>0915-971-7213 · 0917-383-7446</span>
              </a>
              <a href="tel:+63783045569" className="flex items-center gap-3 text-green-100/60 hover:text-solar-400 transition-colors text-sm group">
                <div className="w-7 h-7 bg-white/5 group-hover:bg-solar-500/15 rounded-lg flex items-center justify-center transition-colors flex-shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                (078) 304-5569
              </a>
              <a href="mailto:jua_electrical_services@yahoo.com" className="flex items-center gap-3 text-green-100/60 hover:text-solar-400 transition-colors text-sm group">
                <div className="w-7 h-7 bg-white/5 group-hover:bg-solar-500/15 rounded-lg flex items-center justify-center transition-colors flex-shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                jua_electrical_services@yahoo.com
              </a>
              <div className="flex items-start gap-3 text-green-100/60 text-sm">
                <div className="w-7 h-7 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>#10 Cagelco Village Phase 2, Div. Rd. Pallua Sur, Tuguegarao City, 3500</span>
              </div>
            </div>

            {/* Social links — only render channels with a real URL.
                TODO: add real Instagram / YouTube URLs here when available. */}
            <div className="flex items-center gap-2 mt-6">
              {[
                { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61588860696904', label: 'Facebook' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-solar-500 flex items-center justify-center transition-all hover:-translate-y-0.5 group"
                >
                  <Icon className="w-4 h-4 text-green-100/60 group-hover:text-green-950 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-xs text-white uppercase tracking-widest mb-5">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-green-100/55 hover:text-solar-400 transition-colors hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Legal strip */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-green-100/30">
            <p>© {new Date().getFullYear()} MFour Solar Philippines, Inc. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <Link href="#" className="hover:text-solar-400 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-solar-400 transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-solar-400 transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
