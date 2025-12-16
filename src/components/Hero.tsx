import { motion } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[var(--color-orange-primary)] rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.3 + 0.1
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
              x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-orange-primary)] rounded-full blur-[120px] opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-orange-bright)] rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--color-surface)]/50 backdrop-blur-sm border border-[var(--color-orange-primary)]/30 rounded-full mb-8"
        >
          <Sparkles className="w-5 h-5 text-[var(--color-orange-primary)]" />
          <span className="text-[var(--color-text-secondary)] text-sm sm:text-base">Experienced Roblox Builder</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 px-4"
        >
          <span className="bg-gradient-to-r from-white via-[var(--color-orange-bright)] to-[var(--color-orange-primary)] bg-clip-text text-transparent">
            itsMe_WoCool
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg sm:text-xl text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto px-4"
        >
          Crafting immersive worlds and exceptional experiences in Roblox. 
          Building dreams, one block at a time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
        >
          <motion.button
            onClick={() => onNavigate('projects')}
            className="w-full sm:w-auto px-10 py-4 text-base bg-gradient-to-r from-[var(--color-orange-primary)] to-[var(--color-orange-dark)] rounded-xl shadow-lg shadow-[var(--color-orange-primary)]/50"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255, 107, 44, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.button>
          
          <motion.button
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto px-10 py-4 text-base bg-transparent border-2 border-[var(--color-orange-primary)] rounded-xl"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: 'rgba(255, 107, 44, 0.1)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.button>
        </motion.div>

        <motion.div
          animate={floatingAnimation}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <ChevronDown className="w-8 h-8 text-[var(--color-orange-primary)] animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}