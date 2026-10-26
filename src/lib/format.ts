import type { ServicePricing } from '@/types/service';

/** "Starting at $1,999/month" */
export function formatStartingPrice({ startingAt, period }: ServicePricing): string {
  return `$${startingAt.toLocaleString('en-US')}/${period}`;
}
