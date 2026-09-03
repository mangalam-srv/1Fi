export default function ProceedButton({ onClick, disabled, emiPlan }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
        disabled
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-primary-600 text-white hover:bg-primary-700 shadow-soft hover:shadow-md active:scale-[0.98]'
      }`}
      aria-disabled={disabled}
    >
      {disabled ? 'Select an EMI Plan' : 'Proceed to Apply'}
    </button>
  );
}