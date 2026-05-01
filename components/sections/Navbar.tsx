'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isHome = pathname === '/';
  const transparent = !scrolled && isHome;

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-solar-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-500',
          !transparent
            ? 'bg-white/96 backdrop-blur-lg shadow-sm border-b border-gray-100/80'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">

            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/mfour-logo.png"
                alt="MFour Solar"
                width={140}
                height={40}
                className={cn(
                  'h-9 w-auto object-contain transition-all duration-300',
                  !transparent ? 'brightness-100' : 'brightness-0 invert'
                )}
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                      active
                        ? 'text-green-950'
                        : transparent
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-gray-600 hover:text-green-950 hover:bg-gray-100/80'
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-solar-500 rounded-full -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+639159717213"
                className={cn(
                  'flex items-center gap-1.5 text-sm font-medium transition-colors duration-200',
                  !transparent ? 'text-gray-500 hover:text-green-950' : 'text-white/70 hover:text-white'
                )}
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">0915-971-7213</span>
                <span className="xl:hidden">Call</span>
              </a>
              <Link href="/contact" className="btn-primary text-sm px-5 py-2.5">
                Get Free Quote
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={cn(
                'lg:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-200',
                !transparent ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              )}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu — full backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 40 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl lg:hidden flex flex-col"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <Link href="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
                  <Image
                    src="/mfour-logo.png"
                    alt="MFour Solar"
                    width={120}
                    height={34}
                    className="h-8 w-auto object-contain"
                  />
                </Link>
                <button onClick={() => setMenuOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 overflow-y-auto px-3 py-4">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.25 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          'flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium mb-1 transition-colors',
                          active
                            ? 'bg-green-950 text-white'
                            : 'text-gray-700 hover:bg-gray-50'
                        )}
                      >
                        {link.label}
                        <ChevronRight className={cn('w-4 h-4', active ? 'text-solar-400' : 'text-gray-300')} />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Panel footer */}
              <div className="px-4 py-5 border-t border-gray-100 space-y-3">
                <a
                  href="tel:+639159717213"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 text-sm font-medium text-gray-700"
                >
                  <div className="w-7 h-7 bg-green-950 rounded-lg flex items-center justify-center">
                    <Phone className="w-3.5 h-3.5 text-white" />
                  </div>
                  0915-971-7213
                </a>
                <Link href="/contact" className="btn-primary w-full justify-center text-sm">
                  Get Free Quote
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
