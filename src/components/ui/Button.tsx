import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  disabled,
  ...props
}) => {
  const variantStyles = {
    primary:
      'bg-white text-slate-950 hover:bg-slate-100 shadow-xl shadow-white/5 active:scale-[0.98]',
    secondary:
      'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700/80 active:scale-[0.98]',
    outline:
      'bg-transparent border border-slate-700 text-slate-200 hover:bg-slate-800/50 hover:border-slate-600 active:scale-[0.98]',
    ghost: 'bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/30',
  };

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs rounded-xl',
    md: 'px-5 py-2.5 text-sm rounded-xl',
    lg: 'px-7 py-3.5 text-base rounded-2xl',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={twMerge(
        clsx(
          'inline-flex cursor-pointer select-none items-center justify-center gap-2 font-bold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50',
          variantStyles[variant],
          sizeStyles[size],
          className,
        ),
      )}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
};
