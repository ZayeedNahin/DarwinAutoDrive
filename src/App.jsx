import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { ToastProvider } from './components/Toast.jsx';
import Home from './pages/Home.jsx';
import BuyCar from './pages/BuyCar.jsx';
import VehicleDetail from './pages/VehicleDetail.jsx';
import SellCar from './pages/SellCar.jsx';
import RentCar from './pages/RentCar.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ToastProvider>
      <ScrollToTop />
      <div className="proto-banner">Prototype preview — forms, uploads and emails are simulated. No data is stored or sent.</div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<BuyCar />} />
          <Route path="/buy/:id" element={<VehicleDetail />} />
          <Route path="/sell" element={<SellCar />} />
          <Route path="/rent" element={<RentCar />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </ToastProvider>
  );
}
