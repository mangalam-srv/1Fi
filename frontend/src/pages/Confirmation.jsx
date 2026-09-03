import { useLocation, Link } from 'react-router-dom';

export default function Confirmation() {
  const location = useLocation();
  const data = location.state;

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 text-primary-600 mb-4">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">Your EMI application has been submitted successfully.</p>
          <Link to="/shop/marketplace" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors">
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-green-100 text-green-600 mb-4">
            <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Application Submitted!</h1>
          <p className="text-gray-600">Your EMI application has been received. Our team will contact you shortly.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-card mb-8">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-6">
              <div className="w-20 h-20 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden">
                <img
                  src={variant?.image || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&auto=format&fit=crop&q=80'}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-primary-600 font-medium">{product?.brand}</p>
                <p className="font-medium text-gray-900 truncate">{product?.name}</p>
                <p className="text-sm text-gray-500">
                  {variant?.name}
                  {variant?.storage && ` • ${variant.storage}`}
                  {variant?.color && ` • ${variant.color}`}
                </p>
              </div>
              <p className="font-bold text-gray-900">₹{variant?.price?.toLocaleString() || 0}</p>
            </div>

            <div className="p-4 bg-primary-50 rounded-xl border border-primary-100 mb-6">
              <h3 className="font-medium text-primary-800 mb-3 flex items-center gap-2">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Selected EMI Plan
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                <div>
                  <p className="text-primary-700 font-medium">Monthly Payment</p>
                  <p className="text-primary-900 font-bold">₹{emiPlan?.monthlyAmount?.toLocaleString() || 0}</p>
                </div>
                <div>
                  <p className="text-primary-700 font-medium">Tenure</p>
                  <p className="text-primary-900 font-bold">{emiPlan?.tenure || 0} months</p>
                </div>
                <div>
                  <p className="text-primary-700 font-medium">Interest Rate</p>
                  <p className="text-primary-900 font-bold">{emiPlan?.interestRate || 0}%</p>
                </div>
                <div>
                  <p className="text-primary-700 font-medium">Cashback</p>
                  <p className="text-primary-900 font-bold text-green-600">₹{cashback.toLocaleString()}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-primary-200">
                <p className="text-primary-700 font-medium">Total Payable</p>
                <p className="text-primary-900 font-bold text-xl">₹{totalAmount?.toLocaleString() || 0}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600 border-t border-gray-100 pt-4">
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
              <div className="flex justify-between border-t border-gray-100 pt-2">
                <span className="font-semibold">Total Payable</span>
                <span className="font-bold text-primary-600">₹{totalAmount?.toLocaleString() || 0}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-card mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h2>
          <div className="space-y-4">
            <StepItem number="1" title="Verification" description="Our team will verify your details within 24 hours." />
            <StepItem number="2" title="Approval" description="Get instant approval based on your mutual fund portfolio." />
            <StepItem number="3" title="Disbursement" description="Product ships upon approval. EMI starts next month." />
          </div>
        </div>

        <div className="text-center">
          <Link to="/shop/marketplace" className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors">
            Continue Shopping
          </Link>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          This is a demo application. No actual financial transaction has been processed.
        </p>
      </div>
    </div>
  );
}

function StepItem({ number, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-600 font-bold flex items-center justify-center text-sm">
        {number}
      </div>
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}