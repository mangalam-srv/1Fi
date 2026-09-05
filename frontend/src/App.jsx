import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Confirmation from './pages/Confirmation';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <LoadingScreen />
    </Layout>
  );
}

function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="text-xs font-bold tracking-widest text-[#6d28d9]">404</p>
      <h1 className="mt-2 text-2xl font-bold text-[#201d2b]">This page isn't here.</h1>
      <p className="mt-2 text-[#645d6d]">Let's get you back to the 1Fi marketplace.</p>
      <Link to="/shop" className="mt-6 inline-block rounded-full bg-[#6d28d9] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#5b21c7] transition-colors">
        Browse products
      </Link>
    </div>
  );
}

export default App;