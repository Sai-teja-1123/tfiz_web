import React from 'react';
import { ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-black/5 group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <div className="h-80 overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onAddToCart(product)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-black hover:text-white transition-colors"
          >
            <ShoppingBag size={18} />
          </button>
          <button 
            onClick={() => onViewDetails(product)}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-black hover:text-white transition-colors"
          >
            <Eye size={18} />
          </button>
        </div>
        {product.isLimited && (
          <div className="absolute top-4 left-4">
            <span className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              Limited
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-xl">{product.name}</h3>
          <span className="text-sm font-bold">₹{product.price}</span>
        </div>
        <p className="text-sm text-black/50 mb-4 line-clamp-1">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">{product.category}</span>
          <button 
            onClick={() => onAddToCart(product)}
            className="text-xs font-bold uppercase tracking-widest hover:text-black/60 transition-colors"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};
