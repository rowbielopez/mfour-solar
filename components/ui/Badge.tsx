import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'yellow' | 'gray';
  className?: string;
}

export default function Badge({ children, variant = 'green', className }: BadgeProps) {
  const variants = {
    green: 'bg-green-950/10 text-green-950 border-green-950/20',
    yellow: 'bg-solar-500/10 text-solar-600 border-solar-500/20',
    gray: 'bg-gray-100 text-gray-600 border-gray-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
