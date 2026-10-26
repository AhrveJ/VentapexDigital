import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { site } from '@/config/site';
import { services } from '@/data/services';
import { Container } from '@/components/ui/Container';

const linkCls = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors hover:text-brass ${isActive ? 'text-brass' : 'text-ink'}`;

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-xl font-semibold" onClick={close}>
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={linkCls}>Home</NavLink>

          <div className="group relative">
            <button className="text-sm font-medium hover:text-brass" aria-haspopup="true">Services</button>
            <ul className="invisible absolute left-0 top-full w-64 border border-ink/10 bg-white py-2 opacity-0 shadow-lg transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              {services.map((s) => (
                <li key={s.slug}>
                  <NavLink to={`/services/${s.slug}`} className={({ isActive }) => `block px-4 py-2 text-sm hover:bg-mist ${isActive ? 'text-brass' : ''}`}>
                    {s.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {site.nav.filter((n) => n.to !== '/').map((n) => (
            <NavLink key={n.to} to={n.to} className={linkCls}>{n.label}</NavLink>
          ))}
        </nav>

        <button
          className="md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </Container>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-ink/10 bg-paper md:hidden">
          <Container className="flex flex-col gap-3 py-4">
            <Link to="/" onClick={close}>Home</Link>
            {services.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} onClick={close} className="pl-4 text-ink-soft">
                {s.name}
              </Link>
            ))}
            <Link to="/contact" onClick={close}>Contact</Link>
          </Container>
        </nav>
      )}
    </header>
  );
}
