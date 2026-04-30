import './globals.css';
import Header from '@/component/Header';
import { CartProvider } from '@/lib/cartContext';
import CartModal from '@/component/marketplace/CartModal';

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header/>
          {children}
          <CartModal />
        </CartProvider>
      </body>
    </html>
  );
}
