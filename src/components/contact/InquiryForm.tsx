import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { site } from '@/config/site';
import { services } from '@/data/services';

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';

const fieldCls =
  'mt-1 w-full rounded-lg border border-ink/20 bg-white px-4 py-3 text-ink placeholder:text-ink/40 focus:border-brass focus:outline-none focus:ring-2 focus:ring-brass/30';
const labelCls = 'block text-sm font-semibold';

export function InquiryForm() {
  const [params] = useSearchParams();
  const preselected = services.some((s) => s.slug === params.get('service')) ? params.get('service')! : '';
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (data._gotcha) return; // spam bot filled the hidden field

    const serviceName = services.find((s) => s.slug === data.service)?.name ?? 'Not sure yet';
    const fields = {
      Name: data.name,
      Email: data.email,
      Phone: data.phone,
      Company: data.company,
      Service: serviceName,
      Message: data.message,
    };

    // No form backend configured: hand off to the visitor's email app.
    if (!site.formEndpoint) {
      const body = Object.entries(fields).map(([k, v]) => `${k}: ${v || '-'}`).join('\n');
      const subject = `Service inquiry: ${serviceName}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...fields, _subject: `Service inquiry: ${serviceName}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-2xl border border-ink/10 bg-white p-8">
        <h2 className="text-2xl font-semibold">Thank you, we received your inquiry</h2>
        <p className="mt-2 text-ink-soft">We will reply within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-ink/10 bg-white p-6 md:p-8">
      <h2 className="text-2xl font-semibold">Send us an inquiry</h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelCls}>
          Full name <span className="text-brass">*</span>
          <input name="name" required autoComplete="name" className={fieldCls} />
        </label>
        <label className={labelCls}>
          Email <span className="text-brass">*</span>
          <input name="email" type="email" required autoComplete="email" className={fieldCls} />
        </label>
        <label className={labelCls}>
          Phone
          <input name="phone" type="tel" autoComplete="tel" className={fieldCls} />
        </label>
        <label className={labelCls}>
          Company
          <input name="company" autoComplete="organization" className={fieldCls} />
        </label>
      </div>

      <label className={labelCls}>
        Service you are interested in <span className="text-brass">*</span>
        <select name="service" required defaultValue={preselected} className={fieldCls}>
          <option value="" disabled>Select a service</option>
          {services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
          <option value="other">Not sure yet</option>
        </select>
      </label>

      <label className={labelCls}>
        How can we help? <span className="text-brass">*</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us about your business and what you need."
          className={fieldCls}
        />
      </label>

      {/* Honeypot: hidden from people, filled by bots */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-lg bg-ink px-5 py-4 font-semibold text-white transition-colors hover:bg-ink-soft disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send inquiry'}
      </button>

      {status === 'mailto' && (
        <p role="status" className="text-sm text-ink-soft">
          Your email app should open with your inquiry filled in. If it does not, email us at{' '}
          <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="text-sm text-red-700">
          Something went wrong sending your inquiry. Please try again or call us at {site.phone}.
        </p>
      )}
    </form>
  );
}
