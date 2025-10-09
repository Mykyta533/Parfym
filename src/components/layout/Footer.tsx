import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary-400 mb-4">PARFUM boutique</h3>
            <p className="text-sm text-neutral-400">
              Ваш особистий світ розкішних ароматів. Оригінальна парфумерія від провідних брендів світу.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Навігація</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#catalog" className="hover:text-primary-400 transition-colors">Каталог</a></li>
              <li><a href="#about" className="hover:text-primary-400 transition-colors">Про нас</a></li>
              <li><a href="#delivery" className="hover:text-primary-400 transition-colors">Доставка і оплата</a></li>
              <li><a href="#contact" className="hover:text-primary-400 transition-colors">Контакти</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Контакти</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-primary-400" />
                <span>+380 (50) 123-45-67</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-primary-400" />
                <span>info@parfum.ua</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="text-primary-400 mt-1" />
                <span>м. Київ, вул. Хрещатик, 1</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Соціальні мережі</h4>
            <div className="flex space-x-3">
              <a href="#" className="p-2 bg-neutral-800 hover:bg-primary-500 rounded-lg transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 bg-neutral-800 hover:bg-primary-500 rounded-lg transition-all">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-sm text-neutral-500">
          <p>&copy; {new Date().getFullYear()} PARFUM boutique. Усі права захищені.</p>
        </div>
      </div>
    </footer>
  );
}
