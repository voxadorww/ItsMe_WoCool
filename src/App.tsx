import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { AdminLogin } from './components/AdminLogin';
import { ProjectEditor } from './components/ProjectEditor';
import { Project } from './components/ProjectCard';
import { projectsAPI } from './utils/api';
import { LogOut } from 'lucide-react';

const ADMIN_PASSWORD = 'admin123';

const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'Epic Gaming Hub',
    description: 'A stunning multiplayer lobby with interactive features, custom lighting, and optimized performance for seamless player experience.',
    image: 'https://images.unsplash.com/photo-1656639969809-ebc544c96955?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2Jsb3glMjBnYW1pbmd8ZW58MXx8fHwxNzY1ODE1NjAzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Lobby', 'Interactive', 'Multiplayer'],
    link: 'https://www.roblox.com'
  },
  {
    id: '2',
    title: 'Medieval Kingdom',
    description: 'Detailed medieval castle and village with realistic textures, intricate architecture, and immersive atmosphere.',
    image: 'https://images.unsplash.com/photo-1485465053475-dd55ed3894b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMGNhc3RsZXxlbnwxfHx8fDE3NjU4NDQwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Medieval', 'RPG', 'Architecture'],
    link: 'https://www.roblox.com'
  },
  {
    id: '3',
    title: 'Futuristic Cityscape',
    description: 'Neon-lit cyberpunk city with advanced building designs, atmospheric effects, and dynamic environment systems.',
    image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwY2l0eXxlbnwxfHx8fDE3NjU4MjkxMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Sci-Fi', 'City', 'Environment'],
    link: 'https://www.roblox.com'
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Load projects from Supabase
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const data = await projectsAPI.getAll();
      
      // If no projects exist in database, initialize with defaults
      if (data.length === 0) {
        for (const project of defaultProjects) {
          await projectsAPI.create(project);
        }
        setProjects(defaultProjects);
      } else {
        setProjects(data);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects(defaultProjects);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigation = (section: string) => {
    setActiveSection(section);
    const refs = {
      home: homeRef,
      about: aboutRef,
      projects: projectsRef,
      contact: contactRef
    };
    
    refs[section as keyof typeof refs]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setIsAdminLoginOpen(false);
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const handleSaveProject = async (project: Project) => {
    try {
      if (editingProject) {
        await projectsAPI.update(project.id, project);
        setProjects(projects.map(p => p.id === project.id ? project : p));
      } else {
        await projectsAPI.create(project);
        setProjects([...projects, project]);
      }
      setEditingProject(null);
      setIsEditorOpen(false);
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project. Please try again.');
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsEditorOpen(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsAPI.delete(id);
        setProjects(projects.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
      }
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setIsEditorOpen(true);
  };

  // Scroll spy to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'home', ref: homeRef },
        { id: 'about', ref: aboutRef },
        { id: 'projects', ref: projectsRef },
        { id: 'contact', ref: contactRef }
      ];

      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = section.ref.current;
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header
        onSecretClick={() => setIsAdminLoginOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigation}
      />

      {/* Admin Logout Button */}
      {isAdmin && (
        <motion.button
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleLogout}
          className="fixed top-24 right-4 z-40 px-5 py-3 bg-red-600 rounded-xl flex items-center gap-2 shadow-lg hover:bg-red-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </motion.button>
      )}

      <main>
        <div ref={homeRef} id="home">
          <Hero onNavigate={handleNavigation} />
        </div>

        <div ref={aboutRef} id="about">
          <About />
        </div>

        <div ref={projectsRef} id="projects">
          {isLoading ? (
            <section className="py-32 px-4 text-center">
              <div className="animate-spin w-12 h-12 border-4 border-[var(--color-orange-primary)] border-t-transparent rounded-full mx-auto" />
              <p className="text-[var(--color-text-muted)] mt-4">Loading projects...</p>
            </section>
          ) : (
            <Projects
              projects={projects}
              isAdmin={isAdmin}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
              onAdd={handleAddProject}
            />
          )}
        </div>

        <div ref={contactRef} id="contact">
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-[var(--color-surface-elevated)]">
        <div className="max-w-7xl mx-auto text-center text-[var(--color-text-muted)]">
          <p className="mb-2">© 2024 itsMe_WoCool. All rights reserved.</p>
          <p className="text-sm">
            Built with passion for Roblox development 🎮
          </p>
        </div>
      </footer>

      {/* Modals */}
      <AdminLogin
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLogin={handleLogin}
      />

      <ProjectEditor
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
        project={editingProject}
      />
    </div>
  );
}