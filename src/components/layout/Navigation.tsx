import { NavLink } from 'react-router-dom';
import { Compass, BookOpen, PenTool, MessageCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/discover', icon: Compass, label: 'Discover', labelZh: '发现' },
  { path: '/learn', icon: BookOpen, label: 'Learn', labelZh: '学习' },
  { path: '/create', icon: PenTool, label: 'Create', labelZh: '创作' },
  { path: '/engage', icon: MessageCircle, label: 'Engage', labelZh: '互动' },
  { path: '/grow', icon: TrendingUp, label: 'Grow', labelZh: '成长' },
];

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bg-elevated border-t border-border z-50">
      <div className="max-w-lg mx-auto px-2">
        <ul className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                    isActive ? 'text-primary' : 'text-text-tertiary hover:text-text-secondary'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <motion.div
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                    </motion.div>
                    <span className="text-xs font-medium">{item.labelZh}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
