import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCompanyStore = create(
  persist(
    (set, get) => ({
      companies: [],
      
      // Add new company
      addCompany: (companyData) => {
        const newCompany = {
          id: Date.now(),
          ...companyData,
          status: 'Active',
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          companies: [...state.companies, newCompany],
        }));
        
        return newCompany;
      },
      
      // Update company - FIXED VERSION
      updateCompany: (id, updatedData) => {
        set((state) => ({
          companies: state.companies.map(company =>
            company.id === id ? { ...company, ...updatedData, updatedAt: new Date().toISOString() } : company
          ),
        }));
      },
      
      // Delete company
      deleteCompany: (id) => {
        set((state) => ({
          companies: state.companies.filter(company => company.id !== id),
        }));
      },
      
      // Toggle company status
      toggleCompanyStatus: (id) => {
        set((state) => ({
          companies: state.companies.map(company =>
            company.id === id 
              ? { 
                  ...company, 
                  status: company.status === 'Active' ? 'Inactive' : 'Active',
                  updatedAt: new Date().toISOString()
                } 
              : company
          ),
        }));
      },
      
      // Get company by ID
      getCompanyById: (id) => {
        return get().companies.find(company => company.id === id);
      },
      
      // Clear all companies
      clearCompanies: () => {
        set({ companies: [] });
      },
    }),
    {
      name: 'company-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useCompanyStore;