import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../../types';

interface CartModalProps {
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function CartModal({
  cart,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartModalProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uk-UA').format(price);
  };

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={onClose}>
        <div
          className="bg-white rounded-2xl max-w-md w-full p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full mb-4">
              <ShoppingBag size={32} className="text-neutral-400" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Кошик порожній</h2>
            <p className="text-neutral-600 mb-6">Додайте товари, щоб продовжити покупки</p>
            <button
              onClick={onClose}
              className="w-full bg-neutral-900 hover:bg-primary-600 text-white py-3 rounded-lg transition-all font-semibold"
            >
              Перейти до каталогу
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black bg-opacity-50" onClick={onClose}>
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-neutral-200 p-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-neutral-900">Кошик ({cart.length})</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.map((item) => (
            <div key={item.product.id} className="flex space-x-4 bg-neutral-50 rounded-xl p-4">
              <img
                src={item.product.image_url}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200';
                }}
              />

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-neutral-900 truncate">{item.product.name}</h3>
                <p className="text-sm text-neutral-500">{item.product.brand} • {item.product.volume} мл</p>
                <p className="text-lg font-bold text-primary-600 mt-2">
                  {formatPrice(item.product.price * item.quantity)} ₴
                </p>

                <div className="flex items-center space-x-3 mt-3">
                  <div className="flex items-center space-x-2 bg-white rounded-lg border border-neutral-300">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="p-2 hover:bg-neutral-100 rounded-l-lg transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-3 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="p-2 hover:bg-neutral-100 rounded-r-lg transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 bg-white border-t border-neutral-200 p-4 space-y-4 rounded-b-2xl">
          <div className="flex items-center justify-between text-lg">
            <span className="font-semibold text-neutral-900">Разом:</span>
            <span className="text-2xl font-bold text-primary-600">{formatPrice(total)} ₴</span>
          </div>

          <button
            onClick={() => {
              onCheckout();
              onClose();
            }}
            className="w-full bg-neutral-900 hover:bg-primary-600 text-white py-4 rounded-xl transition-all font-semibold"
          >
            Оформити замовлення
          </button>
        </div>
      </div>
    </div>
  );
}
