import { useEffect } from 'react';

export default function ConfirmationModal({ isOpen, onClose, onConfirm, product, variant, emiPlan }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const totalAmount = emiPlan?.monthlyAmount * emiPlan?.tenure;
  const cashback = emiPlan?.cashback || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-[#eeeaf4]">
          <h2 id="modal-title" className="text-lg font-semibold text-[#201d2b]">Confirm Your Order</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#9b94a6] hover:text-[#645d6d] hover:bg-[#faf9fc] transition-colors"
            aria-label="Close modal"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="flex items-center gap-3 p-3 bg-[#faf9fc] rounded-xl border border-[#eeeaf4]">
            <div className="w-16 h-16 rounded-xl bg-[#eeeaf4] flex-shrink-0 overflow-hidden">
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

          <div className="p-3 bg-[#f5f1ff] rounded-xl border border-[#eee7ff]">
            <h3 className="font-medium text-[#6d28d9] mb-2 flex items-center gap-2">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Selected EMI Plan
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-[#6d28d9] font-medium">Monthly</p>
                <p className="text-[#6d28d9] font-bold">₹{emiPlan?.monthlyAmount?.toLocaleString() || 0}</p>
              </div>
              <div>
                <p className="text-[#6d28d9] font-medium">Tenure</p>
                <p className="text-[#6d28d9] font-bold">{emiPlan?.tenure || 0} months</p>
              </div>
              <div>
                <p className="text-[#6d28d9] font-medium">Interest</p>
                <p className="text-[#6d28d9] font-bold">{emiPlan?.interestRate || 0}%</p>
              </div>
              <div>
                <p className="text-[#6d28d9] font-medium">Cashback</p>
                <p className="text-[#6d28d9] font-bold text-green-600">₹{cashback.toLocaleString()}</p>
              </div>
              <div className="col-span-2 pt-2 border-t border-[#d6ccfe]">
                <p className="text-[#6d28d9] font-medium">Total Payable</p>
                <p className="text-[#6d28d9] font-bold text-lg">₹{totalAmount?.toLocaleString() || 0}</p>
              </div>
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
            <p className="text-xs text-[#9b94a6] text-center">
              Including {emiPlan?.tenure || 0} monthly payments of ₹{emiPlan?.monthlyAmount?.toLocaleString() || 0}
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-[#eeeaf4] bg-[#faf9fc]">
          <p className="text-xs text-[#9b94a6] text-center mb-4">
            By proceeding, you agree to the EMI terms and conditions. This is a demo interaction - no actual financial transaction will be processed.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border-2 border-[#eeeaf4] text-[#645d6d] font-medium rounded-xl hover:border-[#d6ccfe] hover:bg-[#f5f1ff] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 px-4 bg-[#6d28d9] text-white font-medium rounded-xl hover:bg-[#5b21c7] transition-colors shadow-card"
            >
              Confirm & Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}