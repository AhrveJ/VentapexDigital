import { useRef, useState, type FormEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { site } from '@/config/site';
import { getIncludedItems, services } from '@/data/services';

type Status = 'idle' | 'sending' | 'sent' | 'captcha' | 'limited' | 'error';

// The form always sits on the primary navy (its own card, or the navy modal), so fields are light-on-dark.
// color-scheme: dark gives the <select> a dark native dropdown to match.
const fieldCls =
  'mt-2 w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 font-normal text-white transition-colors [color-scheme:dark] placeholder:text-white/40 hover:border-white/30 focus:border-brass-light focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brass-light/30';
const labelCls = 'block text-sm font-semibold text-white/90';

interface InquiryFormProps {
  /** Service slug to preselect; ignored if it doesn't match a service */
  defaultService?: string | null;
  /** Pass null when the surrounding UI already shows a title, e.g. in a modal */
  heading?: string | null;
  /** Drop the card border and padding when the form sits inside another container */
  bare?: boolean;
  onSent?: () => void;
}

export function InquiryForm({ defaultService, heading = 'Send us an inquiry', bare = false, onSent }: InquiryFormProps) {
  const preselected = services.some((s) => s.slug === defaultService) ? defaultService! : '';
  const boxCls = bare ? '' : 'rounded-3xl bg-ink p-6 text-white shadow-[0_30px_60px_-25px_rgba(11,28,41,0.5)] md:p-10';
  const [status, setStatus] = useState<Status>('idle');
  const [serviceSlug, setServiceSlug] = useState(preselected);
  const selectedService = services.find((s) => s.slug === serviceSlug);
  const includedItems = selectedService ? getIncludedItems(selectedService) : [];
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData) as Record<string, string>;
    if (data._gotcha) return; // spam bot filled the hidden field
    if (!captchaToken) {
      setStatus('captcha');
      return;
    }

    const serviceName = services.find((s) => s.slug === data.service)?.name ?? 'Not sure yet';
    const fields = {
      Name: data.name,
      Email: data.email,
      Phone: data.phone,
      Company: data.company,
      Service: serviceName,
      // Ticked "what's included" checkboxes; Object.fromEntries would keep only the last one
      Needs: formData.getAll('needs').join('; '),
      Message: data.message,
    };

    setStatus('sending');
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...fields, captcha: captchaToken }),
      });
      if (res.ok) {
        form.reset();
        setStatus('sent');
        onSent?.();
        return;
      }
      const { error } = await res.json().catch(() => ({ error: '' }));
      setStatus(res.status === 429 ? 'limited' : error === 'captcha_failed' ? 'captcha' : 'error');
    } catch {
      setStatus('error');
    }
    // A reCAPTCHA token works only once, so a retry needs a fresh tick
    captchaRef.current?.reset();
    setCaptchaToken(null);
  }

  if (status === 'sent') {
    return (
      <div role="status" className={`text-center ${boxCls}`}>
        <span aria-hidden className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brass-light">
          <svg viewBox="0 0 20 20" className="h-6 w-6 fill-none stroke-ink stroke-[2.5]">
            <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="mt-5 text-2xl font-bold">Thank you, we received your inquiry</h2>
        <p className="mt-2 text-white/70">We will reply within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`space-y-5 ${boxCls}`}>
      {heading && <h2 className="text-2xl font-semibold">{heading}</h2>}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelCls}>
          Full name <span className="text-brass-light">*</span>
          <input name="name" required autoComplete="name" className={fieldCls} />
        </label>
        <label className={labelCls}>
          Email <span className="text-brass-light">*</span>
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
        Service you are interested in <span className="text-brass-light">*</span>
        <select
          name="service"
          required
          value={serviceSlug}
          onChange={(e) => setServiceSlug(e.target.value)}
          className={`${fieldCls} [&_option:disabled]:text-ink/45 [&_option]:bg-white [&_option]:text-ink`}
        >
          <option value="" disabled>Select a service</option>
          {services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
          <option value="other">Not sure yet</option>
        </select>
      </label>

      {/* Appears once a service is chosen. Keyed by service so switching services clears the ticks. */}
      {includedItems.length > 0 && (
        <fieldset key={serviceSlug} className="animate-page-in motion-reduce:animate-none">
          <legend className={labelCls}>
            What do you need help with? <span className="font-normal text-white/50">(optional, tick all that apply)</span>
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {includedItems.map((item) => (
              <label
                key={item}
                className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white/80 transition-colors hover:border-white/30 has-[:checked]:border-brass-light has-[:checked]:bg-brass-light/10 has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brass-light/40"
              >
                <input type="checkbox" name="needs" value={item} className="mt-0.5 h-4 w-4 shrink-0 accent-brass-light" />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <label className={labelCls}>
        How can we help? <span className="text-brass-light">*</span>
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

      {/* <ReCAPTCHA
        ref={captchaRef}
        sitekey={site.recaptchaSiteKey}
        onChange={(token) => {
          setCaptchaToken(token);
          if (token && status === 'captcha') setStatus('idle');
        }}
        onExpired={() => setCaptchaToken(null)}
      /> */}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group flex w-full items-center justify-center gap-2 rounded-full bg-brass-light px-5 py-4 font-semibold text-ink transition-colors hover:bg-white disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send inquiry'}
        {status !== 'sending' && <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>}
      </button>

      {status === 'captcha' && (
        <p role="alert" className="text-sm text-red-300">Please tick “I'm not a robot” before sending.</p>
      )}
      {status === 'limited' && (
        <p role="alert" className="text-sm text-red-300">
          You have sent several inquiries already. Please try again in an hour or call us at {site.phone}.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="text-sm text-red-300">
          Something went wrong sending your inquiry. Please try again or call us at {site.phone}.
        </p>
      )}
    </form>
  );
}
