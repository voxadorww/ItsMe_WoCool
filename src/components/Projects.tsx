import { motion } from 'motion/react';
import { ProjectCard, Project } from './ProjectCard';
import { Plus } from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
  isAdmin?: boolean;
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
  onAdd?: () => void;
}

export function Projects({ projects, isAdmin, onEdit, onDelete, onAdd }: ProjectsProps) {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Decoration */}
      <div className="absolute top-1/4 left-0 w-1/3 h-1/2 bg-gradient-to-r from-[var(--color-orange-primary)]/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <h2>
              Featured <span className="text-[var(--color-orange-primary)]">Projects</span>
            </h2>
            {isAdmin && (
              <motion.button
                onClick={onAdd}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 bg-gradient-to-r from-[var(--color-orange-primary)] to-[var(--color-orange-dark)] rounded-full flex items-center justify-center shadow-lg shadow-[var(--color-orange-primary)]/50"
              >
                <Plus className="w-7 h-7" />
              </motion.button>
            )}
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-[var(--color-orange-primary)] to-[var(--color-orange-bright)] mx-auto mb-6" />
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto text-base sm:text-lg">
            Explore my portfolio of immersive Roblox builds and experiences
          </p>
        </motion.div>

        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-[var(--color-text-muted)] text-xl mb-6">No projects yet</p>
            {isAdmin && (
              <motion.button
                onClick={onAdd}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[var(--color-orange-primary)] to-[var(--color-orange-dark)] rounded-xl"
              >
                Add Your First Project
              </motion.button>
            )}
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isAdmin={isAdmin}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}