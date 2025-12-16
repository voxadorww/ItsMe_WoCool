import { motion } from 'motion/react';
import { ExternalLink, Edit, Trash2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isAdmin?: boolean;
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
}

export function ProjectCard({ project, index, isAdmin, onEdit, onDelete }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="group relative bg-[var(--color-surface)] rounded-2xl overflow-hidden border border-[var(--color-surface-elevated)] hover:border-[var(--color-orange-primary)]/50 transition-all"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-[var(--color-surface-elevated)]">
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/80 to-transparent flex items-center justify-center gap-4"
        >
          {isAdmin ? (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onEdit?.(project)}
                className="w-14 h-14 bg-[var(--color-orange-primary)] rounded-full flex items-center justify-center shadow-lg"
              >
                <Edit className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete?.(project.id)}
                className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <Trash2 className="w-6 h-6" />
              </motion.button>
            </>
          ) : (
            project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 bg-[var(--color-orange-primary)] rounded-full flex items-center justify-center shadow-lg"
              >
                <ExternalLink className="w-6 h-6" />
              </motion.a>
            )
          )}
        </motion.div>

        {/* Gradient Overlay at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--color-surface)] to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <h3 className="mb-3 group-hover:text-[var(--color-orange-primary)] transition-colors">
          {project.title}
        </h3>
        <p className="text-[var(--color-text-secondary)] mb-5 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-[var(--color-surface-elevated)] text-[var(--color-orange-primary)] text-xs rounded-full border border-[var(--color-orange-primary)]/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[var(--color-orange-primary)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}