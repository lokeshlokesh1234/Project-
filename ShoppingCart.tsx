
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '../pages/Index';
import { useState } from 'react';
import CheckoutForm from './CheckoutForm';

interface ShoppingCartProps {
  cartItems: CartItem[];
  onRemoveFromCart: (bookId: number) => void;
  onUpdateQuantity: (bookId: number, quantity: number) => void;
  onBackToHome: () => void;
}

const ShoppingCart = ({ cartItems, onRemoveFromCart, onUpdateQuantity, onBackToHome }: ShoppingCartProps) => {
  const [showCheckout, setShowCheckout] = useState(false);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (showCheckout) {
    return (
      <CheckoutForm
        cartItems={cartItems}
        totalPrice={getTotalPrice()}
        onBackToCart={() => setShowCheckout(false)}
        onBackToHome={onBackToHome}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBackToHome}
          className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 transition-colors duration-300"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Continue Shopping</span>
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900">
          Shopping Cart ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})
        </h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m0 0V9a2 2 0 114 0v4.01" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-600 mb-8">Add some books to get started!</p>
          <button
            onClick={onBackToHome}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Browse Books
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                  {/* Book Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-28 object-cover rounded-lg"
                  />
                  
                  {/* Book Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">by {item.author}</p>
                    <p className="text-amber-600 font-bold text-lg">${item.price}</p>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-300"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-300"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveFromCart(item.id)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Item Total */}
                <div className="mt-4 text-right">
                  <span className="text-lg font-semibold text-gray-900">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
                  <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(getTotalPrice() * 0.08).toFixed(2)}</span>
                </div>
                
                <hr className="my-4" />
                
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-amber-600">${(getTotalPrice() * 1.08).toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Proceed to Checkout
              </button>
              
              <p className="text-sm text-gray-500 text-center mt-4">
                Free shipping on orders over $25
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
