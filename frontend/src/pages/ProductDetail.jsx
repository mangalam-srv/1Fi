import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLoading } from '../components/LoadingScreen';
import EMIPlanCard from '../components/EMIPlanCard';
import VariantSelector from '../components/VariantSelector';
import ProceedButton from '../components/ProceedButton';
import ConfirmationModal from '../components/ConfirmationModal';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useLoading();

  const [product, setProduct] = useState(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedEmiPlanIndex, setSelectedEmiPlanIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  // Reset EMI plan selection when variant changes
  useEffect(() => {
    if (product && product.variants?.[selectedVariantIndex]?.emiPlans?.length > 0) {
      setSelectedEmiPlanIndex(0);
    } else {
      setSelectedEmiPlanIndex(null);
    }
  }, [selectedVariantIndex, product]);

  const fetchProduct = async () => {
    startLoading();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/products/slug/${slug}`);
      if (!response.ok) throw new Error(response.status === 404 ? 'Product not found' : 'Unable to load this product');
      const data = await response.json();
      if (data.success) {
        setProduct(data.data);
        setSelectedVariantIndex(0);
        setSelectedEmiPlanIndex(data.data.variants?.[0]?.emiPlans?.length > 0 ? 0 : null);
      } else {
        setError(data.message || 'Product not found');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
      stopLoading();
    }
  };

  const selectedVariant = product?.variants?.[selectedVariantIndex];
  const selectedEmiPlan = selectedVariant?.emiPlans?.[selectedEmiPlanIndex];

  const handleProceed = () => {
    if (selectedEmiPlan && selectedVariant) {
      setShowConfirmation(true);
    }
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    navigate('/confirmation', {
      state: {
        product: {
          name: product.name,
          brand: product.brand,
          slug: product.slug,
        },
        variant: {
          name: selectedVariant.name,
          storage: selectedVariant.storage,
          color: selectedVariant.color,
          price: selectedVariant.price,
          image: selectedVariant.image,
        },
        emiPlan: selectedEmiPlan,
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-100 text-red-600 mb-4">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
          <button onClick={() => navigate('/shop/marketplace')} className="px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors">
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <button onClick={() => navigate('/shop/marketplace')} className="hover:text-gray-700 transition-colors">Marketplace</button>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <span className="text-gray-900 font-medium truncate max-w-xs">{product.brand} {product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductImageGallery
            images={product.variants?.map(v => v.image).filter(Boolean) || []}
            selectedIndex={selectedVariantIndex}
            onChange={setSelectedVariantIndex}
          />

          <ProductInfo
            product={product}
            selectedVariant={selectedVariant}
            selectedVariantIndex={selectedVariantIndex}
            onVariantChange={setSelectedVariantIndex}
            emiPlans={selectedVariant?.emiPlans || []}
            selectedEmiPlanIndex={selectedEmiPlanIndex}
            onEmiPlanChange={setSelectedEmiPlanIndex}
            onProceed={handleProceed}
          />
        </div>

        {product.description && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About this Product</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirm}
        product={product}
        variant={selectedVariant}
        emiPlan={selectedEmiPlan}
      />
    </div>
  );
}

function ProductImageGallery({ images, selectedIndex, onChange }) {
  const currentImage = images[selectedIndex] || images[0] || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80';

  return (
    <div className="lg:sticky lg:top-24">
      <div className="aspect-square max-h-[34rem] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 mb-4">
        <img
          src={currentImage}
          alt="Product"
          className="w-full h-full object-contain"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2" role="list" aria-label="Product images">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onChange(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                index === selectedIndex ? 'border-primary-500' : 'border-transparent hover:border-gray-300'
              }`}
              role="listitem"
              aria-label={`View image ${index + 1}`}
              aria-selected={index === selectedIndex}
            >
              <img src={image} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductInfo({
  product,
  selectedVariant,
  selectedVariantIndex,
  onVariantChange,
  emiPlans,
  selectedEmiPlanIndex,
  onEmiPlanChange,
  onProceed,
}) {
  return (
    <div>
      <p className="text-sm text-primary-600 font-medium mb-1">{product.brand}</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

      <VariantSelector
        variants={product.variants}
        selectedIndex={selectedVariantIndex}
        onChange={onVariantChange}
      />

      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-baseline gap-4 mb-4">
          <span className="text-3xl font-bold text-gray-900">₹{selectedVariant?.price?.toLocaleString() || 0}</span>
          <span className="text-sm text-gray-500 line-through">MRP ₹{Math.round((selectedVariant?.price || 0) * 1.1).toLocaleString()}</span>
          <span className="ml-auto text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
            Save ₹{Math.round((selectedVariant?.price || 0) * 0.1).toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span className="px-3 py-1 bg-gray-100 rounded-full font-medium">In Stock</span>
          <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full font-medium">Free Delivery</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full font-medium">7 Day Return</span>
        </div>
      </div>

      <EMISection
        emiPlans={emiPlans}
        selectedIndex={selectedEmiPlanIndex}
        onChange={onEmiPlanChange}
        variantPrice={selectedVariant?.price}
      />

      <div className="mt-6 pt-6 border-t border-gray-100">
        <ProceedButton
          onClick={onProceed}
          disabled={selectedEmiPlanIndex === null}
          emiPlan={emiPlans[selectedEmiPlanIndex]}
        />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <FeatureBadge icon="shield" label="Secure" desc="Payment" />
        <FeatureBadge icon="truck" label="Free" desc="Delivery" />
        <FeatureBadge icon="rotate" label="Easy" desc="Returns" />
      </div>
    </div>
  );
}

function EMISection({ emiPlans, selectedIndex, onChange, variantPrice }) {
  if (!emiPlans.length) {
    return (
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">EMI Plans</h2>
        <p className="text-gray-600">No EMI plans available for this variant.</p>
      </div>
    );
  }

  return (
    <section className="mt-6" aria-labelledby="emi-heading">
      <h2 id="emi-heading" className="text-lg font-semibold text-gray-900 mb-4">EMI Plans</h2>
      <p className="text-sm text-gray-600 mb-4">
        Select a plan that fits your budget. All plans are backed by mutual funds.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="EMI plans">
        {emiPlans.map((plan, index) => (
          <EMIPlanCard
            key={index}
            plan={plan}
            index={index}
            isSelected={index === selectedIndex}
            onSelect={() => onChange(index)}
            variantPrice={variantPrice}
          />
        ))}
      </div>
      {selectedIndex !== null && emiPlans[selectedIndex] && (
        <SelectedPlanSummary plan={emiPlans[selectedIndex]} variantPrice={variantPrice} />
      )}
    </section>
  );
}

function SelectedPlanSummary({ plan, variantPrice }) {
  const totalAmount = plan.monthlyAmount * plan.tenure;
  const interestAmount = totalAmount - variantPrice;

  return (
    <div className="mt-4 p-4 bg-primary-50 rounded-xl border border-primary-100">
      <h3 className="font-semibold text-primary-800 mb-3 flex items-center gap-2">
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        Selected Plan Summary
      </h3>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-primary-700 font-medium">Monthly Payment</p>
          <p className="text-primary-900 font-bold text-lg">₹{plan.monthlyAmount.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-primary-700 font-medium">Tenure</p>
          <p className="text-primary-900 font-bold">{plan.tenure} months</p>
        </div>
        <div>
          <p className="text-primary-700 font-medium">Interest Rate</p>
          <p className="text-primary-900 font-bold">{plan.interestRate}%</p>
        </div>
        <div>
          <p className="text-primary-700 font-medium">Cashback</p>
          <p className="text-primary-900 font-bold">₹{plan.cashback.toLocaleString()}</p>
        </div>
        <div className="col-span-2">
          <p className="text-primary-700 font-medium">Total Payable</p>
          <p className="text-primary-900 font-bold text-lg">₹{totalAmount.toLocaleString()}</p>
        </div>
        {interestAmount > 0 && (
          <div className="col-span-2">
            <p className="text-primary-700 font-medium">Interest Amount</p>
            <p className="text-primary-900 font-bold">₹{interestAmount.toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function FeatureBadge({ icon, label, desc }) {
  const icons = {
    shield: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    truck: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
    rotate: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  };

  return (
    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary-100 text-primary-600 mb-2">
        {icons[icon]}
      </div>
      <p className="font-medium text-gray-900">{label}</p>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-square rounded-2xl bg-gray-100 animate-pulse" />
        <div className="space-y-6">
          <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
          <div className="h-8 w-3/4 bg-gray-100 rounded animate-pulse" />
          <div className="h-10 w-48 bg-gray-100 rounded animate-pulse" />
          <div className="grid grid-cols-3 gap-3">
            <div className="h-24 bg-gray-100 rounded animate-pulse" />
            <div className="h-24 bg-gray-100 rounded animate-pulse" />
            <div className="h-24 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="h-32 bg-gray-100 rounded animate-pulse" />
          <div className="h-12 w-full bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
