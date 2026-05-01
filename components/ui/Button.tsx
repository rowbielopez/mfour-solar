'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { ComponentPropsWithoutRef } from 'react';

interface ButtonProps extends ComponentPropsWithoutRef<typeof motion.button> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 cursor-pointer';

  const variants = {
    primary: 'bg-solar-500 hover:bg-solar-600 text-green-950 hover:shadow-glow',
    secondary: 'bg-green-950 hover:bg-green-900 text-white',
    outline:
      'border-2 border-green-950 text-green-950 hover:bg-green-950 hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
