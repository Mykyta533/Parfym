import { ShoppingCart, Menu, Search } from 'lucide-react';
import { CartItem } from '../../types';

interface HeaderProps {
  cart: CartItem[];
  onCartClick: () => void;
  onLogoClick: () => void;
}

export default function Header({ cart, onCartClick, onLogoClick }: HeaderProps) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-neutral-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={onLogoClick} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl font-bold text-primary-400">PARFUM</span>
            <span className="text-sm text-neutral-400">boutique</span>
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#catalog" className="text-neutral-300 hover:text-primary-400 transition-colors">Каталог</a>
            <a href="#about" className="text-neutral-300 hover:text-primary-400 transition-colors">Про нас</a>
            <a href="#contact" className="text-neutral-300 hover:text-primary-400 transition-colors">Контакти</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
              <Search size={20} />
            </button>
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-neutral-800 rounded-lg transition-colors"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                  {totalItems}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 hover:bg-neutral-800 rounded-lg transition-colors">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
