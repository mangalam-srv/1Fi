import { Link, useLocation } from 'react-router-dom';

const nav = [['Home', '/', '⌂'], ['Shop', '/shop/marketplace', '▣'], ['EMI Dues', '/', '₹'], ['Limit', '/', '◒'], ['Profile', '/', '♙']];

export default function Layout({ children }) {
  const location = useLocation();
  const isProduct = location.pathname.startsWith('/products');
  return <div className="min-h-screen bg-[#f8f7fb] text-[#201d2b]">
    <header className="sticky top-0 z-40 border-b border-[#eeeaf4] bg-white/95 backdrop-blur"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"><Link to="/" className="flex items-center gap-2" aria-label="1Fi home"><span className="grid h-8 w-8 place-items-center rounded-xl bg-[#6d28d9] font-black text-white">1</span><span className="text-lg font-extrabold tracking-tight">1Fi</span></Link>{isProduct ? <Link to="/shop/marketplace" className="rounded-full bg-[#f3efff] px-4 py-2 text-sm font-semibold text-[#6528d7]">← Marketplace</Link> : <div className="hidden items-center gap-5 text-sm font-semibold text-[#726b7d] sm:flex"><Link className="hover:text-[#6528d7]" to="/">Home</Link><Link className="hover:text-[#6528d7]" to="/shop/marketplace">Shop</Link><button className="grid h-9 w-9 place-items-center rounded-full bg-[#f4f1f8] text-[#6528d7]" aria-label="Notifications">♧</button></div>}</div></header>
    <main className="min-h-[calc(100vh-4rem)] pb-20 sm:pb-8">{children}</main>
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#eeeaf4] bg-white px-2 py-1 sm:hidden" aria-label="Mobile navigation"><div className="mx-auto flex max-w-md justify-around">{nav.map(([label,to,icon]) => { const active = to === '/' ? location.pathname === '/' : location.pathname.startsWith('/shop') && label === 'Shop'; return <Link key={label} to={to} className={`flex min-w-12 flex-col items-center gap-0.5 rounded-xl px-2 py-1 text-[10px] font-semibold ${active ? 'text-[#6d28d9]' : 'text-[#9b94a6]'}`}><span className={`grid h-6 w-6 place-items-center rounded-lg text-sm ${active ? 'bg-[#eee7ff]' : ''}`}>{icon}</span>{label}</Link>; })}</div></nav>
    <footer className="hidden border-t border-[#eeeaf4] bg-white py-5 text-center text-xs text-[#90899a] sm:block">© 2026 1Fi · Smarter credit, built around you.</footer>
  </div>;
}
