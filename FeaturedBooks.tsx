
import { Star } from 'lucide-react';
import { Book } from '../pages/Index';

interface FeaturedBooksProps {
  books: Book[];
  onBookClick: (book: Book) => void;
}

const FeaturedBooks = ({ books, onBookClick }: FeaturedBooksProps) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center space-x-1">
        {[...Array(fullStars)].map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <Star className="h-4 w-4 text-yellow-400" />
        )}
        <span className="text-sm text-gray-600 ml-2">({rating})</span>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-amber-900 mb-4">
          Featured Books
        </h2>
        <p className="text-xl text-amber-700 max-w-2xl mx-auto">
          Discover our carefully curated selection of bestsellers, new releases, and timeless classics
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <div
            key={book.id}
            onClick={() => onBookClick(book)}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 overflow-hidden group"
          >
            {/* Book Image */}
            <div className="relative overflow-hidden">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Book Details */}
            <div className="p-6">
              <div className="mb-3">
                <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {book.genre}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors duration-300">
                {book.title}
              </h3>
              
              <p className="text-gray-600 font-medium mb-3">by {book.author}</p>
              
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {book.description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                {renderStars(book.rating)}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-amber-600">
                  ${book.price}
                </span>
                <div className="bg-amber-600 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                  View Details
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h3>
          <p className="text-xl mb-6">Browse our extensive catalog of over 10,000 books across all genres</p>
          <button className="bg-white text-amber-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300">
            Browse All Books
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBooks;
