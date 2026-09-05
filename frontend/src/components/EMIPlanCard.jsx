export default function EMIPlanCard({ plan, index, isSelected, onSelect, variantPrice }) {
  const totalAmount = plan.monthlyAmount * plan.tenure;
  const isZeroInterest = plan.interestRate === 0;

  return (
    <button
      onClick={onSelect}
      className={`relative group p-4 rounded-xl border-2 transition-all ${
        isSelected
          ? 'border-[#6d28d9] bg-[#f5f1ff] shadow-sm'
          : 'border-[#eeeaf4] bg-white hover:border-[#d6ccfe] hover:bg-[#faf9fc]'
      }`}
      role="radio"
      aria-checked={isSelected}
      aria-label={`${plan.tenure} months, ₹${plan.monthlyAmount.toLocaleString()} per month, ${plan.interestRate}% interest`}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#6d28d9] flex items-center justify-center">
          <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#faf9fc] text-[#645d6d] border border-[#eeeaf4]">
              {plan.tenure} Months
            </span>
            {isZeroInterest && (
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#f0fdf4] text-[#166534]">
                0% Interest
              </span>
            )}
            {!isZeroInterest && (
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#fffbeb] text-[#854d0e]">
                {plan.interestRate}% Interest
              </span>
            )}
          </div>
          <p className="text-2xl font-extrabold text-[#201d2b]">
            ₹{plan.monthlyAmount.toLocaleString()}
            <span className="text-base font-normal text-[#9b94a6]">/month</span>
          </p>
        </div>
        <div className="text-right">
          {plan.cashback > 0 && (
            <div className="mb-2">
              <p className="text-xs text-[#9b94a6]">Cashback</p>
              <p className="text-lg font-semibold text-green-600">₹{plan.cashback.toLocaleString()}</p>
            </div>
          )}
          <p className="text-xs text-[#9b94a6]">
            Total: ₹{totalAmount.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[#eeeaf4] flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-[#645d6d]">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Mutual Fund Backed</span>
        </div>
        <span className="text-sm font-medium text-[#6d28d9] group-hover:underline">
          View Details →
        </span>
      </div>
    </button>
  );
}