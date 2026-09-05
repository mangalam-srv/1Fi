import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Confirmation() {
  const location = useLocation();
  const [data, setData] = useState(null);

  useEffect(() => {
    const stateData = location.state;
    if (stateData) {
      setData(stateData);
      return;
    }

    try {
      const stored = sessionStorage.getItem('1fi_confirmation');
      if (stored) {
        const parsed = JSON.parse(stored);
        setData(parsed);
      }
    } catch {
      // Ignore parsing errors
    }
  }, [location.state]);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#f8f7fb] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#eee7ff] text-[#6d28d9] mb-4">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#201d2b] mb-2">Order Confirmed!</h1>
          <p className="text-[#645d6d] mb-6">Your EMI application has been submitted successfully.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-[#6d28d9] text-white font-medium rounded-full hover:bg-[#5b21c7] transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const { product, variant, emiPlan } = data;
  const totalAmount = emiPlan?.monthlyAmount * emiPlan?.tenure;
  const cashback = emiPlan?.cashback || 0;

  return (
    <div className="min-h-screen bg-[#f8f7fb]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#f0fdf4] text-green-600 mb-4">
            <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#201d2b] mb-2">Application Submitted!</h1>
          <p className="text-[#645d6d]">Your EMI application has been received. Our team will contact you shortly.</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#eeeaf4] overflow-hidden shadow-card mb-8">
          <div className="p-4 sm:p-6 border-b border-[#eeeaf4]">
            <h2 className="text-lg font-semibold text-[#201d2b]">Order Summary</h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="flex items-center gap-4 p-4 bg-[#faf9fc] rounded-xl border border-[#eeeaf4] mb-6">
              <div className="w-20 h-20 rounded-xl bg-[#eeeaf4] flex-shrink-0 overflow-hidden">
                <img
                  src={variant?.image || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&auto=format&fit=crop&q=80'}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&auto=format&fit=crop&q=80'; }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#6d28d9] font-medium">{product?.brand}</p>
                <p className="font-medium text-[#201d2b] truncate">{product?.name}</p>
                <p className="text-sm text-[#9b94a6]">
                  {variant?.name}
                  {variant?.storage && ` • ${variant.storage}`}
                  {variant?.color && ` • ${variant.color}`}
                </p>
              </div>
              <p className="font-bold text-[#201d2b]">₹{variant?.price?.toLocaleString() || 0}</p>
            </div>

            <div className="p-4 bg-[#f5f1ff] rounded-xl border border-[#eee7ff] mb-6">
              <h3 className="font-medium text-[#6d28d9] mb-3 flex items-center gap-2">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Selected EMI Plan
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                <div>
                  <p className="text-[#6d28d9] font-medium">Monthly Payment</p>
                  <p className="text-[#6d28d9] font-bold">₹{emiPlan?.monthlyAmount?.toLocaleString() || 0}</p>
                </div>
                <div>
                  <p className="text-[#6d28d9] font-medium">Tenure</p>
                  <p className="text-[#6d28d9] font-bold">{emiPlan?.tenure || 0} months</p>
                </div>
                <div>
                  <p className="text-[#6d28d9] font-medium">Interest Rate</p>
                  <p className="text-[#6d28d9] font-bold">{emiPlan?.interestRate || 0}%</p>
                </div>
                <div>
                  <p className="text-[#6d28d9] font-medium">Cashback</p>
                  <p className="text-[#6d28d9] font-bold text-green-600">₹{cashback.toLocaleString()}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-[#d6ccfe]">
                <p className="text-[#6d28d9] font-medium">Total Payable</p>
                <p className="text-[#6d28d9] font-bold text-xl">₹{totalAmount?.toLocaleString() || 0}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-[#645d6d] border-t border-[#eeeaf4] pt-4">
              <div className="flex justify-between">
                <span>Product Price</span>
                <span className="font-medium">₹{variant?.price?.toLocaleString() || 0}</span>
              </div>
              {cashback > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Cashback</span>
                  <span className="font-medium">- ₹{cashback.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-[#eeeaf4] pt-2">
                <span className="font-semibold">Total Payable</span>
                <span className="font-bold text-[#6d28d9]">₹{totalAmount?.toLocaleString() || 0}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#eeeaf4] p-4 sm:p-6 shadow-card mb-8">
          <h2 className="text-lg font-semibold text-[#201d2b] mb-4">Next Steps</h2>
          <div className="space-y-4">
            <StepItem number="1" title="Verification" description="Our team will verify your details within 24 hours." />
            <StepItem number="2" title="Approval" description="Get instant approval based on your mutual fund portfolio." />
            <StepItem number="3" title="Disbursement" description="Product ships upon approval. EMI starts next month." />
          </div>
        </div>

        <div className="text-center">
          <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-3 bg-[#6d28d9] text-white font-medium rounded-full hover:bg-[#5b21c7] transition-colors">
            Continue Shopping
          </Link>
        </div>

        <p className="text-center text-xs text-[#9b94a6] mt-6">
          This is a demo application. No actual financial transaction has been processed.
        </p>
      </div>
    </div>
  );
}

function StepItem({ number, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#eee7ff] text-[#6d28d9] font-bold flex items-center justify-center text-sm">
        {number}
      </div>
      <div>
        <p className="font-medium text-[#201d2b]">{title}</p>
        <p className="text-sm text-[#645d6d]">{description}</p>
      </div>
    </div>
  );
}