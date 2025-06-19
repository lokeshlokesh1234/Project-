
import { ShoppingCart, Book, Home } from 'lucide-react';

interface HeaderProps {
  currentPage: 'home' | 'book-details' | 'cart';
  cartItemCount: number;
  onNavigateHome: () => void;
  onNavigateCart: () => void;
}

const Header = ({ currentPage, cartItemCount, onNavigateHome, onNavigateCart }: HeaderProps) => {
  return (
    <header className="bg-white shadow-lg border-b-2 border-amber-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={onNavigateHome}
          >
            <Book className="h-8 w-8 text-amber-600" />
            <h1 className="text-2xl font-bold text-amber-800">BookHaven</h1>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={onNavigateHome}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                currentPage === 'home' 
                  ? 'bg-amber-600 text-white shadow-lg' 
                  : 'text-amber-700 hover:bg-amber-100'
              }`}
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Home</span>
            </button>
            
            <button
              onClick={onNavigateCart}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 relative ${
                currentPage === 'cart' 
                  ? 'bg-amber-600 text-white shadow-lg' 
                  : 'text-amber-700 hover:bg-amber-100'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="font-medium">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={onNavigateHome}
              className={`p-2 rounded-lg ${
                currentPage === 'home' 
                  ? 'bg-amber-600 text-white' 
                  : 'text-amber-700 hover:bg-amber-100'
              }`}
            >
              <Home className="h-6 w-6" />
            </button>
            
            <button
              onClick={onNavigateCart}
              className={`p-2 rounded-lg relative ${
                currentPage === 'cart' 
                  ? 'bg-amber-600 text-white' 
                  : 'text-amber-700 hover:bg-amber-100'
              }`}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
