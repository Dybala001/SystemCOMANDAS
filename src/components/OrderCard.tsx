import React from 'react';
import { Clock, Trash2, X, Plus, Minus } from 'lucide-react';
import { Order } from '../types';

interface OrderCardProps {
  order: Order;
  onDeleteOrder: (orderId: string) => void;
  onRemoveItem: (orderId: string, itemId: string) => void;
  onUpdateItemQuantity: (orderId: string, itemId: string, newQuantity: number) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onDeleteOrder,
  onRemoveItem,
  onUpdateItemQuantity,
}) => {
  const elapsedTime = Math.floor((Date.now() - order.createdAt.getTime()) / 1000 / 60);

  const handleQuantityChange = (itemId: string, change: number) => {
    const item = order.items.find(i => i.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        onUpdateItemQuantity(order.id, itemId, newQuantity);
      } else {
        onRemoveItem(order.id, itemId);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:shadow-xl transition-shadow">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-500 text-white px-4 py-2 rounded-full font-bold text-lg">
              {order.customerName}
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{elapsedTime}min</span>
            </div>
          </div>
          
          <button
            onClick={() => onDeleteOrder(order.id)}
            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            title="Excluir comanda"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="space-y-3 mb-4">
          {order.items.map(item => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">
                    {item.quantity}x {item.menuItem.name}
                  </h4>
                  {item.notes && (
                    <p className="text-sm text-gray-600 mt-1">Obs: {item.notes}</p>
                  )}
                  <span className="text-orange-600 font-semibold">
                    R$ {(item.menuItem.price * item.quantity).toFixed(2)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="w-7 h-7 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                    title="Diminuir quantidade"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  
                  <span className="w-8 text-center font-semibold text-gray-700">
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="w-7 h-7 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors"
                    title="Aumentar quantidade"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                  
                  <button
                    onClick={() => onRemoveItem(order.id, item.id)}
                    className="w-7 h-7 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors ml-2"
                    title="Remover item"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t pt-4">
          <div className="text-lg font-bold text-gray-800 text-center">
            Total: <span className="text-orange-600">R$ {order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};