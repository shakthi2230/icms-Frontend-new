import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useProjectStore = create(
  persist(
    (set, get) => ({
      projects: [],
      
      // Add new project
      addProject: (projectData) => {
        const newProject = {
          id: Date.now(),
          ...projectData,
          status: 'Active',
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          projects: [...state.projects, newProject],
        }));
        
        return newProject;
      },
      
      // Update project
      updateProject: (id, updatedData) => {
        set((state) => ({
          projects: state.projects.map(project =>
            project.id === id ? { ...project, ...updatedData, updatedAt: new Date().toISOString() } : project
          ),
        }));
      },
      
      // Delete project
      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter(project => project.id !== id),
        }));
      },
      
      // Toggle project status
      toggleProjectStatus: (id) => {
        set((state) => ({
          projects: state.projects.map(project =>
            project.id === id 
              ? { 
                  ...project, 
                  status: project.status === 'Active' ? 'Inactive' : 'Active',
                  updatedAt: new Date().toISOString()
                } 
              : project
          ),
        }));
      },
      
      // Get project by ID
      getProjectById: (id) => {
        return get().projects.find(project => project.id === id);
      },
      
      // Clear all projects
      clearProjects: () => {
        set({ projects: [] });
      },
    }),
    {
      name: 'project-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useProjectStore;