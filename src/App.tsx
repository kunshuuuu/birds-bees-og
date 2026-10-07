import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SmoothScroll } from './components/animations/SmoothScroll';
import { PageTransition } from './components/animations/PageTransition';
import { PaperGrain } from './components/materials/PaperGrain';
import { LeafShadows } from './components/materials/LeafShadows';
import { Cursor } from './components/layout/Cursor';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { Navigation } from './components/layout/Navigation';
import { BackToTop } from './components/layout/BackToTop';
import { Preloader } from './components/layout/Preloader';

import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Gallery } from './pages/Gallery';
import { About } from './pages/About';
import { Events } from './pages/Events';
import { Testimonials } from './pages/Testimonials';
import { Book } from './pages/Book';
import { Contact } from './pages/Contact';
import { Hire } from './pages/Hire';
import { Admin } from './pages/Admin';
import { NotFound } from './pages/NotFound';

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    // If visiting via legacy hash route (e.g. /#/menu), migrate to clean pathname
    if (window.location.hash.startsWith('#/')) {
      const targetPath = window.location.hash.slice(1);
      window.history.replaceState(null, '', targetPath);
    }
  }, []);

  return (
    <BrowserRouter>
      <SmoothScroll>
        <div className="relative min-h-screen bg-[#F3FEFE] text-[#2A1E18] font-ui antialiased">
          {/* Handcrafted Visual Layers */}
          <PaperGrain />
          <LeafShadows />
          <Cursor />
          <ScrollProgress />

          {/* Preloader (§8.1 Signature ①) */}
          <Preloader onComplete={() => setPreloaderDone(true)} />

          {/* Navigation Bar (§7.4) */}
          <Navigation />

          {/* Page Routing wrapped in Page Transition (§7.2) */}
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home isReady={preloaderDone} />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/book" element={<Book />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/hire" element={<Hire />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>

          {/* Persistent Back-to-Top Button (§7.7) */}
          <BackToTop />
        </div>
      </SmoothScroll>
    </BrowserRouter>
  );
}
