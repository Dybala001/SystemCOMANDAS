import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { MenuItem, OrderItem } from '../types';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateOrder: (customerName: string, items: OrderItem[]) => void;
  menuItems: MenuItem[];
  categories: string[];
}

export const NewOrderModal: React.FC<NewOrderModalProps> = ({
  isOpen,
  onClose,
  onCreateOrder,
  menuItems,
  categories,
}) => {
  const [customerName, setCustomerName] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0] || '');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  if (!isOpen) return null;

  // Se não há categorias, mostra mensagem
  if (categories.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Nova Comanda</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">
              Você precisa criar categorias e produtos antes de fazer uma comanda.
            </p>
            <button
              onClick={onClose}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  }
  const addItemToOrder = (menuItem: MenuItem) => {
    const existingItem = orderItems.find(item => item.menuItem.id === menuItem.id);
    
    if (existingItem) {
      setOrderItems(orderItems.map(item =>
        item.menuItem.id === menuItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      const newOrderItem: OrderItem = {
        id: Date.now().toString(),
        menuItem,
        quantity: 1,
      };
      setOrderItems([...orderItems, newOrderItem]);
    }
  };

  const updateItemQuantity = (itemId: string, change: number) => {
    setOrderItems(orderItems.map(item => {
      if (item.menuItem.id === itemId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleCreateOrder = () => {
    if (orderItems.length > 0 && customerName.trim()) {
      onCreateOrder(customerName.trim(), orderItems);
      setOrderItems([]);
      setCustomerName('');
      onClose();
    }
  };

  const total = orderItems.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b bg-orange-50">
          <h2 className="text-2xl font-bold text-gray-800">Nova Comanda</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-[calc(90vh-140px)]">
          {/* Menu Section */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Cliente
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Digite o nome do cliente"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuItems
                .filter(item => item.category === selectedCategory)
                .map(item => {
                  const orderItem = orderItems.find(oi => oi.menuItem.id === item.id);
                  return (
                    <div
                      key={item.id}
                      className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => addItemToOrder(item)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                          {item.description && (
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          )}
                          <p className="text-lg font-bold text-orange-600 mt-2">
                            R$ {item.price.toFixed(2)}
                          </p>
                        </div>
                        {orderItem && (
                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateItemQuantity(item.id, -1);
                              }}
                              className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center font-semibold">
                              {orderItem.quantity}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateItemQuantity(item.id, 1);
                              }}
                              className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-80 bg-gray-50 p-6 border-l">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumo do Pedido</h3>
            
            {orderItems.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Nenhum item selecionado
              </p>
            ) : (
              <>
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {orderItems.map(item => (
                    <div key={item.id} className="bg-white p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.menuItem.name}</h4>
                          <p className="text-orange-600 font-semibold">
                            {item.quantity}x R$ {item.menuItem.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1 ml-2">
                          <button
                            onClick={() => updateItemQuantity(item.menuItem.id, -1)}
                            className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => updateItemQuantity(item.menuItem.id, 1)}
                            className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-orange-600">R$ {total.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
            
            <button
              onClick={handleCreateOrder}
              disabled={orderItems.length === 0 || !customerName.trim()}
              className="w-full mt-4 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Criar Comanda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};