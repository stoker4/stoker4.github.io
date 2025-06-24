
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  theme: string;
  playlists: string[];
  following: string[];
  createdAt: string;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem('bpsb-current');
    if (currentUser) {
      const users = JSON.parse(localStorage.getItem('bpsb-users') || '{}');
      if (users[currentUser]) {
        setUser(users[currentUser]);
        setIsLoggedIn(true);
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('bpsb-users') || '{}');
    if (users[username] && users[username].password === password) {
      setUser(users[username]);
      setIsLoggedIn(true);
      localStorage.setItem('bpsb-current', username);
      return true;
    }
    return false;
  };

  const signup = async (username: string, email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('bpsb-users') || '{}');
    if (users[username]) {
      return false; // User already exists
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      theme: 'system',
      playlists: [],
      following: [],
      createdAt: new Date().toISOString()
    };
    
    users[username] = { ...newUser, password };
    localStorage.setItem('bpsb-users', JSON.stringify(users));
    localStorage.setItem('bpsb-current', username);
    setUser(newUser);
    setIsLoggedIn(true);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('bpsb-current');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    
    const users = JSON.parse(localStorage.getItem('bpsb-users') || '{}');
    users[user.username] = { ...users[user.username], ...updates };
    localStorage.setItem('bpsb-users', JSON.stringify(users));
  };

  return (
    <UserContext.Provider value={{
      user,
      isLoggedIn,
      login,
      signup,
      logout,
      updateUser
    }}>
      {children}
    </UserContext.Provider>
  );
};
