import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { site } from '@/config/site';
import { services } from '@/data/services';
import { Container } from '@/components/ui/Container';

const linkCls = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors hover:text-brass-light ${isActive ? 'text-brass-light' : 'text-white/80'}`;

// Mobile menu rows: tinted background on hover/tap, gold left bar on the current page
const mobileLinkCls = ({ isActive }: { isActive: boolean }) =>
  `block rounded-lg border-l-4 px-4 py-3 transition-colors hover:bg-white/5 ${
    isActive ? 'border-brass-light bg-white/5 font-semibold text-brass-light' : 'border-transparent text-white/85'
  }`;

const ctaCls =
  'inline-flex items-center justify-center rounded-full bg-brass-light px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white';

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95 text-white backdrop-blur">
      <Container className="flex h-[72px] items-center justify-between gap-6">
        <Link to="/" className="flex shrink-0 items-center gap-3" onClick={close}>
          <img src="/images/logo.jpg" alt="" width={40} height={40} className="h-10 w-10 rounded" />
          <span className="font-semibold tracking-tight">{site.name.replace(/ LLC$/, '')}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={linkCls}>Home</NavLink>

          <div className="group relative">
            <button className="flex items-center gap-1 text-sm font-medium text-white/80 transition-colors hover:text-brass-light" aria-haspopup="true">
              Services
              <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current stroke-2 transition-transform group-hover:rotate-180">
                <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* pt-3 keeps a hover bridge between the button and the menu */}
            <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <ul className="rounded-2xl border border-white/10 bg-[#16334A] p-2 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]">
                {services.map((s) => (
                  <li key={s.slug}>
                    <NavLink
                      to={`/services/${s.slug}`}
                      className={({ isActive }) => `block rounded-xl px-4 py-2.5 text-sm transition-colors hover:bg-white/5 hover:text-brass-light ${isActive ? 'text-brass-light' : 'text-white/85'}`}
                    >
                      {s.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {site.nav.filter((n) => n.to !== '/').map((n) => (
            <NavLink key={n.to} to={n.to} className={linkCls}>{n.label}</NavLink>
          ))}
        </nav>

        <Link to="/contact" className={`${ctaCls} hidden md:inline-flex`}>Book a consultation</Link>

        {/* Hamburger: three bars that fold into an X while the menu is open */}
        <button
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 hover:text-brass-light md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className="relative block h-4 w-6">
            <span className={`absolute left-0 top-0 h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`absolute left-0 top-[7px] h-0.5 w-6 rounded-full bg-current transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`absolute left-0 top-[14px] h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </span>
        </button>
      </Container>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="absolute inset-x-0 top-full border-b-2 border-brass-light bg-ink shadow-lg md:hidden"
        >
          <Container className="flex flex-col gap-1 py-3">
            <NavLink to="/" end onClick={close} className={mobileLinkCls}>Home</NavLink>
            {services.map((s) => (
              <NavLink key={s.slug} to={`/services/${s.slug}`} onClick={close} className={(state) => `${mobileLinkCls(state)} pl-8`}>
                {s.name}
              </NavLink>
            ))}
            <NavLink to="/about" onClick={close} className={mobileLinkCls}>About</NavLink>
            <NavLink to="/contact" onClick={close} className={mobileLinkCls}>Contact</NavLink>
            <Link to="/contact" onClick={close} className={`${ctaCls} mt-3 py-3`}>Book a consultation</Link>
          </Container>
        </nav>
      )}
    </header>
  );
}
