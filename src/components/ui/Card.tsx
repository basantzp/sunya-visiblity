import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, glow = false, className, ...props }) => {
  return (
    <div
      className={twMerge(
        clsx(
          'relative rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-md transition-all duration-200',
          glow && 'hover:border-slate-700 hover:shadow-2xl hover:shadow-blue-500/5',
          className,
        ),
      )}
      {...props}
    >
      {children}
    </div>
  );
};
