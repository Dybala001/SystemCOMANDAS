import React from 'react';
import { ChefHat, Settings, Users, FolderOpen } from 'lucide-react';

interface HeaderProps {
  ordersCount: number;
  onOpenProductManager: () => void;
  onOpenCategoryManager: () => void;
}

export const Header: React.FC<HeaderProps> = ({ ordersCount, onOpenProductManager, onOpenCategoryManager }) => {
  return (
    <header className="bg-white shadow-lg border-b-4 border-orange-500">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-500 p-2 rounded-lg">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">RestaurantePro</h1>
              <p className="text-gray-600">Sistema de Comandas</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenProductManager}
              className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Settings className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Gerenciar Produtos</span>
            </button>
            <button
              onClick={onOpenCategoryManager}
              className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <FolderOpen className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Gerenciar Categorias</span>
            </button>
            <div className="bg-blue-100 px-4 py-2 rounded-lg flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-orange-800 font-semibold">
                {ordersCount} comandas
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">
                {new Date().toLocaleDateString('pt-BR')}
              </div>
              <div className="text-sm text-gray-600">
                {new Date().toLocaleTimeString('pt-BR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};