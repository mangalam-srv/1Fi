import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLoading } from '../components/LoadingScreen';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export default function Marketplace() {
  const { startLoading, stopLoading } = useLoading();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    startLoading();
    setLoading(true);
    try {
      setError(null);
      const response = await fetch(`${API_BASE}/products`);
      if (!response.ok) throw new Error('Unable to load products');
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      } else {
        setError(data.message || 'Failed to fetch products');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
      stopLoading();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">1Fi Marketplace</h1>
            <p className="text-gray-600 mt-1">Browse products with flexible EMI plans</p>
          </div>
          <ProductGridSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-100 text-red-600 mb-4">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Products</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button onClick={fetchProducts} className="px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7fb]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-[#5d1ac8] to-[#8e41ee] p-5 text-white shadow-soft">
          <p className="text-[10px] font-bold tracking-[.18em] text-white/75">1FI MARKETPLACE</p>
          <h1 className="mt-1 text-2xl font-extrabold">Shop now. Pay with ease.</h1>
          <p className="mt-1 text-sm text-white/80">Choose a product, then select the EMI that fits you.</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{products.length}</span> products
          </p>
          <span className="rounded-full bg-[#eee7ff] px-3 py-2 text-xs font-bold text-[#6d28d9]">EMI from ₹{products[0]?.variants?.[0]?.emiPlans?.[0]?.monthlyAmount?.toLocaleString() || '—'}/mo</span>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-100 text-primary-600 mb-6">
              <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h2>
            <p className="text-gray-600">There are no products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Products">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {products.length > 0 && (
          <div className="mt-10 text-center">
            <button className="px-6 py-3 border-2 border-gray-200 text-gray-600 font-medium rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const defaultVariant = product.variants?.[0];
  const price = defaultVariant?.price || 0;
  const image = defaultVariant?.image || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80';

  return (
    <article
      role="listitem"
      className="group bg-white rounded-2xl border border-[#eeeaf4] overflow-hidden shadow-card hover:border-primary-200 hover:shadow-soft transition-all duration-300"
    >
      <Link to={`/products/${product.slug}`} className="block">
        <div className="aspect-[4/3] bg-[#faf9fc] relative overflow-hidden">
          <img
            src={image}
            alt={`${product.name} - ${product.brand}`}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="p-5">
          <p className="text-sm text-primary-600 font-medium mb-1">{product.brand}</p>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-gray-900">₹{price.toLocaleString()}</p>
            <span className="text-sm text-primary-600 font-medium">View EMI Plans →</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-busy="true" aria-label="Loading products">
      {[...Array(6)].map((_, i) => (
        <article key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
          <div className="aspect-square bg-gray-100" />
          <div className="p-5 space-y-3">
            <div className="h-4 w-24 bg-gray-100 rounded" />
            <div className="h-5 w-3/4 bg-gray-100 rounded" />
            <div className="h-6 w-20 bg-gray-100 rounded" />
          </div>
        </article>
      ))}
    </div>
  );
}
