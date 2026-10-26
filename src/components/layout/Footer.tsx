import { Link } from 'react-router-dom';
import { site } from '@/config/site';
import { services } from '@/data/services';
import { Container } from '@/components/ui/Container';

export function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-xl text-white">{site.name}</p>
          <p className="mt-3 max-w-xs text-sm">{site.description}</p>
        </div>
        <nav aria-label="Services">
          <p className="font-semibold text-white">Services</p>
          <ul className="mt-3 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}><Link className="hover:text-brass-light" to={`/services/${s.slug}`}>{s.name}</Link></li>
            ))}
          </ul>
        </nav>
        <address className="text-sm not-italic">
          <p className="font-semibold text-white">Visit or call</p>
          <p className="mt-3">{site.address}</p>
          <p><a className="hover:text-brass-light" href={`tel:${site.phone}`}>{site.phone}</a></p>
          <p><a className="hover:text-brass-light" href={`mailto:${site.email}`}>{site.email}</a></p>
        </address>
      </Container>
      <div className="border-t border-white/10 py-5 text-center text-xs">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
