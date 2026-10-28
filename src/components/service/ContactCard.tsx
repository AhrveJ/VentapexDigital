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
      <Button onClick={() => setOpen(true)} className="mt-5 w-full justify-center !bg-ink !text-white hover:!bg-ink-soft">
        Schedule a consultation
      </Button>
      <Modal
        open={open}
        onClose={close}
        title={serviceName ? `Ask about ${serviceName}` : 'Send us an inquiry'}
        description="Tell us what you need and we will reply within one business day."
      >
        <InquiryForm key={formKey} defaultService={serviceSlug} heading={null} bare onSent={() => setSent(true)} />
      </Modal>
    </aside>
  );
}
