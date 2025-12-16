import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, LogIn } from 'lucide-react';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (password: string) => void;
}

export function AdminLogin({ isOpen, onClose, onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter a password');
      return;
    }
    onLogin(password);
    setError('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-[var(--color-surface)] rounded-2xl p-8 max-w-md w-full border border-[var(--color-surface-elevated)] relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--color-orange-primary)] blur-[100px] opacity-20" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-[var(--color-orange-primary)] to-[var(--color-orange-dark)] rounded-xl flex items-center justify-center">
                  <Lock className="w-7 h-7" />
                </div>
                <div>
                  <h3>Admin Access</h3>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">Enter password to continue</p>
                </div>
              </div>
              
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-[var(--color-text-secondary)] mb-3">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  className="w-full px-4 py-4 bg-[var(--color-background)] border border-[var(--color-surface-elevated)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-orange-primary)] transition-colors"
                  placeholder="Enter admin password"
                  autoFocus
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-3"
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-4 bg-gradient-to-r from-[var(--color-orange-primary)] to-[var(--color-orange-dark)] rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-orange-primary)]/30"
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </motion.button>

              <p className="text-xs text-[var(--color-text-muted)] text-center pt-2">
                Default password: <span className="text-[var(--color-orange-primary)]">admin123</span>
              </p>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}