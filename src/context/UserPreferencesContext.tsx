import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserPreferencesContextType {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

const DEFAULT_CATEGORIES = ['travel', 'games', 'music'];

export const UserPreferencesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('selectedCategories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  useEffect(() => {
    localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
  }, [selectedCategories]);

  return (
    <UserPreferencesContext.Provider value={{ selectedCategories, setSelectedCategories }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
}; 