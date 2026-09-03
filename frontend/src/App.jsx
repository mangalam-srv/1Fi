import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Marketplace from './pages/Marketplace';
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
        <Route path="/shop/marketplace" element={<Marketplace />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <LoadingScreen />
    </Layout>
  );
}

function NotFound() {
  return <div className="mx-auto max-w-md px-4 py-24 text-center"><p className="text-xs font-bold tracking-widest text-primary-600">404</p><h1 className="mt-2 text-2xl font-bold">This page isn’t here.</h1><p className="mt-2 text-gray-600">Let’s get you back to the 1Fi marketplace.</p><Link to="/shop/marketplace" className="mt-6 inline-block rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white">Browse products</Link></div>;
}

export default App;
