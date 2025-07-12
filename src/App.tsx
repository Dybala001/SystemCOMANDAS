import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Header } from './components/Header';
import { NewOrderModal } from './components/NewOrderModal';
import { ProductManager } from './components/ProductManager';
import { CategoryManager } from './components/CategoryManager';
import { OrderCard } from './components/OrderCard';
import { useOrders } from './hooks/useOrders';
import { useMenu } from './hooks/useMenu';

function App() {
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [isProductManagerOpen, setIsProductManagerOpen] = useState(false);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);
  const { orders, createOrder, deleteOrder, removeItemFromOrder, updateItemQuantity } = useOrders();
  const { 
    menuItems, 
    categories, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory 
  } = useMenu();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        ordersCount={orders.length}
        onOpenProductManager={() => setIsProductManagerOpen(true)}
        onOpenCategoryManager={() => setIsCategoryManagerOpen(true)}
      />

      <main className="container mx-auto px-6 py-8">
        {/* Action Bar */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Comandas</h2>
            <p className="text-gray-600">
              {orders.length === 0 
                ? 'Nenhuma comanda registrada' 
                : `${orders.length} comanda${orders.length > 1 ? 's' : ''} registrada${orders.length > 1 ? 's' : ''}`
              }
            </p>
          </div>
          
          <button
            onClick={() => setIsNewOrderModalOpen(true)}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center space-x-2 shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span>Nova Comanda</span>
          </button>
        </div>

        {/* Orders Grid */}
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl shadow-lg p-12 max-w-md mx-auto">
              <div className="mb-4">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Plus className="h-8 w-8 text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Nenhuma comanda registrada
              </h3>
              <p className="text-gray-600 mb-6">
                Clique em "Nova Comanda" para começar
              </p>
              <button
                onClick={() => setIsNewOrderModalOpen(true)}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Criar primeira comanda
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {orders
              .sort((a, b) => a.customerName.localeCompare(b.customerName))
              .map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onDeleteOrder={deleteOrder}
                  onRemoveItem={removeItemFromOrder}
                  onUpdateItemQuantity={updateItemQuantity}
                />
              ))}
          </div>
        )}
      </main>

      <NewOrderModal
        isOpen={isNewOrderModalOpen}
        onClose={() => setIsNewOrderModalOpen(false)}
        onCreateOrder={createOrder}
        menuItems={menuItems}
        categories={categories}
      />

      <ProductManager
        isOpen={isProductManagerOpen}
        onClose={() => setIsProductManagerOpen(false)}
        menuItems={menuItems}
        categories={categories}
        onAddProduct={addProduct}
        onUpdateProduct={updateProduct}
        onDeleteProduct={deleteProduct}
      />

      <CategoryManager
        isOpen={isCategoryManagerOpen}
        onClose={() => setIsCategoryManagerOpen(false)}
        categories={categories}
        onAddCategory={addCategory}
        onUpdateCategory={updateCategory}
        onDeleteCategory={deleteCategory}
        menuItems={menuItems}
      />
    </div>
  );
}

export default App;