import { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glass?: boolean;
}

export default function Card({ hover, glass, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6 shadow-sm',
        glass
          ? 'border border-white/20 bg-white/10 backdrop-blur-md'
          : 'border border-gray-100 bg-white',
        hover && 'cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
