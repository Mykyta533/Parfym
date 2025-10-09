import { useEffect, useState } from 'react';
import { Product, CartItem } from './types';
import { supabase } from './lib/supabase';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProductList from './components/products/ProductList';
import ProductModal from './components/products/ProductModal';
import CartModal from './components/cart/CartModal';
import CheckoutModal from './components/cart/CheckoutModal';
import { Sparkles, TrendingUp, Tag } from 'lucide-react';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [filter, setFilter] = useState<'all' | 'women' | 'men' | 'unisex'>('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('popularity_score', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const filteredProducts = products.filter((p) =>
    filter === 'all' ? true : p.category === filter
  );

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header cart={cart} onCartClick={() => setShowCart(true)} onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
                Відкрийте світ<br />
                <span className="text-primary-400">розкішних ароматів</span>
              </h1>
              <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
                Оригінальна парфумерія від провідних світових брендів. Швидка доставка по всій Україні.
              </p>
              <button
                onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
              >
                Переглянути каталог
              </button>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white border-b border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <Sparkles className="text-primary-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">Тільки оригінали</h3>
                  <p className="text-sm text-neutral-600">Гарантуємо автентичність кожного аромату</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <TrendingUp className="text-primary-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">Швидка доставка</h3>
                  <p className="text-sm text-neutral-600">Нова Пошта, Укрпошта або кур'єр</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <Tag className="text-primary-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">Вигідні ціни</h3>
                  <p className="text-sm text-neutral-600">Регулярні акції та спеціальні пропозиції</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="catalog" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4">
                Наш каталог
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Підберіть ідеальний аромат, який підкреслить вашу індивідуальність
              </p>
            </div>

            <div className="flex justify-center space-x-2 mb-8 flex-wrap gap-2">
              {[
                { value: 'all', label: 'Всі' },
                { value: 'women', label: 'Жіночі' },
                { value: 'men', label: 'Чоловічі' },
                { value: 'unisex', label: 'Унісекс' },
              ].map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setFilter(cat.value as any)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    filter === cat.value
                      ? 'bg-neutral-900 text-white'
                      : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <ProductList
              products={filteredProducts}
              onAddToCart={addToCart}
              onProductClick={setSelectedProduct}
              loading={loading}
            />
          </div>
        </section>
      </main>

      <Footer />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {showCart && (
        <CartModal
          cart={cart}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={() => {
            setShowCart(false);
            setShowCheckout(true);
          }}
        />
      )}

      {showCheckout && (
        <CheckoutModal
          cart={cart}
          onClose={() => setShowCheckout(false)}
          onSuccess={clearCart}
        />
      )}
    </div>
  );
}

export default App;
