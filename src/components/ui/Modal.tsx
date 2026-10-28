import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Optional line under the title */
  description?: string;
  children: ReactNode;
}

/**
 * A plain overlay rather than <dialog>.showModal(): a modal <dialog> makes everything outside it inert,
 * which hides and blocks the reCAPTCHA image challenge (Google attaches it to <body>).
 * Stays mounted while closed so a half-filled form survives closing and reopening.
 * Rendered into <body> through a portal: a transformed ancestor (e.g. an AOS animation wrapper)
 * would otherwise trap `position: fixed` inside that ancestor instead of covering the screen.
 */
export function Modal({ open, onClose, title, description, children }: ModalProps) {
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
      <div aria-hidden onClick={onClose} className="absolute inset-0 bg-ink/70 backdrop-blur-sm" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-2xl animate-page-in overflow-y-auto rounded-2xl bg-paper text-ink shadow-2xl focus:outline-none motion-reduce:animate-none"
      >
        {/* Header stays visible while a long form scrolls on small screens */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-ink/10 bg-paper px-6 py-5 md:px-8">
          <div>
            <h2 id={titleId} className="text-2xl font-semibold">{title}</h2>
            {description && <p className="mt-1 text-sm text-ink-soft">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-m-2 rounded-full p-2 text-ink-soft transition-colors hover:bg-mist hover:text-ink"
          >
            <svg aria-hidden viewBox="0 0 20 20" className="h-5 w-5 fill-none stroke-current stroke-2">
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-6 md:px-8">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
