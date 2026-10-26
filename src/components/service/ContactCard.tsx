import { site } from '@/config/site';
import { formatStartingPrice } from '@/lib/format';
import type { ServicePricing } from '@/types/service';
import { Button } from '@/components/ui/Button';

interface ContactCardProps {
  serviceName?: string;
  pricing?: ServicePricing;
}

export function ContactCard({ serviceName, pricing }: ContactCardProps) {
  return (
    <aside className="border border-ink/15 bg-white p-6">
      {pricing && (
        <div className="mb-6 border-b border-ink/10 pb-6">
          <p className="text-sm text-ink-soft">{pricing.label}, starting at</p>
          <p className="mt-1 font-display text-4xl font-semibold">{formatStartingPrice(pricing)}</p>
        </div>
      )}
      <h2 className="text-xl font-semibold">{serviceName ? `Ask about ${serviceName}` : 'Talk to us'}</h2>
      <p className="mt-2 text-sm text-ink-soft">Tell us what you need and we will reply within one business day.</p>
      <p className="mt-4 text-sm"><a className="font-semibold hover:text-brass" href={`tel:${site.phone}`}>{site.phone}</a></p>
      <Button to="/contact" className="mt-5 w-full justify-center !bg-ink !text-white hover:!bg-ink-soft">
        Schedule a consultation
      </Button>
    </aside>
  );
}
