import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Image as ImageIcon } from 'lucide-react';
import { Project } from './ProjectCard';

interface ProjectEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  project?: Project | null;
}

export function ProjectEditor({ isOpen, onClose, onSave, project }: ProjectEditorProps) {
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    image: '',
    tags: [],
    link: ''
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (project) {
      setFormData(project);
    } else {
      setFormData({
        title: '',
        description: '',
        image: '',
        tags: [],
        link: ''
      });
    }
  }, [project, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    const projectData: Project = {
      id: project?.id || Date.now().toString(),
      title: formData.title!,
      description: formData.description!,
      image: formData.image || 'https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=800',
      tags: formData.tags || [],
      link: formData.link
    };

    onSave(projectData);
    onClose();
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter(t => t !== tag) || []
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-[var(--color-surface)] rounded-2xl p-6 sm:p-8 max-w-2xl w-full border border-[var(--color-surface-elevated)] relative overflow-hidden my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--color-orange-primary)] blur-[100px] opacity-20" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <h3>{project ? 'Edit Project' : 'Add New Project'}</h3>
              
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
                  Project Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-4 bg-[var(--color-background)] border border-[var(--color-surface-elevated)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-orange-primary)] transition-colors"
                  placeholder="Amazing Roblox Build"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[var(--color-text-secondary)] mb-3">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-4 bg-[var(--color-background)] border border-[var(--color-surface-elevated)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-orange-primary)] transition-colors resize-none"
                  placeholder="Describe your project..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[var(--color-text-secondary)] mb-3">
                  Image URL
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <ImageIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-[var(--color-background)] border border-[var(--color-surface-elevated)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-orange-primary)] transition-colors"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mt-2">
                  Leave empty for default placeholder
                </p>
              </div>

              <div>
                <label className="block text-sm text-[var(--color-text-secondary)] mb-3">
                  Project Link (Optional)
                </label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-4 py-4 bg-[var(--color-background)] border border-[var(--color-surface-elevated)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-orange-primary)] transition-colors"
                  placeholder="https://www.roblox.com/games/..."
                />
              </div>

              <div>
                <label className="block text-sm text-[var(--color-text-secondary)] mb-3">
                  Tags
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 px-4 py-3 bg-[var(--color-background)] border border-[var(--color-surface-elevated)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-orange-primary)] transition-colors"
                    placeholder="Add a tag"
                  />
                  <motion.button
                    type="button"
                    onClick={addTag}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-[var(--color-surface-elevated)] rounded-lg hover:bg-[var(--color-orange-primary)]/20 transition-colors"
                  >
                    Add
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags?.map((tag, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-4 py-2 bg-[var(--color-surface-elevated)] text-[var(--color-orange-primary)] text-sm rounded-full border border-[var(--color-orange-primary)]/30 flex items-center gap-2 cursor-pointer hover:bg-[var(--color-orange-primary)]/20"
                      onClick={() => removeTag(tag)}
                    >
                      {tag}
                      <X className="w-4 h-4" />
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-4 bg-[var(--color-surface-elevated)] rounded-lg hover:bg-[var(--color-surface-elevated)]/80 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-[var(--color-orange-primary)] to-[var(--color-orange-dark)] rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-orange-primary)]/30"
                >
                  <Save className="w-5 h-5" />
                  <span>{project ? 'Update' : 'Create'}</span>
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}