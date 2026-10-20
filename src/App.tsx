/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Page, Product, CartItem, Vibe, Category, Order, PaymentSettings, PromoCode } from './types';
import { PRODUCTS } from './data/products';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { LookbookPage } from './pages/LookbookPage';
import { CartCheckoutPage } from './pages/CartCheckoutPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { VibeFinderModal } from './components/VibeFinderModal';
import { Check, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation Page state
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Products state (persisted so admin edits and additions take effect everywhere)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('auraplus_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return PRODUCTS;
  });

  // Selected Product for PDP
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0] || PRODUCTS[0]);

  // Shop Filter State (when arriving from other pages)
  const [shopCategory, setShopCategory] = useState<Category>('ALL');
  const [shopVibe, setShopVibe] = useState<Vibe | null>(null);

  // Vibe Finder Modal state
  const [isVibeFinderOpen, setIsVibeFinderOpen] = useState(false);

  // Global Add to Cart Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Payment settings state
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>(() => {
    try {
      const saved = localStorage.getItem('auraplus_payment_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      upiEnabled: true,
      upiId: 'auraplus@okhdfcbank',
      codEnabled: true,
      cardEnabled: true,
      netBankingEnabled: true,
      walletsEnabled: true,
      freeShippingThreshold: 799,
    };
  });

  // Promo codes state
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(() => {
    try {
      const saved = localStorage.getItem('auraplus_promo_codes');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      { code: 'AURA10', discountPercent: 10, active: true, description: '10% off on all drops' },
      { code: 'GENZ20', discountPercent: 20, active: true, description: '20% VIP street discount' },
      { code: 'FREESHIP', discountPercent: 12, active: true, description: 'Equivalent free shipping reduction' },
    ];
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('auraplus_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Initial realistic mock orders for admin demonstration
    return [
      {
        id: 'AP-92841',
        createdAt: '19 Oct 2026, 05:30 PM',
        customer: {
          fullName: 'Tanmay Mehta',
          email: 'tanmay.m@gmail.com',
          phone: '+91 98201 44512',
          address: 'Flat 304, Silver Beach Apts, Juhu Tara Road',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400049',
        },
        items: [
          { productId: 'cherry-pop', name: 'CHERRY POP', size: 'M', price: 399, quantity: 2 },
          { productId: 'lime-crush', name: 'LIME CRUSH', size: 'L', price: 399, quantity: 1 },
        ],
        subtotal: 1197,
        discount: 120,
        shipping: 0,
        total: 1077,
        paymentMethod: 'UPI',
        paymentStatus: 'Paid',
        orderStatus: 'Processing',
      },
      {
        id: 'AP-81932',
        createdAt: '19 Oct 2026, 03:15 PM',
        customer: {
          fullName: 'Kavya Raman',
          email: 'kavya.r@outlook.com',
          phone: '+91 99800 23119',
          address: '42, 12th Main, 4th Cross, Indiranagar',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560038',
        },
        items: [
          { productId: 'midnight-chaos', name: 'MIDNIGHT CHAOS', size: 'M', price: 449, quantity: 1 },
        ],
        subtotal: 449,
        discount: 0,
        shipping: 99,
        total: 548,
        paymentMethod: 'COD',
        paymentStatus: 'Pending COD',
        orderStatus: 'Packed',
      },
    ];
  });

  // Cart state with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('auraplus_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default starter item
    return [
      {
        product: PRODUCTS[0],
        size: 'M',
        quantity: 1,
      },
      {
        product: PRODUCTS[1],
        size: 'L',
        quantity: 1,
      },
    ];
  });

  // Wishlist state with localStorage persistence
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('auraplus_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['cherry-pop', 'midnight-chaos'];
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('auraplus_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('auraplus_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('auraplus_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('auraplus_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('auraplus_payment_settings', JSON.stringify(paymentSettings));
    } catch (e) {
      console.error(e);
    }
  }, [paymentSettings]);

  useEffect(() => {
    try {
      localStorage.setItem('auraplus_promo_codes', JSON.stringify(promoCodes));
    } catch (e) {
      console.error(e);
    }
  }, [promoCodes]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add to cart handler
  const handleAddToCart = (
    product: Product,
    size: 'S' | 'M' | 'L' | 'XL',
    quantity: number = 1
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, size, quantity }];
    });
    showToast(`ADDED ${product.name} (SIZE ${size}) TO YOUR FIT ✦`);
  };

  // Update quantity in cart
  const handleUpdateQuantity = (productId: string, size: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  // Remove from cart
  const handleRemoveFromCart = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  // Move from cart to wishlist
  const handleMoveToWishlist = (product: Product, size: string) => {
    handleRemoveFromCart(product.id, size);
    if (!wishlistIds.includes(product.id)) {
      setWishlistIds((prev) => [...prev, product.id]);
    }
    showToast(`MOVED ${product.name} TO WISHLIST ♡`);
  };

  // Add bundle stack to cart
  const handleAddStackToCart = (
    items: { product: Product; size: 'M'; quantity: number }[]
  ) => {
    setCart((prev) => {
      let updated = [...prev];
      items.forEach((newItem) => {
        const existingIndex = updated.findIndex(
          (c) => c.product.id === newItem.product.id && c.size === newItem.size
        );
        if (existingIndex > -1) {
          updated[existingIndex].quantity += newItem.quantity;
        } else {
          updated.push(newItem);
        }
      });
      return updated;
    });
    showToast(`ADDED ${items.length}-PAIR SOCK STACK TO YOUR FIT ✦`);
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        showToast(`REMOVED ${product.name} FROM WISHLIST`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`SAVED ${product.name} TO WISHLIST ♡`);
        return [...prev, product.id];
      }
    });
  };

  // Filter Shop by vibe from Home cards
  const handleSelectVibeFilter = (vibe: Vibe) => {
    setShopVibe(vibe);
    setShopCategory('ALL');
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Order placed handler from checkout
  const handlePlaceOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    showToast(`ORDER ${newOrder.id} PLACED SUCCESSFULLY ✦`);
  };

  // Admin Product Actions
  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`UPDATED ${updated.name}`);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast(`PRODUCT DELETED`);
  };

  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    showToast(`NEW DROP PAIR ${newProd.name} ADDED`);
  };

  // Admin Order Status Update
  const handleUpdateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o))
    );
    showToast(`ORDER ${orderId} STATUS UPDATED TO ${status.toUpperCase()}`);
  };

  // Wishlist items array
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#111111] flex flex-col selection:bg-[#B7FF3C] selection:text-black">
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 py-3 px-5 bg-neutral-900 text-white rounded-2xl shadow-2xl border border-neutral-700 flex items-center gap-2.5 animate-bounce font-display font-bold text-xs uppercase tracking-wider">
          <span className="p-1 rounded-full bg-[#B7FF3C] text-black">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navigation */}
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        wishlistItems={wishlistProducts}
        onSelectProduct={handleSelectProduct}
        onRemoveFromWishlist={handleToggleWishlist}
        onQuickAddToCart={(prod, size) => handleAddToCart(prod, size, 1)}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onQuickAdd={(prod, size) => handleAddToCart(prod, size, 1)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddStackToCart={handleAddStackToCart}
            onSelectVibeFilter={handleSelectVibeFilter}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            onSelectProduct={handleSelectProduct}
            onQuickAdd={(prod, size) => handleAddToCart(prod, size, 1)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onOpenVibeFinder={() => setIsVibeFinderOpen(true)}
            initialCategory={shopCategory}
            initialVibe={shopVibe}
          />
        )}

        {currentPage === 'product' && (
          <ProductDetailPage
            product={selectedProduct}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
            onNavigateToLookbook={() => handleNavigate('lookbook')}
          />
        )}

        {currentPage === 'lookbook' && (
          <LookbookPage
            onSelectProduct={handleSelectProduct}
            onNavigateToShop={() => handleNavigate('shop')}
          />
        )}

        {currentPage === 'cart' && (
          <CartCheckoutPage
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromCart}
            onMoveToWishlist={handleMoveToWishlist}
            onQuickAddRecommendation={(prod, size) => handleAddToCart(prod, size, 1)}
            onClearCart={() => setCart([])}
            onNavigateToShop={() => handleNavigate('shop')}
            paymentSettings={paymentSettings}
            promoCodes={promoCodes}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {currentPage === 'admin' && (
          <AdminDashboardPage
            products={products}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onAddProduct={handleAddProduct}
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            paymentSettings={paymentSettings}
            onUpdatePaymentSettings={setPaymentSettings}
            promoCodes={promoCodes}
            onUpdatePromoCodes={setPromoCodes}
            onExitAdmin={() => handleNavigate('home')}
          />
        )}
      </main>

      {/* Vibe Finder Interactive Modal */}
      <VibeFinderModal
        isOpen={isVibeFinderOpen}
        onClose={() => setIsVibeFinderOpen(false)}
        onSelectProduct={handleSelectProduct}
        onShopVibe={handleSelectVibeFilter}
      />
    </div>
  );
}
