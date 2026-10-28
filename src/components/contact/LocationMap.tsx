import { site } from '@/config/site';

/** Google Maps directions link for site.address (opens the app on phones). */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.address)}`;

/**
 * Google Maps embed for site.address. Uses the keyless embed URL, so there is no API key to manage;
 * change the address in config/site.ts and the map follows.
 */
export function LocationMap({ className = '' }: { className?: string }) {
  return (
    <iframe
      title={`Map showing ${site.name} at ${site.address}`}
      src={`https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={`block w-full ${className}`}
    />
  );
}
