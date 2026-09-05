import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import ProductCard from '../components/ProductCard';

const tabs = [
  { id: 'top-brands', label: 'Top Brands' },
  { id: 'nearby-stores', label: 'Nearby Stores' },
  { id: 'marketplace', label: '1Fi Marketplace' },
];

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export default function Shop() {
  const [activeTab, setActiveTab] = useState('marketplace');

  return (
    <div className="min-h-screen bg-[#f8f7fb]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6">
          <p className="text-[10px] font-extrabold tracking-[.16em] text-[#7c3aed] border-l-2 border-[#7c3aed] pl-2">SHOP</p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#201d2b]">Shop</h1>
          <p className="text-[#645d6d] mt-1 text-sm">Discover products with smart EMI plans</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#eeeaf4] overflow-hidden shadow-card">
          <div className="border-b border-[#eeeaf4]">
            <nav className="flex overflow-x-auto" role="tablist" aria-label="Shop sections">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`${tab.id}-panel`}
                  id={`${tab.id}-tab`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 py-3 px-4 sm:px-6 text-sm font-semibold transition-colors relative whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-[#6d28d9]'
                      : 'text-[#9b94a6] hover:text-[#6d28d9]'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-[#6d28d9] rounded-full" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 sm:p-6" role="tabpanel" id={`${activeTab}-panel`} aria-labelledby={`${activeTab}-tab`}>
            {activeTab === 'marketplace' && (
              <ErrorBoundary>
                <MarketplaceContent />
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

function MarketplaceContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <div className="mb-6">
          <p className="text-[10px] font-extrabold tracking-[.18em] text-[#6d28d9]">1FI MARKETPLACE</p>
          <h2 className="mt-1 text-2xl font-extrabold text-[#201d2b]">Shop now. Pay with ease.</h2>
          <p className="mt-1 text-sm text-[#645d6d]">Choose a product, then select the EMI that fits you.</p>
        </div>
        <ProductGridSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 sm:py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-100 text-red-600 mb-4">
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Products</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button onClick={fetchProducts} className="px-6 py-3 bg-[#6d28d9] text-white font-medium rounded-xl hover:bg-[#5b21c7] transition-colors">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-[10px] font-extrabold tracking-[.18em] text-[#6d28d9]">1FI MARKETPLACE</p>
        <h2 className="mt-1 text-2xl font-extrabold text-[#201d2b]">Shop now. Pay with ease.</h2>
        <p className="mt-1 text-sm text-[#645d6d]">Choose a product, then select the EMI that fits you.</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <p className="text-sm text-[#645d6d]">
          Showing <span className="font-semibold text-[#201d2b]">{products.length}</span> products
        </p>
        {products.length > 0 && products[0]?.variants?.[0]?.emiPlans?.[0]?.monthlyAmount && (
          <span className="rounded-full bg-[#eee7ff] px-3 py-1.5 text-[10px] font-bold text-[#6d28d9]">
            EMI from ₹{products[0].variants[0].emiPlans[0].monthlyAmount.toLocaleString()}/mo
          </span>
        )}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 sm:py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#eee7ff] text-[#6d28d9] mb-6">
            <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#201d2b] mb-2">No Products Found</h2>
          <p className="text-[#645d6d]">There are no products available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" role="list" aria-label="Products">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" aria-busy="true" aria-label="Loading products">
      {[...Array(6)].map((_, i) => (
        <article key={i} className="bg-white rounded-2xl border border-[#eeeaf4] overflow-hidden animate-pulse">
          <div className="aspect-[4/3] bg-[#faf9fc]" />
          <div className="p-4 sm:p-5 space-y-3">
            <div className="h-4 w-24 bg-[#eeeaf4] rounded" />
            <div className="h-5 w-3/4 bg-[#eeeaf4] rounded" />
            <div className="h-6 w-20 bg-[#eeeaf4] rounded" />
          </div>
        </article>
      ))}
    </div>
  );
}

function EmptyTab({ title, description }) {
  return (
    <div className="text-center py-12 sm:py-16">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#eee7ff] text-[#6d28d9] mb-6">
        <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-[#201d2b] mb-2">{title}</h2>
      <p className="text-[#645d6d] mb-6 max-w-md mx-auto">{description}</p>
    </div>
  );
}