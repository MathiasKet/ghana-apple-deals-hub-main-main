import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { ProductProvider } from './contexts/ProductContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Index from './pages/Index';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Account from './pages/Account';
import NotFound from './pages/NotFound';
import { AdminRoutes } from './pages/admin';

function App() {
  return (
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <WishlistProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-confirmation" element={<OrderConfirmation />} />
                    <Route path="/account/*" element={<Account />} />
                    <Route path="*" element={<NotFound />} />
                    
                    {/* Admin Routes */}
                    {AdminRoutes.map((route, index) => (
                      <Route key={index} path={route.path} element={route.element}>
                        {route.children?.map((childRoute, childIndex) => (
                          <Route 
                            key={childIndex} 
                            index={childRoute.index}
                            path={childRoute.path} 
                            element={childRoute.element} 
                          />
                        ))}
                      </Route>
                    ))}
                  </Routes>
                </main>
                <Footer />
              </div>
            </WishlistProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
  );
}

export default App;
