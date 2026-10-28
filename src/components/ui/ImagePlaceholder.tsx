/** Grey stand-in for a photo that hasn't been chosen yet. Swap for an <img> with the same wrapper classes. */
export function ImagePlaceholder({ label, ratio, className = '' }: { label: string; ratio: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${label}`}
      className={`flex flex-col items-center justify-center gap-2 rounded-3xl border border-ink/10 bg-mist p-4 text-center ${className}`}
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-ink-soft stroke-[1.5]">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="text-sm font-semibold text-ink">{label}</p>
      <p className="text-xs text-ink-soft">{ratio}</p>
    </div>
  );
}
