import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'neutral';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    success: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    warning: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    neutral: 'bg-slate-800/60 border-slate-700/50 text-slate-300',
  };

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 rounded-full border font-semibold tracking-wide backdrop-blur-sm',
          variantStyles[variant],
          sizeStyles[size],
          className,
        ),
      )}
      {...props}
    >
      {children}
    </span>
  );
};
