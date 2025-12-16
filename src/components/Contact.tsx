import { motion } from 'motion/react';
import { Mail, MessageSquare, Send } from 'lucide-react';

export function Contact() {
  const handleEmailClick = () => {
    window.location.href = 'mailto:richeltom1810@gmail.com';
  };

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-[var(--color-orange-primary)] rounded-full blur-[150px] opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-6">
            Get In <span className="text-[var(--color-orange-primary)]">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[var(--color-orange-primary)] to-[var(--color-orange-bright)] mx-auto mb-6" />
          <p className="text-[var(--color-text-secondary)] text-base sm:text-lg">
            Ready to bring your Roblox vision to life? Let's connect!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Discord Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03, y: -5 }}
            className="bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-elevated)] rounded-2xl p-8 border border-[var(--color-surface-elevated)] hover:border-[var(--color-orange-primary)]/50 transition-all cursor-pointer relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-orange-primary)] blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-orange-primary)] to-[var(--color-orange-dark)] rounded-2xl flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8" />
              </div>
              
              <h3 className="mb-3">Discord</h3>
              <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                Message me directly on Discord
              </p>
              
              <div className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--color-background)] rounded-lg border border-[var(--color-orange-primary)]/30">
                <span className="text-[var(--color-orange-primary)]">@itsme_wocool</span>
              </div>
            </div>

            <motion.div
              className="absolute bottom-4 right-4"
              animate={{
                x: [0, 10, 0],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Send className="w-6 h-6 text-[var(--color-orange-primary)] opacity-30" />
            </motion.div>
          </motion.div>

          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03, y: -5 }}
            onClick={handleEmailClick}
            className="bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-elevated)] rounded-2xl p-8 border border-[var(--color-surface-elevated)] hover:border-[var(--color-orange-primary)]/50 transition-all cursor-pointer relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-orange-primary)] blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-orange-primary)] to-[var(--color-orange-dark)] rounded-2xl flex items-center justify-center mb-6">
                <Mail className="w-8 h-8" />
              </div>
              
              <h3 className="mb-3">Email</h3>
              <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                Send me an email for inquiries
              </p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-orange-primary)] to-[var(--color-orange-dark)] rounded-lg shadow-lg shadow-[var(--color-orange-primary)]/30"
              >
                <Mail className="w-5 h-5" />
                <span>Email Me</span>
              </motion.div>
            </div>

            <motion.div
              className="absolute bottom-4 right-4"
              animate={{
                x: [0, -10, 0],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Send className="w-6 h-6 text-[var(--color-orange-primary)] opacity-30" />
            </motion.div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-[var(--color-text-muted)]">
            Looking forward to collaborating on your next amazing Roblox project! 🚀
          </p>
        </motion.div>
      </div>
    </section>
  );
}