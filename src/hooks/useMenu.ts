import { useState, useCallback } from 'react';
import { MenuItem } from '../types';
import { menuData, defaultCategories } from '../data/menu';

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(menuData);
  const [categories, setCategories] = useState<string[]>(defaultCategories);

  const addProduct = useCallback((product: Omit<MenuItem, 'id'>) => {
    const newProduct: MenuItem = {
      ...product,
      id: Date.now().toString(),
    };
    setMenuItems(prev => [...prev, newProduct]);
  }, []);

  const updateProduct = useCallback((id: string, product: Omit<MenuItem, 'id'>) => {
    setMenuItems(prev => prev.map(item =>
      item.id === id ? { ...product, id } : item
    ));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const addCategory = useCallback((categoryName: string) => {
    if (!categories.includes(categoryName)) {
      setCategories(prev => [...prev, categoryName]);
    }
  }, [categories]);

  const updateCategory = useCallback((oldName: string, newName: string) => {
    if (oldName === newName) return;
    
    // Atualiza a categoria na lista
    setCategories(prev => prev.map(cat => cat === oldName ? newName : cat));
    
    // Atualiza todos os produtos que usam essa categoria
    setMenuItems(prev => prev.map(item =>
      item.category === oldName ? { ...item, category: newName } : item
    ));
  }, []);

  const deleteCategory = useCallback((categoryName: string) => {
    // Remove a categoria
    setCategories(prev => prev.filter(cat => cat !== categoryName));
    
    // Remove todos os produtos dessa categoria
    setMenuItems(prev => prev.filter(item => item.category !== categoryName));
  }, []);
  return {
    menuItems,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};