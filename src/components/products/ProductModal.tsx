import { X, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uk-UA').format(price);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-neutral-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-neutral-900">Деталі товару</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-6">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800';
              }}
            />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-primary-600 font-semibold uppercase tracking-wide">{product.brand}</p>
              <h1 className="text-3xl font-bold text-neutral-900 mt-2">{product.name}</h1>
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-neutral-500">(0 відгуків)</span>
              </div>
            </div>

            <div className="flex items-baseline space-x-3">
              <span className="text-4xl font-bold text-primary-600">{formatPrice(product.price)} ₴</span>
              <span className="text-neutral-500">{product.volume} мл</span>
            </div>

            {product.description_full && (
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Опис</h3>
                <p className="text-neutral-600 leading-relaxed">{product.description_full}</p>
              </div>
            )}

            {product.concentration && (
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Характеристики</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Концентрація:</span>
                    <span className="font-medium">{product.concentration}</span>
                  </div>
                  {product.longevity && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Стійкість:</span>
                      <span className="font-medium">{product.longevity}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Категорія:</span>
                    <span className="font-medium capitalize">{product.category === 'women' ? 'Жіноча' : product.category === 'men' ? 'Чоловіча' : 'Унісекс'}</span>
                  </div>
                </div>
              </div>
            )}

            {(product.notes_top || product.notes_heart || product.notes_base) && (
              <div>
                <h3 className="font-semibold text-neutral-900 mb-3">Піраміда аромату</h3>
                <div className="space-y-3">
                  {product.notes_top && (
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Верхні ноти</p>
                      <p className="text-sm text-neutral-700">{product.notes_top}</p>
                    </div>
                  )}
                  {product.notes_heart && (
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Серцеві ноти</p>
                      <p className="text-sm text-neutral-700">{product.notes_heart}</p>
                    </div>
                  )}
                  {product.notes_base && (
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Базові ноти</p>
                      <p className="text-sm text-neutral-700">{product.notes_base}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex space-x-3 pt-4 border-t border-neutral-200">
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                disabled={!product.in_stock}
                className="flex-1 bg-neutral-900 hover:bg-primary-600 text-white py-4 rounded-xl transition-all font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={20} />
                <span>{product.in_stock ? 'Додати в кошик' : 'Немає в наявності'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
