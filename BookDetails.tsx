
import { Star, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Book } from '../pages/Index';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface BookDetailsProps {
  book: Book;
  onAddToCart: (book: Book) => void;
  onBackToHome: () => void;
}

const BookDetails = ({ book, onAddToCart, onBackToHome }: BookDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center space-x-1">
        {[...Array(fullStars)].map((_, index) => (
          <Star key={index} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <Star className="h-5 w-5 text-yellow-400" />
        )}
        <span className="text-lg text-gray-600 ml-2">({rating})</span>
      </div>
    );
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(book);
    }
    
    toast({
      title: "Added to Cart!",
      description: `${quantity} ${quantity > 1 ? 'copies' : 'copy'} of "${book.title}" added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={onBackToHome}
        className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 mb-8 transition-colors duration-300"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="font-medium">Back to Books</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Book Image */}
        <div className="flex justify-center">
          <div className="relative group">
            <img
              src={book.image}
              alt={book.title}
              className="w-full max-w-md h-auto rounded-2xl shadow-2xl group-hover:shadow-3xl transition-shadow duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl" />
          </div>
        </div>

        {/* Book Information */}
        <div className="space-y-6">
          {/* Genre Badge */}
          <div>
            <span className="inline-block bg-amber-100 text-amber-800 text-sm font-semibold px-4 py-2 rounded-full">
              {book.genre}
            </span>
          </div>

          {/* Title and Author */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              {book.title}
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              by {book.author}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-4">
            {renderStars(book.rating)}
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">4.2k reviews</span>
          </div>

          {/* Price */}
          <div className="text-4xl font-bold text-amber-600">
            ${book.price}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {book.description}
            </p>
          </div>

          {/* Book Details */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Book Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">ISBN:</span>
                <p className="text-gray-900">{book.isbn}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Pages:</span>
                <p className="text-gray-900">{book.pages}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Publisher:</span>
                <p className="text-gray-900">{book.publisher}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Published:</span>
                <p className="text-gray-900">{new Date(book.publishedDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Add to Cart Section */}
          <div className="bg-white border-2 border-amber-200 rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-4">
              <label htmlFor="quantity" className="font-medium text-gray-700">
                Quantity:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                {[...Array(10)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart - ${(book.price * quantity).toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
