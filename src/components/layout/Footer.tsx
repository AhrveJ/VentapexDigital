import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { site } from '@/config/site';
import { services } from '@/data/services';
import { Container } from '@/components/ui/Container';

const headingCls = 'text-xs font-semibold uppercase tracking-[0.2em] text-brass-light';
// Gold dot slides in on hover so plain text links feel interactive
const linkCls = 'group inline-flex items-center gap-2 transition-colors hover:text-white';
const dot = <span aria-hidden className="h-1 w-0 rounded-full bg-brass-light transition-all duration-300 group-hover:w-2" />;

function IconRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-brass-light">
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.75]">{icon}</svg>
      </span>
      <span className="pt-1.5">{children}</span>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-sm text-white/70">
      {/* Thin gold rule across the top and a soft glow, matching the hero */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass-light/60 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-brass-light/10 blur-3xl" />

      <Container className="relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_0.8fr_1.2fr] lg:gap-10">
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <img src="/images/logo.jpg" alt="" width={44} height={44} className="h-11 w-11 rounded" />
            <span className="text-lg font-semibold tracking-tight text-white">{site.name.replace(/ LLC$/, '')}</span>
          </Link>
          <p className="mt-5 max-w-xs leading-relaxed">{site.description}</p>
          <Link
            to="/contact"
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-brass-light px-5 py-3 font-semibold text-ink transition-colors hover:bg-white"
          >
            Book a consultation
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <nav aria-label="Services">
          <p className={headingCls}>Services</p>
          <ul className="mt-5 space-y-3">
            {services.map((s) => (
              <li key={s.slug}><Link className={linkCls} to={`/services/${s.slug}`}>{dot}{s.name}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className={headingCls}>Company</p>
          <ul className="mt-5 space-y-3">
            {site.nav.map((n) => (
              <li key={n.to}><Link className={linkCls} to={n.to}>{dot}{n.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <p className={headingCls}>Visit or call</p>
          <ul className="mt-5 space-y-4">
            <IconRow icon={<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" strokeLinejoin="round" />}>
              <a className="font-semibold text-white transition-colors hover:text-brass-light" href={`tel:${site.phone}`}>{site.phone}</a>
            </IconRow>
            <IconRow icon={<><path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" strokeLinejoin="round" /><circle cx="12" cy="9.5" r="2.5" /></>}>
              <address className="not-italic leading-relaxed">{site.address}</address>
            </IconRow>
            {/* <IconRow icon={...}><a href={`mailto:${site.email}`}>{site.email}</a></IconRow> */}
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-white/10 py-6">
        {/* Three columns (back to top | AZN | Vantapex) keep the client's notice truly centered */}
        <Container className="flex flex-col items-center gap-3 text-center sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 text-xs font-semibold text-white/60 transition-colors hover:text-brass-light sm:justify-self-start"
          >
            <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full border border-white/15 transition-colors group-hover:border-brass-light">↑</span>
            Back to top
          </button>
          <p className="text-white/80">© {new Date().getFullYear()} {site.name}.</p>
          {/* Developer credit: smaller and dimmer than the client's notice, like a watermark */}
          <p className="text-xs text-white/40 sm:justify-self-end">© by Vantapex Digital Inc.</p>
        </Container>
      </div>
    </footer>
  );
}
