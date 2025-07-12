import { MenuItem } from '../types';

export const menuData: MenuItem[] = [
  // Entradas
  {
    id: '1',
    name: 'Bruschetta Tradicional',
    price: 18.90,
    category: 'Entradas',
    description: 'Pão italiano com tomate, manjericão e azeite'
  },
  {
    id: '2',
    name: 'Bolinho de Bacalhau',
    price: 24.90,
    category: 'Entradas',
    description: '6 unidades com aioli de limão'
  },
  {
    id: '3',
    name: 'Carpaccio de Salmão',
    price: 32.90,
    category: 'Entradas',
    description: 'Salmão defumado com alcaparras e molho mostarda'
  },

  // Pratos Principais
  {
    id: '4',
    name: 'Risotto de Cogumelos',
    price: 45.90,
    category: 'Pratos Principais',
    description: 'Arroz arbóreo com mix de cogumelos e parmesão'
  },
  {
    id: '5',
    name: 'Salmão Grelhado',
    price: 52.90,
    category: 'Pratos Principais',
    description: 'Com purê de batata doce e legumes'
  },
  {
    id: '6',
    name: 'Bife Ancho',
    price: 68.90,
    category: 'Pratos Principais',
    description: '300g com batatas rústicas e molho chimichurri'
  },
  {
    id: '7',
    name: 'Pasta alle Vongole',
    price: 42.90,
    category: 'Pratos Principais',
    description: 'Linguine com vongole ao vinho branco'
  },

  // Sobremesas
  {
    id: '8',
    name: 'Tiramisù',
    price: 16.90,
    category: 'Sobremesas',
    description: 'Clássico italiano com café e mascarpone'
  },
  {
    id: '9',
    name: 'Petit Gateau',
    price: 19.90,
    category: 'Sobremesas',
    description: 'Com sorvete de baunilha'
  },

  // Bebidas
  {
    id: '10',
    name: 'Água Mineral',
    price: 4.90,
    category: 'Bebidas'
  },
  {
    id: '11',
    name: 'Refrigerante',
    price: 6.90,
    category: 'Bebidas'
  },
  {
    id: '12',
    name: 'Suco Natural',
    price: 12.90,
    category: 'Bebidas'
  },
  {
    id: '13',
    name: 'Vinho Tinto - Taça',
    price: 18.90,
    category: 'Bebidas'
  }
];

export const defaultCategories = ['Entradas', 'Pratos Principais', 'Sobremesas', 'Bebidas'];