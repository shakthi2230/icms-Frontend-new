import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set, get) => ({
      users: [],
      
      // Add new user
      addUser: (userData) => {
        const newUser = {
          id: Date.now(),
          ...userData,
          status: 'Active',
          isSuperUser: false,
          createdAt: new Date().toISOString(),
          joinDate: new Date().toISOString().split('T')[0]
        };
        
        set((state) => ({
          users: [...state.users, newUser],
        }));
        
        return newUser;
      },
      
      // Update user
      updateUser: (id, updatedData) => {
        set((state) => ({
          users: state.users.map(user =>
            user.id === id ? { ...user, ...updatedData, updatedAt: new Date().toISOString() } : user
          ),
        }));
      },
      
      // Delete user
      deleteUser: (id) => {
        set((state) => ({
          users: state.users.filter(user => user.id !== id),
        }));
      },
      
      // Toggle user status
      toggleUserStatus: (id) => {
        set((state) => ({
          users: state.users.map(user =>
            user.id === id 
              ? { 
                  ...user, 
                  status: user.status === 'Active' ? 'Inactive' : 'Active',
                  updatedAt: new Date().toISOString()
                } 
              : user
          ),
        }));
      },
      
      // Toggle super user status
      toggleSuperUser: (id) => {
        set((state) => ({
          users: state.users.map(user =>
            user.id === id 
              ? { 
                  ...user, 
                  isSuperUser: !user.isSuperUser,
                  updatedAt: new Date().toISOString()
                } 
              : user
          ),
        }));
      },
      
      // Get user by ID
      getUserById: (id) => {
        return get().users.find(user => user.id === id);
      },
      
      // Clear all users
      clearUsers: () => {
        set({ users: [] });
      },
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useUserStore;