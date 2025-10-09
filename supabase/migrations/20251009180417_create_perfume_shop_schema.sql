/*
  # Створення схеми бази даних для магазину парфумерії

  ## Нові таблиці
  
  ### `products` - Товари
    - `id` (uuid, primary key)
    - `name` (text) - назва товару
    - `brand` (text) - бренд
    - `category` (text) - категорія (women/men/unisex)
    - `price` (numeric) - ціна в гривнях
    - `currency` (text) - валюта (UAH)
    - `volume` (integer) - об'єм в мл
    - `concentration` (text) - концентрація аромату
    - `longevity` (text) - стійкість
    - `notes_top` (text) - верхні ноти
    - `notes_heart` (text) - серцеві ноти
    - `notes_base` (text) - базові ноти
    - `description_short` (text) - короткий опис
    - `description_full` (text) - повний опис
    - `image_url` (text) - посилання на зображення
    - `in_stock` (boolean) - в наявності
    - `popularity_score` (integer) - популярність
    - `created_at`, `updated_at` (timestamptz)

  ### `orders` - Замовлення
    - `id` (uuid, primary key)
    - `customer_name` (text) - ім'я клієнта
    - `customer_phone` (text) - телефон
    - `customer_email` (text) - email
    - `delivery_address` (text) - адреса доставки
    - `delivery_method` (text) - спосіб доставки
    - `status` (text) - статус замовлення
    - `total_amount` (numeric) - загальна сума
    - `currency` (text)
    - `created_at`, `updated_at` (timestamptz)

  ### `order_items` - Товари в замовленні
    - `id` (uuid, primary key)
    - `order_id` (uuid, foreign key)
    - `product_id` (uuid, foreign key)
    - `product_name` (text)
    - `quantity` (integer)
    - `price_at_order` (numeric)
    - `created_at` (timestamptz)

  ### `reviews` - Відгуки
    - `id` (uuid, primary key)
    - `product_id` (uuid, foreign key)
    - `user_name` (text)
    - `rating` (integer) - оцінка 1-5
    - `comment` (text)
    - `created_at` (timestamptz)

  ## Безпека
    - Увімкнено RLS для всіх таблиць
    - Публічний доступ на читання товарів та відгуків
    - Будь-хто може створювати замовлення
    - Тільки адміністратори можуть керувати товарами та замовленнями
*/

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('women', 'men', 'unisex')),
  price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'UAH',
  volume INTEGER NOT NULL DEFAULT 50,
  concentration TEXT,
  longevity TEXT,
  notes_top TEXT,
  notes_heart TEXT,
  notes_base TEXT,
  description_short TEXT,
  description_full TEXT,
  image_url TEXT DEFAULT '/assets/placeholder.jpg',
  in_stock BOOLEAN DEFAULT true,
  popularity_score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_popularity ON products(popularity_score DESC);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  delivery_address TEXT NOT NULL,
  delivery_method TEXT CHECK (delivery_method IN ('nova_poshta', 'courier', 'ukrposhta')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  total_amount NUMERIC(10, 2) NOT NULL,
  currency TEXT DEFAULT 'UAH',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price_at_order NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Products policies: public read, admin write
CREATE POLICY "Public can view products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt()->>'role')::text = 'admin');

CREATE POLICY "Admins can update products"
  ON products FOR UPDATE
  TO authenticated
  USING ((auth.jwt()->>'role')::text = 'admin')
  WITH CHECK ((auth.jwt()->>'role')::text = 'admin');

CREATE POLICY "Admins can delete products"
  ON products FOR DELETE
  TO authenticated
  USING ((auth.jwt()->>'role')::text = 'admin');

-- Orders policies: anyone can create, admins can view/update
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT
  TO authenticated
  USING ((auth.jwt()->>'role')::text = 'admin');

CREATE POLICY "Admins can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING ((auth.jwt()->>'role')::text = 'admin')
  WITH CHECK ((auth.jwt()->>'role')::text = 'admin');

-- Order items policies
CREATE POLICY "Anyone can insert order_items"
  ON order_items FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view order_items"
  ON order_items FOR SELECT
  TO authenticated
  USING ((auth.jwt()->>'role')::text = 'admin');

-- Reviews policies: public read, authenticated write
CREATE POLICY "Public can view reviews"
  ON reviews FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (true);