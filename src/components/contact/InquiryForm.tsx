import { useRef, useState, type FormEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { site } from '@/config/site';
import { services } from '@/data/services';

type Status = 'idle' | 'sending' | 'sent' | 'captcha' | 'limited' | 'error';

const fieldCls =
  'mt-1 w-full rounded-lg border border-ink/20 bg-white px-4 py-3 text-ink placeholder:text-ink/40 focus:border-brass focus:outline-none focus:ring-2 focus:ring-brass/30';
const labelCls = 'block text-sm font-semibold';

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
  const boxCls = bare ? '' : 'rounded-2xl border border-ink/10 bg-white p-6 md:p-8';
  const [status, setStatus] = useState<Status>('idle');
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
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
      <div role="status" className={boxCls}>
        <h2 className="text-2xl font-semibold">Thank you, we received your inquiry</h2>
        <p className="mt-2 text-ink-soft">We will reply within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`space-y-5 ${boxCls}`}>
      {heading && <h2 className="text-2xl font-semibold">{heading}</h2>}

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
        className="w-full rounded-lg bg-ink px-5 py-4 font-semibold text-white transition-colors hover:bg-ink-soft disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send inquiry'}
      </button>

      {status === 'captcha' && (
        <p role="alert" className="text-sm text-red-700">Please tick “I'm not a robot” before sending.</p>
      )}
      {status === 'limited' && (
        <p role="alert" className="text-sm text-red-700">
          You have sent several inquiries already. Please try again in an hour or call us at {site.phone}.
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
