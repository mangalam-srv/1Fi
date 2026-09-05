export default function VariantSelector({ variants, selectedIndex, onChange }) {
  if (!variants || variants.length <= 1) {
    return (
      <div className="mt-4">
        <label className="block text-sm font-medium text-[#645d6d] mb-2">Variant</label>
        <p className="text-[#645d6d]">
          {variants?.[0]?.name || 'Default'}
          {variants?.[0]?.storage && ` • ${variants[0].storage}`}
          {variants?.[0]?.color && ` • ${variants[0].color}`}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-[#645d6d] mb-3">Select Variant</label>
      <div className="flex flex-wrap gap-2 sm:gap-3" role="radiogroup" aria-label="Product variants">
        {variants.map((variant, index) => (
          <button
            key={index}
            onClick={() => onChange(index)}
            className={`flex items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 transition-all min-w-[130px] sm:min-w-[140px] ${
              index === selectedIndex
                ? 'border-[#6d28d9] bg-[#f5f1ff] text-[#6d28d9] shadow-sm'
                : 'border-[#eeeaf4] bg-white text-[#645d6d] hover:border-[#d6ccfe] hover:bg-[#faf9fc]'
            }`}
            role="radio"
            aria-checked={index === selectedIndex}
            aria-label={`${variant.name} ${variant.storage || ''} ${variant.color || ''} - ₹${variant.price.toLocaleString()}`}
          >
            <div className="flex flex-col">
              <span className="font-medium text-sm">{variant.name}</span>
              <span className="text-xs text-[#9b94a6]">
                {variant.storage && variant.color
                  ? `${variant.storage} • ${variant.color}`
                  : variant.storage || variant.color || ''}
              </span>
            </div>
            {index === selectedIndex && (
              <svg className="h-5 w-5 text-[#6d28d9] ml-auto" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}