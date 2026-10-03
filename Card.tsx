import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  glass = false,
  onClick,
}) => {
  const Component = onClick ? motion.div : 'div';
  
  return (
    <Component
      onClick={onClick}
      className={cn(
        'rounded-3xl p-6 transition-all duration-300',
        glass
          ? 'glass-glow'
          : 'bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xl shadow-slate-200/40 hover:border-primary-300/80',
        hover && 'card-hover cursor-pointer',
        className
      )}
      {...(onClick && {
        whileHover: { y: -3, scale: 1.01 },
        whileTap: { scale: 0.99 },
      })}
    >
      {children}
    </Component>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  );
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className,
}) => {
  return (
    <h3 className={cn('text-xl font-bold text-slate-900', className)}>
      {children}
    </h3>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
};
