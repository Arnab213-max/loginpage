
import React, { createContext, useState, useContext, ReactNode } from "react";
import { toast } from "sonner";
import users from "../data/users.json";

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // Remove password from user object before storing in state
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      toast.success(`Welcome back, ${foundUser.name}!`);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    toast.error("Invalid email or password");
    return false;
  };

  const logout = () => {
    setUser(null);
    toast.info("You have been logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
