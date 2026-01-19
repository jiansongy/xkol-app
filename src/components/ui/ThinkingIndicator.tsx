import { motion } from 'framer-motion';

interface ThinkingIndicatorProps {
  label?: string;
}

export function ThinkingIndicator({ label = 'AI is thinking...' }: ThinkingIndicatorProps) {
  return (
    <div className="flex items-center gap-3 py-4">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-text-secondary"
            animate={{
              scale: [0.6, 1, 0.6],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <span className="text-sm text-text-secondary">{label}</span>
    </div>
  );
}
