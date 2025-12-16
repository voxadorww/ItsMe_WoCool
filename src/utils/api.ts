import { projectId, publicAnonKey } from './supabase/info';
import { Project } from '../components/ProjectCard';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-1c582d9e`;

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
}

export const projectsAPI = {
  async getAll(): Promise<Project[]> {
    const result = await fetchAPI('/projects');
    return result.projects || [];
  },

  async create(project: Project): Promise<Project> {
    const result = await fetchAPI('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
    return result.project;
  },

  async update(id: string, project: Partial<Project>): Promise<Project> {
    const result = await fetchAPI(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
    return result.project;
  },

  async delete(id: string): Promise<void> {
    await fetchAPI(`/projects/${id}`, {
      method: 'DELETE',
    });
  },
};
