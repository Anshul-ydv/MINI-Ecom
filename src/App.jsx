import { useState } from 'react';
import { ShopProvider } from './context/ShopContext';
import Header from './components/Header';
import Filters from './components/Filters';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <ShopProvider>
      <div className="app">
        <Header onOpenCart={() => setIsCartOpen(true)} />
        <Filters />
        <ProductList />
        {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
      </div>
    </ShopProvider>
  );
}

export default App;
