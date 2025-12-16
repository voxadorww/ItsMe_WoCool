import { motion } from 'motion/react';
import { Code2, User, Briefcase, Mail, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  onSecretClick: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Header({ onSecretClick, activeSection, onNavigate }: HeaderProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Code2 },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-background)]/90 backdrop-blur-lg border-b border-[var(--color-surface-elevated)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => onNavigate('home')}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-orange-primary)] to-[var(--color-orange-dark)] rounded-lg flex items-center justify-center">
              <Code2 className="w-7 h-7" />
            </div>
            <div>
              <div className="font-bold text-[var(--color-text-primary)] text-lg">itsMe_WoCool</div>
              <div className="text-xs text-[var(--color-text-muted)]">Roblox Builder</div>
            </div>
          </motion.div>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => onNavigate(item.id)}
                  className={`px-5 py-3 rounded-lg flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-[var(--color-orange-primary)] text-white'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* Secret Admin Button */}
          <motion.button
            onClick={onSecretClick}
            className="w-10 h-10 opacity-10 hover:opacity-100 transition-opacity flex items-center justify-center"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            title="Admin Access"
          >
            <ShieldAlert className="w-6 h-6 text-[var(--color-orange-primary)]" />
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-around pb-3 pt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'text-[var(--color-orange-primary)] bg-[var(--color-surface)]'
                    : 'text-[var(--color-text-muted)]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.header>
  );
}