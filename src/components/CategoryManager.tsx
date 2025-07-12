import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2, Save } from 'lucide-react';

interface CategoryManagerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  onAddCategory: (categoryName: string) => void;
  onUpdateCategory: (oldName: string, newName: string) => void;
  onDeleteCategory: (categoryName: string) => void;
  menuItems: any[];
}

export const CategoryManager: React.FC<CategoryManagerProps> = ({
  isOpen,
  onClose,
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  menuItems,
}) => {
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState('');

  if (!isOpen) return null;

  const resetForm = () => {
    setFormData('');
    setEditingCategory(null);
    setIsAddingNew(false);
  };

  const handleSave = () => {
    if (!formData.trim()) return;

    if (editingCategory) {
      onUpdateCategory(editingCategory, formData.trim());
    } else {
      onAddCategory(formData.trim());
    }

    resetForm();
  };

  const handleEdit = (categoryName: string) => {
    setFormData(categoryName);
    setEditingCategory(categoryName);
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    resetForm();
    setIsAddingNew(true);
  };

  const handleDelete = (categoryName: string) => {
    const productsInCategory = menuItems.filter(item => item.category === categoryName).length;
    
    if (productsInCategory > 0) {
      if (window.confirm(`Esta categoria tem ${productsInCategory} produto(s). Tem certeza que deseja excluir? Todos os produtos desta categoria também serão removidos.`)) {
        onDeleteCategory(categoryName);
      }
    } else {
      if (window.confirm(`Tem certeza que deseja excluir a categoria "${categoryName}"?`)) {
        onDeleteCategory(categoryName);
      }
    }
  };

  const getProductCount = (categoryName: string) => {
    return menuItems.filter(item => item.category === categoryName).length;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800">Gerenciar Categorias</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="mb-6">
            <button
              onClick={handleAddNew}
              className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Adicionar Categoria</span>
            </button>
          </div>

          {/* Form for adding/editing */}
          {(isAddingNew || editingCategory) && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
              </h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={formData}
                  onChange={(e) => setFormData(e.target.value)}
                  placeholder="Nome da categoria"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSave()}
                />
                <button
                  onClick={handleSave}
                  disabled={!formData.trim()}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Salvar</span>
                </button>
                <button
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Categories List */}
          <div className="space-y-3">
            {categories.map(category => {
              const productCount = getProductCount(category);
              return (
                <div
                  key={category}
                  className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{category}</h3>
                      <p className="text-sm text-gray-600">
                        {productCount} produto{productCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        title="Editar categoria"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        title="Excluir categoria"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {categories.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhuma categoria cadastrada</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};