import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered';
  hoverable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', hoverable = false, children, ...props }, ref) => {
    const variants = {
      default: 'bg-bg-elevated border border-border shadow-subtle',
      elevated: 'bg-bg-elevated shadow-card',
      bordered: 'bg-transparent border border-border',
    };

    return (
      <div
        ref={ref}
        className={`rounded-xl p-5 transition-all duration-200 ${variants[variant]} ${hoverable ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-elevated' : ''} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
