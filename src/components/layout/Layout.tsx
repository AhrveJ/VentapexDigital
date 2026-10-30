import { useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AOS from 'aos';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  const { pathname, hash, key } = useLocation();
  const prevPath = useRef(pathname);
  useEffect(() => {
    // Scroll animations: add data-aos="fade-up" (and optionally data-aos-delay="150") to any element.
    // Direction convention: left column fade-right (slides in from the left), right column fade-left,
    // eyebrows/section headings fade-down, cards and stacked content fade-up.
    AOS.init({
      // Replay on every pass: elements fade out when scrolled back below the screen and fade in again on the way down
      once: false,
      duration: 700,
      easing: 'ease-out-cubic',
      offset: 60,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
  }, []);

  useEffect(() => {
    AOS.refreshHard();
  }, [pathname]);

  // New page: start at the top. A #hash link (e.g. /contact#inquiry) then glides down to that element.
  // `key` changes on every click, so the same link still scrolls when you're already on the page.
  // Layout effect so the jump to the top happens before AOS measures the new page; otherwise AOS sees the old
  // scroll position and marks everything above it as already animated, so those sections never fade in.
  useLayoutEffect(() => {
    const pageChanged = prevPath.current !== pathname;
    prevPath.current = pathname;
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    if (pageChanged) window.scrollTo(0, 0);
    // Wait a frame so the new page has rendered before looking up the target
    const frame = requestAnimationFrame(() =>
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
    );
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return (
    // overflow-x-clip: elements sliding in from the right start off-screen; clip (not hidden) so the sticky header still works
    <div className="flex min-h-screen flex-col overflow-x-clip">
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
