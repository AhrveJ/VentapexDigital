import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Optional line under the title */
  description?: string;
  /** Small gold label above the title */
  eyebrow?: string;
  children: ReactNode;
}

/**
 * A plain overlay rather than <dialog>.showModal(): a modal <dialog> makes everything outside it inert,
 * which hides and blocks the reCAPTCHA image challenge (Google attaches it to <body>).
 * Stays mounted while closed so a half-filled form survives closing and reopening.
 * Rendered into <body> through a portal: a transformed ancestor (e.g. an AOS animation wrapper)
 * would otherwise trap `position: fixed` inside that ancestor instead of covering the screen.
 */
export function Modal({ open, onClose, title, description, eyebrow, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onCloseRef.current(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [open]);

  return createPortal(
    <div className={open ? 'fixed inset-0 z-50 flex items-center justify-center p-4' : 'hidden'}>
      <div aria-hidden onClick={onClose} className="absolute inset-0 bg-ink/80 backdrop-blur-sm" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-2xl animate-page-in overflow-y-auto rounded-3xl bg-ink text-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] focus:outline-none motion-reduce:animate-none"
      >
        {/* Header stays visible while a long form scrolls on small screens */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 overflow-hidden border-b border-white/10 bg-ink px-6 py-6 text-white md:px-8 md:py-7">
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-brass-light/15 blur-3xl" />
          <div className="relative">
            {eyebrow && (
              <p className="mb-2 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-brass-light">
                <span aria-hidden className="h-px w-6 bg-brass-light" />
                {eyebrow}
              </p>
            )}
            <h2 id={titleId} className="text-2xl font-bold md:text-3xl">{title}</h2>
            {description && <p className="mt-2 text-sm text-white/70">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-brass-light hover:bg-brass-light hover:text-ink"
          >
            <svg aria-hidden viewBox="0 0 20 20" className="h-5 w-5 fill-none stroke-current stroke-2">
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-7 md:px-8">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
