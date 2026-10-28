import { useState } from 'react';
import { site } from '@/config/site';
import { formatStartingPrice } from '@/lib/format';
import type { ServicePricing } from '@/types/service';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { InquiryForm } from '@/components/contact/InquiryForm';

interface ContactCardProps {
  serviceName?: string;
  /** Preselects this service in the contact form */
  serviceSlug?: string;
  pricing?: ServicePricing;
}

export function ContactCard({ serviceName, serviceSlug, pricing }: ContactCardProps) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  // Remounting the form after a successful send gives the next visit a blank form
  const [formKey, setFormKey] = useState(0);

  function close() {
    setOpen(false);
    if (sent) {
      setSent(false);
      setFormKey((k) => k + 1);
    }
  }

  return (
    <aside className="relative overflow-hidden rounded-3xl bg-ink p-7 text-white shadow-[0_30px_60px_-25px_rgba(11,28,41,0.5)]">
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brass-light/15 blur-3xl" />
      {pricing && (
        <div className="relative mb-6 border-b border-white/10 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-light">{pricing.label}</p>
          <p className="mt-3 text-sm text-white/60">Starting at</p>
          <p className="text-4xl font-bold text-brass-light">{formatStartingPrice(pricing)}</p>
        </div>
      )}
      <h2 className="relative text-xl font-bold">{serviceName ? `Ask about ${serviceName}` : 'Talk to us'}</h2>
      <p className="relative mt-2 text-sm leading-relaxed text-white/70">Tell us what you need and we will reply within one business day.</p>
      <a className="relative mt-5 flex items-center gap-3 text-sm font-semibold transition-colors hover:text-brass-light" href={`tel:${site.phone}`}>
        <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full border border-white/20">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" strokeLinejoin="round" />
          </svg>
        </span>
        {site.phone}
      </a>
      <Button onClick={() => setOpen(true)} className="relative mt-6 w-full justify-center rounded-full !py-3.5">
        Schedule a consultation
      </Button>
      <Modal
        open={open}
        onClose={close}
        eyebrow="Free consultation"
        title={serviceName ? `Ask about ${serviceName}` : 'Send us an inquiry'}
        description="Tell us what you need and we will reply within one business day."
      >
        <InquiryForm key={formKey} defaultService={serviceSlug} heading={null} bare onSent={() => setSent(true)} />
      </Modal>
    </aside>
  );
}
