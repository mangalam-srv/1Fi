import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const defaultVariant = product.variants?.[0];
  const price = defaultVariant?.price || 0;
  const image = defaultVariant?.image || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80';

  return (
    <article
      role="listitem"
      className="group bg-white rounded-2xl border border-[#eeeaf4] overflow-hidden hover:border-[#6d28d9] hover:shadow-card transition-all duration-300 cursor-pointer"
    >
      <Link to={`/products/${product.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d28d9] focus-visible:ring-offset-2 rounded-2xl">
        <div className="aspect-[4/3] bg-[#faf9fc] relative overflow-hidden">
          <img
            src={image}
            alt={`${product.name} - ${product.brand}`}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80'; }}
          />
        </div>
        <div className="p-4 sm:p-5">
          <p className="text-sm text-[#6d28d9] font-medium mb-1">{product.brand}</p>
          <h3 className="text-lg font-semibold text-[#201d2b] mb-2 line-clamp-1">{product.name}</h3>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-[#201d2b]">₹{price.toLocaleString()}</p>
            <span className="text-sm text-[#6d28d9] font-medium">View EMI Plans →</span>
          </div>
        </div>
      </Link>
    </article>
  );
}