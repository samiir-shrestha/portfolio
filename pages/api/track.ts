import type { NextApiRequest, NextApiResponse } from 'next';
import { recordPageView } from '@/lib/analytics';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const forwarded = req.headers['x-forwarded-for'];
    const realIp = req.headers['x-real-ip'];
    const socketIp = req.socket?.remoteAddress;
    
    let rawIp = '';
    if (typeof forwarded === 'string') {
      rawIp = forwarded.split(',')[0].trim();
    } else if (Array.isArray(forwarded) && forwarded.length > 0) {
      rawIp = forwarded[0].trim();
    } else if (typeof realIp === 'string') {
      rawIp = realIp.trim();
    } else if (socketIp) {
      rawIp = socketIp;
    }

    const userAgent = req.headers['user-agent'] || '';
    const referrer = req.headers['referer'] || (req.body && req.body.referrer) || '';
    const path = (req.body && req.body.path) || (req.query && (req.query.path as string)) || '/';
    const country = (req.headers['x-vercel-ip-country'] as string) || (req.headers['cf-ipcountry'] as string) || 'Unknown';

    // Don't track admin internal API calls or admin page views if requested
    if (path.startsWith('/api') || path.startsWith('/_next')) {
      return res.status(200).json({ ok: true, skipped: true });
    }

    const log = recordPageView({
      ip: rawIp,
      path,
      referrer,
      userAgent,
      country,
    });

    return res.status(200).json({ success: true, logId: log.id });
  } catch (error) {
    console.error('Track error:', error);
    return res.status(500).json({ success: false, error: 'Failed to record view' });
  }
}
