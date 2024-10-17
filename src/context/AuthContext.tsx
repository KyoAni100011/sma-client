// AuthContext.tsx

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import localStorageUtils from "../util/localStorageUtils";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorageUtils.getItem("user")
    if (savedUser) {    
      setUser(savedUser);
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    window.location.reload(); 
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
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
