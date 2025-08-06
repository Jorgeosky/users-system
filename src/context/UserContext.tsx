import React, { createContext, useState, useContext } from 'react';

export interface User {
  id: number;
  username: string;
  email?: string;
  role?: string;
  voucher?: string;
}

interface UserContextType {
    user: User | null;
    login: (user: User, callback: () => void) => void;
    logout: (callback: () => void) => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<UserContextType>({
  user: null,
    login: () => {},
    logout: () => {}
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const login = (user: User, callback: () => void) => {
        setUser(user);
        callback();
    }
    const logout = (callback: () => void) => {
        setUser(null);
        callback();
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser debe usarse dentro de UserProvider');
  return context;
};