import { useState, useCallback } from 'react';
import { Order, OrderItem } from '../types';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const createOrder = useCallback((customerName: string, items: OrderItem[]) => {
    setOrders(prev => {
      const existingOrderIndex = prev.findIndex(order => 
        order.customerName.toLowerCase() === customerName.toLowerCase()
      );

      if (existingOrderIndex !== -1) {
        // Unifica com a comanda existente
        const existingOrder = prev[existingOrderIndex];
        const mergedItems = [...existingOrder.items];

        // Para cada novo item, verifica se já existe na comanda
        items.forEach(newItem => {
          const existingItemIndex = mergedItems.findIndex(
            item => item.menuItem.id === newItem.menuItem.id
          );

          if (existingItemIndex !== -1) {
            // Se o item já existe, soma as quantidades
            mergedItems[existingItemIndex] = {
              ...mergedItems[existingItemIndex],
              quantity: mergedItems[existingItemIndex].quantity + newItem.quantity
            };
          } else {
            // Se é um item novo, adiciona à lista
            mergedItems.push({
              ...newItem,
              id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
            });
          }
        });

        const newTotal = mergedItems.reduce((sum, item) => 
          sum + (item.menuItem.price * item.quantity), 0
        );

        const updatedOrder: Order = {
          ...existingOrder,
          items: mergedItems,
          total: newTotal,
          createdAt: new Date() // Atualiza o horário para o mais recente
        };

        const newOrders = [...prev];
        newOrders[existingOrderIndex] = updatedOrder;
        return newOrders;
      } else {
        // Cria nova comanda se não existe uma com o mesmo nome
        const total = items.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
        
        const newOrder: Order = {
          id: Date.now().toString(),
          customerName,
          items,
          createdAt: new Date(),
          total,
        };

        return [...prev, newOrder];
      }
    });
  }, []);

  const deleteOrder = useCallback((orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  }, []);

  const removeItemFromOrder = useCallback((orderId: string, itemId: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updatedItems = order.items.filter(item => item.id !== itemId);
        const newTotal = updatedItems.reduce((sum, item) => 
          sum + (item.menuItem.price * item.quantity), 0
        );
        
        return {
          ...order,
          items: updatedItems,
          total: newTotal
        };
      }
      return order;
    }));
  }, []);

  const updateItemQuantity = useCallback((orderId: string, itemId: string, newQuantity: number) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updatedItems = order.items.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        const newTotal = updatedItems.reduce((sum, item) => 
          sum + (item.menuItem.price * item.quantity), 0
        );
        
        return {
          ...order,
          items: updatedItems,
          total: newTotal
        };
      }
      return order;
    }));
  }, []);

  return {
    orders,
    createOrder,
    deleteOrder,
    removeItemFromOrder,
    updateItemQuantity,
  };
};