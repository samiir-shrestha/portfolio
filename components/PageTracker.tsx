import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export function PageTracker() {
  const router = useRouter();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    const trackView = (url: string) => {
      // Avoid tracking internal admin pages or re-tracking duplicate in strict mode
      if (url.startsWith('/admin') || url.startsWith('/api')) {
        return;
      }
      if (lastTrackedPath.current === url) {
        return;
      }
      lastTrackedPath.current = url;

      try {
        const payload = JSON.stringify({
          path: url,
          referrer: typeof document !== 'undefined' ? document.referrer : '',
        });

        if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
          const blob = new Blob([payload], { type: 'application/json' });
          navigator.sendBeacon('/api/track', blob);
        } else {
          fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
            keepalive: true,
          }).catch(() => {
            // Silently ignore tracking failures
          });
        }
      } catch {
        // Silently ignore tracking error
      }
    };

    // Track on initial page load
    trackView(router.asPath);

    // Track on client-side route changes
    router.events.on('routeChangeComplete', trackView);
    return () => {
      router.events.off('routeChangeComplete', trackView);
    };
  }, [router]);

  return null;
}
