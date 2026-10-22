import { useCallback } from 'react';

export const useFavorites = () => {
  const STORAGE_KEY = 'toolbox_lab_favorites';

  const getFavorites = useCallback((): string[] => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading favorites:', e);
      return [];
    }
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    const favorites = getFavorites();
    const newFavorites = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
  }, [getFavorites]);

  const isFavorite = useCallback((id: string) => {
    return getFavorites().includes(id);
  }, [getFavorites]);

  return { getFavorites, toggleFavorite, isFavorite };
};
