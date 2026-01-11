// /components/ProductCard.jsx
'use client'; // If using Next.js 13+ App Router

import { getProductImage } from '@/utils/imageHelpers';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const imageUrl = getProductImage(product);
  
  return (
    <div className="product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.slug}`}>
        <div className="image-container aspect-square overflow-hidden bg-gray-100">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = 
                  '<div class="w-full h-full flex items-center justify-center text-gray-400">Image not available</div>';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-2xl font-bold text-gray-900 mb-2">
            £{product.price.toFixed(2)}
          </p>
          <div className="flex justify-between items-center">
            <span className={`text-sm px-2 py-1 rounded ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}