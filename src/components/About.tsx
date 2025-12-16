import { motion } from 'motion/react'; // Or 'framer-motion' if using Framer Motion
import { Code, Zap, Target, Award } from 'lucide-react';

const skills = [
  {
    icon: Code,
    title: 'Building Excellence',
    description: 'Expert in creating detailed and optimized Roblox environments',
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Efficient workflow ensuring timely project completion',
  },
  {
    icon: Target,
    title: 'Precision',
    description: 'Meticulous attention to detail in every build',
  },
  {
    icon: Award,
    title: 'Experience',
    description: 'Years of expertise across various Roblox projects',
  },
];

export function About() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[var(--color-orange-primary)]/5 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">
            About <span className="text-[var(--color-orange-primary)]">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[var(--color-orange-primary)] to-[var(--color-orange-bright)] mx-auto" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Text Block */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-[var(--color-surface)] rounded-2xl p-6 sm:p-8 md:p-10 border border-[var(--color-surface-elevated)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-orange-primary)] blur-[80px] opacity-20" />
              <p className="text-[var(--color-text-secondary)] text-base sm:text-lg leading-relaxed relative z-10">
                Hello! I'm an experienced builder dedicated to enhancing Roblox development. 
                My expertise spans a wide range of areas, with the exception of high poly modeling, 
                and I can't wait to contribute towards your project.
              </p>
            </div>

            <motion.div
              className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-[var(--color-orange-primary)] to-[var(--color-orange-dark)] rounded-2xl -z-10"
              animate={{ rotate: [0, 10, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Rotating Emoji / Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-elevated)] border border-[var(--color-orange-primary)]/20 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-8xl sm:text-9xl"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  🎮
                </motion.div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="bg-[var(--color-surface)] rounded-xl p-6 border border-[var(--color-surface-elevated)] hover:border-[var(--color-orange-primary)]/50 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[var(--color-orange-primary)] to-[var(--color-orange-dark)] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="mb-2 text-[var(--color-text-primary)] font-semibold">{skill.title}</h4>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{skill.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
