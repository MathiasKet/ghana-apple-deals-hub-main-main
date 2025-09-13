import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string, name: string) => Promise<{ error: any }>;
  login: (email: string, password: string) => Promise<{ error: any }>;
  logout: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updateUserProfile: (updates: { display_name?: string; avatar_url?: string }) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signup = async (email: string, password: string, name: string) => {
    // TODO: Implement your signup logic here
    // This is a placeholder implementation
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a mock user
      const user: User = {
        id: 'mock-user-id',
        email,
        name,
      };
      
      setCurrentUser(user);
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const login = async (email: string, password: string) => {
    // TODO: Implement your login logic here
    // This is a placeholder implementation
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a mock user
      const user: User = {
        id: 'mock-user-id',
        email,
        name: 'Mock User',
      };
      
      setCurrentUser(user);
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const logout = async () => {
    // TODO: Implement your logout logic here
    setCurrentUser(null);
    return { error: null };
  };

  const resetPassword = async (email: string) => {
    // TODO: Implement your password reset logic here
    return { error: null };
  };

  const updateUserProfile = async (updates: { display_name?: string; avatar_url?: string }) => {
    if (!currentUser) return { error: 'No user logged in' };
    
    // TODO: Implement your profile update logic here
    const updatedUser = {
      ...currentUser,
      name: updates.display_name || currentUser.name,
      avatar_url: updates.avatar_url || currentUser.avatar_url,
    };
    
    setCurrentUser(updatedUser);
    return { error: null };
  };

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 