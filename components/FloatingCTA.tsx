'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, ExternalLink } from 'lucide-react';

const contacts = [
  {
    label: 'Message on Facebook',
    href: 'https://www.facebook.com/profile.php?id=61588860696904',
    bg: 'bg-[#1877F2]',
    external: true,
  },
  {
    label: 'Chat on WhatsApp',
    href: 'https://wa.me/639159717213',
    bg: 'bg-[#25D366]',
    external: true,
  },
  {
    label: 'Call 0915-971-7213',
    href: 'tel:+639159717213',
    bg: 'bg-green-950',
    external: false,
  },
];

export default function FloatingCTA() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5">

          {/* Contact options */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-2 mb-1"
              >
                {contacts.map((contact, i) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    target={contact.external ? '_blank' : undefined}
                    rel={contact.external ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.9 }}
                    transition={{ delay: (contacts.length - 1 - i) * 0.06, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ x: -3 }}
                    className="flex items-center gap-3 bg-white rounded-2xl shadow-card-hover border border-gray-100/80 pr-4 py-2.5 pl-2.5 text-sm font-medium text-gray-700 hover:text-green-950 hover:border-green-950/10 transition-colors"
                  >
                    <span className={`w-8 h-8 ${contact.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      {contact.external ? (
                        <MessageCircle className="w-4 h-4 text-white" />
                      ) : (
                        <Phone className="w-4 h-4 text-white" />
                      )}
                    </span>
                    {contact.label}
                    {contact.external && (
                      <ExternalLink className="w-3 h-3 text-gray-300 ml-auto" />
                    )}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main toggle button */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              boxShadow: open
                ? '0 4px 20px rgba(255,195,0,0.3)'
                : [
                    '0 4px 14px rgba(255,195,0,0.2)',
                    '0 4px 28px rgba(255,195,0,0.45)',
                    '0 4px 14px rgba(255,195,0,0.2)',
                  ],
            }}
            transition={{
              scale: { type: 'spring', stiffness: 260, damping: 20, delay: 0.1 },
              opacity: { delay: 0.1, duration: 0.4 },
              boxShadow: { duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
            }}
            onClick={() => setOpen(!open)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="relative flex items-center gap-2.5 bg-solar-500 hover:bg-solar-400 rounded-full pl-4 pr-5 h-14 transition-colors"
            aria-label="Get Free Quote"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-6 h-6 text-green-950" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 text-green-950 flex-shrink-0" />
                  <span className="text-green-950 font-semibold text-sm whitespace-nowrap">Get Free Quote</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
