'use client';

import React, { createContext, useContext, useState } from 'react';

interface UserProps {
  name: string;
  points: number;
}

interface StoreContextProps {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  currentView: string;
  navigateTo: (view: string) => void;
}

const StoreContext = createContext<StoreContextProps | undefined>(undefined);

// 物理焊死：100% 通過 TypeScript 編譯雷達的標準 ReactNode 宣告
export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [currentView, setCurrentView] = useState<string>('login');

  const navigateTo = (view: string) => {
    if (typeof view !== 'string') return;
    setCurrentView(view);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <StoreContext.Provider value={{ user, setUser, currentView, navigateTo }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore 必須在 StoreProvider 內部呼叫，請檢查水管配置');
  }
  return context;
}
