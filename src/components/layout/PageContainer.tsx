import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function PageContainer({ children, title, subtitle }: PageContainerProps) {
  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-8 pb-24 animate-fade-in">
      {(title || subtitle) && (
        <div className="mb-8">
          {title && <h1 className="text-2xl font-bold text-text-primary tracking-tight">{title}</h1>}
          {subtitle && <p className="mt-2 text-text-secondary">{subtitle}</p>}
        </div>
      )}
      {children}
    </main>
  );
}
