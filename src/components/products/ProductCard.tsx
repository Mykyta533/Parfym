import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onClick }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uk-UA').format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer">
      <div className="relative overflow-hidden aspect-square bg-neutral-100" onClick={() => onClick(product)}>
        <img
          src={product.image_url}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400';
          }}
        />
        {!product.in_stock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-neutral-900 text-white px-4 py-2 rounded-lg font-semibold">
              Немає в наявності
            </span>
          </div>
        )}
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-primary-50">
          <Heart size={18} className="text-neutral-700" />
        </button>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-500 uppercase tracking-wide">{product.brand}</span>
          <span className="text-xs text-neutral-400">{product.volume} мл</span>
        </div>

        <h3 className="text-lg font-semibold text-neutral-900 line-clamp-1" onClick={() => onClick(product)}>
          {product.name}
        </h3>

        {product.description_short && (
          <p className="text-sm text-neutral-600 line-clamp-2">{product.description_short}</p>
        )}

        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-2xl font-bold text-primary-600">{formatPrice(product.price)} ₴</p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          disabled={!product.in_stock}
          className="w-full bg-neutral-900 hover:bg-primary-600 text-white py-3 rounded-lg transition-all font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-900"
        >
          <ShoppingCart size={18} />
          <span>У кошик</span>
        </button>
      </div>
    </div>
  );
}
