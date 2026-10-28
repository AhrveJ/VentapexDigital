import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AOS from 'aos';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Scroll animations: add data-aos="fade-up" (and optionally data-aos-delay="150") to any element
    AOS.init({
      once: true,
      duration: 700,
      easing: 'ease-out-cubic',
      offset: 60,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refreshHard();
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">
        Skip to content
      </a>
      <Header />
      {/* Keyed by path so every navigation fades the new page in */}
      <main id="main" key={pathname} className="flex-1 animate-page-in motion-reduce:animate-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
