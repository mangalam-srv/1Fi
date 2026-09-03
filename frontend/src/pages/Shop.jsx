import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';

const tabs = [
  { id: 'top-brands', label: 'Top Brands', href: '#' },
  { id: 'nearby-stores', label: 'Nearby Stores', href: '#' },
  { id: 'marketplace', label: '1Fi Marketplace', href: '/shop/marketplace' },
];

export default function Shop() {
  const [activeTab, setActiveTab] = useState('marketplace');
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (tab) => {
    if (tab.id === 'marketplace') {
      setActiveTab(tab.id);
      navigate(tab.href);
    } else {
      setActiveTab(tab.id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
          <p className="text-gray-600 mt-1">Discover products with smart EMI plans</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-card">
          <div className="border-b border-gray-100">
            <nav className="flex" role="tablist" aria-label="Shop sections">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`${tab.id}-panel`}
                  id={`${tab.id}-tab`}
                  onClick={() => handleTabClick(tab)}
                  className={`flex-1 py-4 px-6 text-sm font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary-600 rounded-full" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'marketplace' && (
              <ErrorBoundary>
                <MarketplaceTab onNavigate={(href) => navigate(href)} />
              </ErrorBoundary>
            )}
            {activeTab === 'top-brands' && (
              <EmptyTab title="Top Brands" description="Explore top brands and their latest products with exclusive EMI offers." />
            )}
            {activeTab === 'nearby-stores' && (
              <EmptyTab title="Nearby Stores" description="Find 1Fi partner stores near you for in-person assistance and demos." />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketplaceTab({ onNavigate }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL || '/api';

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(`${API_BASE}/products`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      } else {
        setError(data.message || 'Failed to fetch products');
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request timed out. Please try again.');
      } else {
        console.error('Failed to fetch products:', err);
        setError('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">1Fi Marketplace</h2>
            <p className="text-gray-600 mt-1">Browse products with flexible EMI plans backed by mutual funds</p>
          </div>
        </div>
        <ProductGridSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
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
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">1Fi Marketplace</h2>
          <p className="text-gray-600 mt-1">Browse products with flexible EMI plans backed by mutual funds</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            className="px-4 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
          <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            Filters
          </button>
        </div>
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
            <ProductCard key={product._id} product={product} onClick={() => onNavigate(`/products/${product.slug}`)} />
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
  );
}

MarketplaceTab.hasFetched = false;

function ProductCard({ product, onClick }) {
  const defaultVariant = product.variants?.[0];
  const price = defaultVariant?.price || 0;
  const image = defaultVariant?.image || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80';

  return (
    <article
      role="listitem"
      onClick={onClick}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-primary-200 hover:shadow-soft transition-all duration-300 cursor-pointer"
    >
      <div className="aspect-square bg-gray-50 relative overflow-hidden">
        <img
          src={image}
          alt={`${product.name} - ${product.brand}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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

function EmptyTab({ title, description }) {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-100 text-primary-600 mb-6">
        <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      <p className="text-sm text-gray-500"></p>
    </div>
  );
}