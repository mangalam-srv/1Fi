export default function ProceedButton({ onClick, disabled, emiPlan }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3.5 px-6 rounded-full font-semibold text-base transition-all ${
        disabled
          ? 'bg-[#eeeaf4] text-[#9b94a6] cursor-not-allowed'
          : 'bg-[#6d28d9] text-white hover:bg-[#5b21c7] shadow-card hover:shadow-soft active:scale-[0.98]'
      }`}
      aria-disabled={disabled}
    >
      {disabled ? 'Select an EMI Plan' : 'Proceed to Apply'}
    </button>
  );
}